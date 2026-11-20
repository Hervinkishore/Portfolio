import { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';

/**
 * Atmospheric Terminal Audio Player
 * - Designed to auto-play background soundtrack (/audio/bg-music.mp3) in loop mode
 * - Handles browser autoplay policies cleanly:
 *   1. Tries immediate playback on load
 *   2. If browser requires interaction, keeps active listeners on document until playback successfully begins
 *   3. Once active, loops indefinitely unless user clicks OFF
 *   4. Zero race conditions between toggle button and document gestures
 */
export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const userMutedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.loop = true;

    // Track actual HTML5 audio state
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    // Function to attempt playback (only cleans up listeners when playback succeeds)
    const tryPlayAudio = () => {
      if (userMutedRef.current || !audio.paused) return;

      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            // Successfully playing -> remove document fallback listeners
            cleanupGestureListeners();
          })
          .catch(() => {
            // Browser blocked unprompted autoplay -> keep listeners alive for first user action
          });
      }
    };

    // 1. Attempt immediate playback on load
    tryPlayAudio();

    // 2. Gesture listener: fires on trusted user interaction (click, touch, keydown)
    const handleUserGesture = (e) => {
      if (e.target?.closest?.('.audio-toggle-btn')) {
        return; // Let the button's own onClick handle it
      }
      tryPlayAudio();
    };

    const cleanupGestureListeners = () => {
      document.removeEventListener('click', handleUserGesture);
      document.removeEventListener('touchend', handleUserGesture);
      document.removeEventListener('keydown', handleUserGesture);
    };

    document.addEventListener('click', handleUserGesture, { passive: true });
    document.addEventListener('touchend', handleUserGesture, { passive: true });
    document.addEventListener('keydown', handleUserGesture, { passive: true });

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      cleanupGestureListeners();
      audio.pause();
    };
  }, []);

  const toggleAudio = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      // User explicitly turned off audio
      userMutedRef.current = true;
      audio.pause();
    } else {
      // User explicitly turned on audio
      userMutedRef.current = false;
      audio.play().catch((err) => {
        console.error('Audio play error:', err);
      });
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/bg-music.mp3"
        loop
        autoPlay
        preload="auto"
      />

      {/* Audio Controller Button in Navbar */}
      <button
        type="button"
        onClick={toggleAudio}
        className="audio-toggle-btn btn-reflect flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E1612] border border-[#00FF41]/40 text-[11px] font-mono text-[#86EFAC] hover:border-[#00FF41] hover:text-[#00FF41] transition-all cursor-pointer shadow-xs select-none"
        title={isPlaying ? 'Audio Playing (Click to Turn OFF)' : 'Click to Enable Audio (Loop)'}
      >
        {/* Animated Equalizer Bars */}
        <div className={`flex items-end gap-[2px] h-3.5 ${isPlaying ? 'eq-active' : 'eq-inactive'}`}>
          <div className="eq-bar bar-1" />
          <div className="eq-bar bar-2" />
          <div className="eq-bar bar-3" />
          <div className="eq-bar bar-4" />
        </div>

        <span className="text-[10px] tracking-wider font-semibold">
          {isPlaying ? 'AUDIO: ON' : 'AUDIO: OFF'}
        </span>
      </button>
    </>
  );
}
