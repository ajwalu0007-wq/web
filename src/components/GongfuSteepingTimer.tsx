import React, { useState, useEffect, useRef } from 'react';
import { TeaItem } from '../types/tea';
import { Play, Pause, RotateCcw, SkipForward, Volume2, Thermometer, Droplets, Sparkles, Coffee } from 'lucide-react';

interface GongfuSteepingTimerProps {
  teas: TeaItem[];
  selectedTea: TeaItem;
  onSelectTea: (tea: TeaItem) => void;
}

export const GongfuSteepingTimer: React.FC<GongfuSteepingTimerProps> = ({
  teas,
  selectedTea,
  onSelectTea,
}) => {
  const [currentInfusionIndex, setCurrentInfusionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(selectedTea.brewing.steepTimesSec[0] || 30);
  const [isRunning, setIsRunning] = useState(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // When selectedTea changes, reset timer
  useEffect(() => {
    setCurrentInfusionIndex(0);
    const initialTime = selectedTea.brewing.steepTimesSec[0] || 30;
    setTimeLeft(initialTime);
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [selectedTea]);

  const currentMaxTime = selectedTea.brewing.steepTimesSec[currentInfusionIndex] || 30;

  // Web Audio API chime tone (pure Tibetan bronze bell / singing bowl synthesis)
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Warm resonant bell harmonics
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz calming frequency
      osc.frequency.exponentialRampToValueAtTime(264, ctx.currentTime + 1.8);
      
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 2.0);
    } catch {
      // AudioContext unavailable or blocked by browser policy
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundEnabled]);

  const handleTogglePlay = () => {
    if (timeLeft === 0) {
      // If at 0, reset current step
      setTimeLeft(currentMaxTime);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(currentMaxTime);
  };

  const handleSelectInfusion = (index: number) => {
    setIsRunning(false);
    setCurrentInfusionIndex(index);
    setTimeLeft(selectedTea.brewing.steepTimesSec[index] || 30);
  };

  const handleNextInfusion = () => {
    const nextIdx = Math.min(
      selectedTea.brewing.steepTimesSec.length - 1,
      currentInfusionIndex + 1
    );
    handleSelectInfusion(nextIdx);
  };

  // Progress percentage
  const progressPercent = Math.max(0, Math.min(100, ((currentMaxTime - timeLeft) / currentMaxTime) * 100));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="brewing-guide" className="bg-[#242A22] text-[#F3F4EE] py-16 md:py-24 border-y border-[#343D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="text-xs uppercase tracking-[0.25em] font-medium text-[#9BA896]">
            The Ritual & Craft
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F4F5F0]">
            Interactive Gongfu Steeper
          </h2>
          <p className="text-sm text-[#A8B2A3] leading-relaxed">
            Gongfu Cha (工夫茶) is the art of brewing with deliberate skill. Follow calculated water temperatures, vessel geometries, and multi-infusion timing to awaken hidden aromatic layers.
          </p>
        </div>

        {/* Master Steeper Console */}
        <div className="bg-[#1C211B] rounded-sm border border-[#343E31] p-6 sm:p-10 shadow-xl max-w-4xl mx-auto">
          
          {/* Tea Selector Bar */}
          <div className="mb-8 pb-6 border-b border-[#2E372B]">
            <label className="text-xs uppercase tracking-wider text-[#8A9585] block mb-2 font-medium">
              Select Cultivar to Brew
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {teas.map((t) => {
                const isCurrent = t.id === selectedTea.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTea(t)}
                    className={`px-3 py-2 text-xs rounded-sm whitespace-nowrap transition-colors ${
                      isCurrent
                        ? 'bg-[#3A4D3A] text-white font-medium border border-[#526D52]'
                        : 'bg-[#283026] text-[#A6B0A2] hover:bg-[#323D30] hover:text-[#EDF0EB]'
                    }`}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brewing Architecture Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#242C23] p-4 rounded-sm border border-[#343F32]">
              <div className="flex items-center justify-between text-[#8E9B89] text-xs mb-1">
                <span className="uppercase tracking-wider">Water Temp</span>
                <button
                  onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
                  className="text-[10px] text-[#AABAA4] hover:text-white underline"
                >
                  °{tempUnit === 'C' ? 'F' : 'C'}
                </button>
              </div>
              <div className="font-serif text-2xl font-normal text-[#F1F3EE] tabular-nums">
                {tempUnit === 'C' ? `${selectedTea.brewing.waterTempC}°C` : `${selectedTea.brewing.waterTempF}°F`}
              </div>
              <div className="text-[11px] text-[#7A8675] mt-1">
                {selectedTea.brewing.waterTempC >= 95 ? 'Rolling boil spring water' : 'Gently cooled spring water'}
              </div>
            </div>

            <div className="bg-[#242C23] p-4 rounded-sm border border-[#343F32]">
              <div className="text-[#8E9B89] text-xs mb-1 uppercase tracking-wider">
                Leaf Ratio
              </div>
              <div className="font-serif text-2xl font-normal text-[#F1F3EE] tabular-nums">
                {selectedTea.brewing.leafWeightGrams}g / {selectedTea.brewing.waterVolumeMl}ml
              </div>
              <div className="text-[11px] text-[#7A8675] mt-1">
                High leaf-to-water ratio
              </div>
            </div>

            <div className="bg-[#242C23] p-4 rounded-sm border border-[#343F32] col-span-2">
              <div className="text-[#8E9B89] text-xs mb-1 uppercase tracking-wider">
                Recommended Vessel
              </div>
              <div className="text-sm font-medium text-[#F1F3EE] truncate">
                {selectedTea.brewing.recommendedVessel}
              </div>
              <div className="text-[11px] text-[#7A8675] mt-1 truncate">
                Retains heat and enhances aroma extraction
              </div>
            </div>
          </div>

          {/* Steeping Timeline Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3 text-xs text-[#8A9585]">
              <span className="uppercase tracking-wider">Infusion Sequence ({selectedTea.brewing.steepTimesSec.length} Rounds)</span>
              <span>Tap step to jump</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
              {selectedTea.brewing.steepTimesSec.map((sec, idx) => {
                const isCurrent = idx === currentInfusionIndex;
                const isPassed = idx < currentInfusionIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectInfusion(idx)}
                    className={`py-2 px-2.5 text-center rounded-sm transition-all border ${
                      isCurrent
                        ? 'bg-[#3A4E39] border-[#698867] text-white shadow-xs'
                        : isPassed
                        ? 'bg-[#20271F] border-[#2A3428] text-[#7E8A79]'
                        : 'bg-[#273026] border-[#344032] text-[#A6B2A1] hover:border-[#4B5C49]'
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-wider opacity-75">#{idx + 1}</div>
                    <div className="text-xs font-mono font-semibold tabular-nums mt-0.5">{sec}s</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Countdown Ring & Clock */}
          <div className="bg-[#222921] rounded-sm border border-[#333D30] p-8 text-center relative overflow-hidden">
            {/* Visual steam aura when timer is active */}
            {isRunning && (
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D4330]/20 via-transparent to-transparent pointer-events-none animate-pulse" />
            )}

            <div className="inline-block relative">
              <div className="text-xs uppercase tracking-[0.2em] text-[#93A18F] mb-1 font-medium">
                Infusion #{currentInfusionIndex + 1} · Target {currentMaxTime}s
              </div>
              <div className="font-mono text-6xl sm:text-7xl font-bold tracking-tight text-[#FAFBF7] tabular-nums my-2">
                {formatTime(timeLeft)}
              </div>
              <div className="text-xs text-[#7E8B7A] italic">
                {timeLeft === 0 ? 'Steep complete — decant into pitcher immediately!' : isRunning ? 'Extracting aromatic oils...' : 'Ready to pour water'}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto h-1.5 bg-[#2F3A2E] rounded-full overflow-hidden mt-6">
              <div
                className="h-full bg-[#527750] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handleReset}
                className="p-3 rounded-full bg-[#2C362A] text-[#A3B09F] hover:text-white hover:bg-[#374435] transition-colors"
                title="Reset this infusion"
                aria-label="Reset this infusion"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={handleTogglePlay}
                className="px-8 py-3.5 rounded-sm bg-[#3E553D] hover:bg-[#4B674A] text-white text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-md transition-colors"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>{timeLeft === 0 ? 'Restart' : 'Begin Steep'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleNextInfusion}
                disabled={currentInfusionIndex >= selectedTea.brewing.steepTimesSec.length - 1}
                className="p-3 rounded-full bg-[#2C362A] text-[#A3B09F] hover:text-white hover:bg-[#374435] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Advance to next infusion"
                aria-label="Advance to next infusion"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#7E8B7A]">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="flex items-center gap-1.5 hover:text-[#C5D0C2] transition-colors"
              >
                <Volume2 className={`w-3.5 h-3.5 ${soundEnabled ? 'text-[#84A380]' : 'text-gray-500'}`} />
                <span>{soundEnabled ? 'Singing Bowl Chime: On' : 'Singing Bowl Chime: Muted'}</span>
              </button>
            </div>
          </div>

          {/* Sommelier Advice Note */}
          <div className="mt-6 p-4 rounded-sm bg-[#222921]/60 border border-[#2D362B] text-xs text-[#9DAAA5] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#8BA487] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#D4DED2] uppercase tracking-wider block mb-0.5">
                Tea Master Advice for {selectedTea.name}
              </span>
              <p className="leading-relaxed">
                {selectedTea.brewing.advice}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
