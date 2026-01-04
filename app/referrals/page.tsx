'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  getOrCreateReferralCode, 
  getReferralLink, 
  shareReferralLink,
  REFERRAL_REWARDS,
  type ReferralReward 
} from '@/lib/referrals/referralSystem';

export default function ReferralsPage() {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos de referidos
    const code = getOrCreateReferralCode();
    setReferralCode(code);
    setReferralLink(getReferralLink());
    
    // Fetch referral count from API (si existe)
    fetchReferralData(code);
  }, []);

  const fetchReferralData = async (code: string) => {
    try {
      const res = await fetch(`/api/referrals?code=${code}`);
      if (res.ok) {
        const data = await res.json();
        setReferralCount(data.referralCount || 0);
      }
    } catch (err) {
      console.error('Error fetching referral data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const success = await shareReferralLink();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const rewards = REFERRAL_REWARDS.map(r => ({
    ...r,
    unlocked: referralCount >= r.threshold,
  }));

  const nextReward = rewards.find(r => !r.unlocked);
  const progressToNext = nextReward 
    ? Math.round((referralCount / nextReward.threshold) * 100)
    : 100;

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/listen" className="text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-bold text-lg">Invitar Amigos 🎁</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-md mx-auto space-y-8 animate-fade-in">
        
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-6 text-center">
          <div className="text-5xl mb-3">🎁</div>
          <h2 className="text-2xl font-black mb-2">Gana Recompensas</h2>
          <p className="text-purple-100 text-sm">
            Invita amigos y desbloquea beneficios exclusivos
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-center">
            <p className="text-slate-400 text-sm mb-1">Invitaciones</p>
            <p className="text-4xl font-black text-white">{referralCount}</p>
          </div>
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-center">
            <p className="text-slate-400 text-sm mb-1">Recompensas</p>
            <p className="text-4xl font-black text-emerald-400">
              {rewards.filter(r => r.unlocked).length}/{rewards.length}
            </p>
          </div>
        </div>

        {/* Progress to next reward */}
        {nextReward && (
          <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
            <div className="flex justify-between items-center mb-3">
              <p className="text-slate-400 text-sm">Próxima recompensa</p>
              <p className="text-sm font-bold">{referralCount}/{nextReward.threshold}</p>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${progressToNext}%` }}
              ></div>
            </div>
            <p className="text-white font-bold">{nextReward.name}</p>
            <p className="text-slate-400 text-sm">{nextReward.description}</p>
          </div>
        )}

        {/* Share Card */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
          <h3 className="font-bold text-lg">Tu link de invitación</h3>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 bg-slate-800 rounded-xl text-sm text-slate-300 truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-3 rounded-xl font-bold transition-all ${
                copied 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>

          <button
            onClick={handleShare}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-xl font-bold text-lg transition-all"
          >
            Compartir ahora
          </button>
        </div>

        {/* Rewards List */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg">Todas las recompensas</h3>
          
          {rewards.map((reward, index) => (
            <div 
              key={reward.id}
              className={`bg-slate-900 rounded-2xl p-4 border transition-all ${
                reward.unlocked 
                  ? 'border-emerald-500 bg-emerald-900/20' 
                  : 'border-slate-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  reward.unlocked 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-800 text-slate-500'
                }`}>
                  {reward.unlocked ? '✓' : reward.threshold}
                </div>
                <div className="flex-1">
                  <p className={`font-bold ${reward.unlocked ? 'text-emerald-400' : 'text-white'}`}>
                    {reward.name}
                  </p>
                  <p className="text-slate-400 text-sm">{reward.description}</p>
                </div>
                {reward.unlocked && (
                  <span className="text-emerald-400 text-sm font-bold">Desbloqueado</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-800">
          <h3 className="font-bold mb-4">¿Cómo funciona?</h3>
          <ol className="space-y-3 text-sm text-slate-300">
            <li className="flex gap-3">
              <span className="text-purple-400 font-bold">1.</span>
              <span>Comparte tu link con amigos</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400 font-bold">2.</span>
              <span>Cuando se registran, tú ganas crédito</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-400 font-bold">3.</span>
              <span>Desbloquea recompensas automáticamente</span>
            </li>
          </ol>
        </div>

      </main>
    </div>
  );
}
