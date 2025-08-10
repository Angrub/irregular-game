import { createSignal } from "solid-js";

interface AudioContext {
  success: HTMLAudioElement;
  failure: HTMLAudioElement;
}

export function useAudio() {
  const [isMuted, setIsMuted] = createSignal(false);
  
  const audioContext: AudioContext = {
    success: new Audio("/sounds/success.mp3"),
    failure: new Audio("/sounds/failure.mp3")
  };

  Object.values(audioContext).forEach(audio => {
    audio.volume = 0.3;
    audio.preload = "auto";
  });

  const playSound = (sound: keyof AudioContext) => {
    if (isMuted()) return;
    
    try {
      const audio = audioContext[sound];
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn("No se pudo reproducir el sonido:", error);
      });
    } catch (error) {
      console.warn("Error al reproducir sonido:", error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted());
  };

  const setVolume = (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    Object.values(audioContext).forEach(audio => {
      audio.volume = clampedVolume;
    });
  };

  return {
    playSuccess: () => playSound("success"),
    playFailure: () => playSound("failure"),
    isMuted,
    toggleMute,
    setVolume
  };
}
