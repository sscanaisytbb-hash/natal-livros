import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: '04',
    minutes: '38',
    seconds: '22',
  });

  useEffect(() => {
    const STORAGE_KEY = 'natal_end_timestamp';
    let target = 0;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        target = parseInt(stored, 10);
      }
    } catch {
      // ignore storage error
    }

    // Se não existir ou já tiver expirado, cria novo timer de ~4 horas e 45 min para gerar urgência autêntica
    if (!target || target < Date.now()) {
      target = Date.now() + (4 * 3600 + 47 * 60 + 15) * 1000;
      try {
        localStorage.setItem(STORAGE_KEY, target.toString());
      } catch {
        // ignore
      }
    }

    const pad = (n: number) => String(Math.max(0, n)).padStart(2, '0');

    const updateTimer = () => {
      const diff = Math.max(0, target - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 my-5 select-none">
      <div className="bg-[#000] border border-[#B3131B] rounded-xl px-3 sm:px-4 py-2 min-w-[68px] sm:min-w-[76px] text-center shadow-md">
        <span className="block font-garamond font-bold text-3xl sm:text-4xl text-[#D9A441] leading-none">
          {timeLeft.hours}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-[#b9ae9c] font-medium">
          horas
        </span>
      </div>

      <span className="font-garamond text-2xl text-[#D9A441] font-bold pb-2">:</span>

      <div className="bg-[#000] border border-[#B3131B] rounded-xl px-3 sm:px-4 py-2 min-w-[68px] sm:min-w-[76px] text-center shadow-md">
        <span className="block font-garamond font-bold text-3xl sm:text-4xl text-[#D9A441] leading-none">
          {timeLeft.minutes}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-[#b9ae9c] font-medium">
          min
        </span>
      </div>

      <span className="font-garamond text-2xl text-[#D9A441] font-bold pb-2">:</span>

      <div className="bg-[#000] border border-[#B3131B] rounded-xl px-3 sm:px-4 py-2 min-w-[68px] sm:min-w-[76px] text-center shadow-md">
        <span className="block font-garamond font-bold text-3xl sm:text-4xl text-[#D9A441] leading-none">
          {timeLeft.seconds}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-[#b9ae9c] font-medium">
          seg
        </span>
      </div>
    </div>
  );
};
