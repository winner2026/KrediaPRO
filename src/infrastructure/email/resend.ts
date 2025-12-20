export async function sendEmail(payload: { to: string; subject: string }) {
  return { status: "sent" };
}
