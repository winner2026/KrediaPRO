import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/infrastructure/db/client";

// Define the expected Payload type from Lemon Squeezy (simplified)
interface LemonSqueezyWebhookPayload {
  meta: {
    event_name: string;
    custom_data: {
      user_id?: string; // This is crucial
    };
  };
  data: {
    id: string;
    type: string;
    attributes: {
      order_number?: number;
      user_email?: string;
      variant_id: number;
      product_id: number;
      status?: string; // e.g., "active", "cancelled"
      renews_at?: string;
      // ... other fields
    };
  };
}

// Map Lemon Squeezy Variant IDs to our Plans
// IMPORTANT: The USER must replace these numbers with their actual Variant IDs from Lemon Squeezy Dashboard
const PLAN_VARIANT_MAP: Record<string, string> = {
  // Example IDs - REPLACE THESE
  // "123456": "VOICE_WEEKLY", 
  // "234567": "STARTER", // Video Start (One-time or Sub?)
  // "345678": "PREMIUM", // Elite
  // "456789": "COACHING"
};

// Fallback: Map by Product Name if desired, but Variant ID is safer
const PLAN_NAME_MAP: Record<string, string> = {
  "Voz Semanal": "VOICE_WEEKLY",
  "Video Start": "STARTER", // Assume this gives credits but stays FREE or upgrades? 
  // Usually STARTER is a one-time thing in the pitch, but could be a plan. 
  // Based on checking usage logic, User.plan is "FREE" or "PREMIUM".
  // Video Start might just add credits.
  "Elite": "PREMIUM",
};

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const hmacHeader = req.headers.get("X-Signature");

    if (!hmacHeader) {
      return NextResponse.json({ error: "Missing Signature" }, { status: 400 });
    }

    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

    if (!secret) {
      console.error("LEMONSQUEEZY_WEBHOOK_SECRET is not set");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(hmacHeader, "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return NextResponse.json({ error: "Invalid Signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody) as LemonSqueezyWebhookPayload;
    const { event_name, custom_data } = payload.meta;
    const { attributes, id: subscriptionId } = payload.data;
    
    // We expect user_id in custom_data
    const userId = custom_data?.user_id;

    if (!userId) {
      console.warn("Webhook received without user_id in custom_data. Cannot associate with user.");
      // We process it anyway if we can find by customer_id or subscription_id later, 
      // but for 'subscription_created' we typically need userId.
    }

    console.log(`Received Lemon Squeezy event: ${event_name} for user: ${userId}`);

    // --- Handle Events ---

    if (event_name === "subscription_created" || event_name === "subscription_updated" || event_name === "subscription_resumed") {
      await handleSubscriptionChange(userId, payload.data);
    } 
    else if (event_name === "subscription_cancelled" || event_name === "subscription_expired") {
      await handleSubscriptionCancellation(payload.data);
    }
    else if (event_name === "order_created") {
      // Handle one-time purchases (like "Video Start" passed as a non-subscription product?)
      // If "Video Start" is a subscription (e.g. 7 days access), it fits above.
      // If it's a one-time manual renewable, it's an order.
      // For now, let's assume subscriptions for plans.
      await handleOrderCreated(userId, payload.data);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleSubscriptionChange(userId: string | undefined, data: any) {
  const attributes = data.attributes;
  const variantId = attributes.variant_id?.toString();
  const customerId = attributes.customer_id?.toString();
  const subscriptionId = data.id?.toString();
  const status = attributes.status; // e.g., "active"
  const renewsAt = attributes.renews_at ? new Date(attributes.renews_at) : null;

  // Determine App Plan from Variant
  let appPlan = "FREE"; 
  
  // Logic to map variantId to "PREMIUM" or others.
  // For MVP, we might just set to "PREMIUM" if ANY valid subscription comes in, 
  // or distinguish based on variant.
  
  // Example mapping logic (needs real IDs)
  // if (variantId === "123") appPlan = "PREMIUM";
  
  // TEMPORARY LOGIC: Check product name if available in attributes (some payloads have it included or we fetch)
  // But attributes usually don't have product_name directly, just product_id.
  // We'll rely on the user mapping.
  
  // If we don't have the map yet, let's default to "PREMIUM" for ANY active subscription 
  // just to enable access, assuming they only sell Pro plans.
  if (status === "active" || status === "on_trial") {
    appPlan = "PREMIUM"; 
    // In a real scenario, differentiate: Voz Semanal vs Elite.
    // We could store the 'tier' in the User model if 'plan' isn't enough.
    // Currently User.plan is String.
  }

  if (userId) {
    // First time subscription or explicit user_id
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: appPlan, // Update plan
        lemonSqueezyCustomerId: customerId,
        lemonSqueezySubscriptionId: subscriptionId,
        subscriptionStatus: status,
        subscriptionRenewsAt: renewsAt,
      },
    });

    // Also update generic Usage limits based on plan
    // This is where "Business Logic" of limits lives.
    // e.g. Elite = 100/mo, Voice Weekly = 20/wk.
    // Since we don't know EXACTLY which plan without IDs, we might skip this 
    // or set a default "Premium" limit.
    // Ideally code:
    // const limits = getLimitsForVariant(variantId);
    // await updateUsageLimits(userId, limits);
  } else if (subscriptionId) {
    // Update by subscription ID (e.g. renewal)
    await prisma.user.update({
      where: { lemonSqueezySubscriptionId: subscriptionId },
      data: {
        subscriptionStatus: status,
        subscriptionRenewsAt: renewsAt,
        plan: appPlan, // Ensure plan stays active
      },
    });
  }
}

async function handleSubscriptionCancellation(data: any) {
  const subscriptionId = data.id?.toString();
  const status = data.attributes.status; // "cancelled", "expired"
  
  if (subscriptionId) {
    // We might want to keep the plan 'active' until the end of period?
    // Lemon Squeezy sends "cancelled" when user cancels, but entitlement remains until `ends_at`.
    // "expired" means access lost.
    
    // If expired, revert to FREE.
    if (status === "expired") {
      await prisma.user.update({
        where: { lemonSqueezySubscriptionId: subscriptionId },
        data: {
          plan: "FREE",
          subscriptionStatus: status,
        },
      });
    } else {
      // Just update status (e.g. "cancelled" but still valid until renewsAt)
      await prisma.user.update({
        where: { lemonSqueezySubscriptionId: subscriptionId },
        data: {
          subscriptionStatus: status,
        },
      });
    }
  }
}

async function handleOrderCreated(userId: string | undefined, data: any) {
  // Handle one-time purchases if necessary (e.g. "7 Days Pass")
  // logic similar to above.
  console.log("Order created - logic pending based on product type");
}
