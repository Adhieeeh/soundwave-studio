import React, { useState, useEffect, useRef } from 'react';


const SOUNDS_DATA = [
  { id: 'rain', name: '🌧️ Heavy Rain', url: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Rain_On_Roof_Loop.ogg' },
  { id: 'cafe', name: '☕ Paris Cafe Ambience', url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Ambiance_Caf%C3%A9_Paris.ogg' },
  { id: 'fire', name: '🔥 Crackling Campfire', url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Campfire_Cracking.ogg' },
  { id: 'birds', name: '🌲 Forest Birds Whisper', url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Forest_ambience_with_birds.ogg' }
];

function App() {
  
  const [volumes, setVolumes] = useState({ rain: 0.5, cafe: 0, fire: 0, birds: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  
  
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  
  const audioRefs = useRef({});

 
  useEffect(() => {
    SOUNDS_DATA.forEach(sound => {
      const audio = new Audio(sound.url);
      audio.loop = true;
      audio.volume = volumes[sound.id];
      audioRefs.current[sound.id] = audio;
    });

   
    return () => {
      SOUNDS_DATA.forEach(sound => {
        audioRefs.current[sound.id]?.pause();
      });
    };
  }, []);

  
  useEffect(() => {
    SOUNDS_DATA.forEach(sound => {
      const audio = audioRefs.current[sound.id];
      if (audio) {
        if (isPlaying && volumes[sound.id] > 0) {
          audio.play().catch(() => console.log("User gesture required for audio activation."));
        } else {
          audio.pause();
        }
      }
    });
  }, [isPlaying]);

 
  useEffect(() => {
    let interval = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setTimerRunning(false);
      alert("🎉 Focus session completed successfully! Time to take a break.");
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  
  const handleVolumeChange = (soundId, value) => {
    const currentVolume = parseFloat(value);
    setVolumes(prev => ({ ...prev, [soundId]: currentVolume }));

    const audio = audioRefs.current[soundId];
    if (audio) {
      audio.volume = currentVolume;
      if (isPlaying && currentVolume > 0 && audio.paused) {
        audio.play().catch(() => {});
      } else if (currentVolume === 0) {
        audio.pause();
      }
    }
  };

 
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: '850px', margin: '40px auto', padding: '24px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#0b1329', borderRadius: '24px', border: '1px solid #1c2541', color: '#f8fafc', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
      
      {/* */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1c2541', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: '0', fontSize: '26px', color: '#4cc9f0', letterSpacing: '0.5px' }}>🎵 SoundWave Studio</h1>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '13px' }}>Craft your ultimate atmospheric spatial workspace mix to eliminate distractions.</p>
        </div>
        <button 
          onClick={() => setIsPlaying(!isPlaying)} 
          style={{ padding: '12px 28px', backgroundColor: isPlaying ? '#f72585' : '#4cc9f0', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: '0.2s', boxShadow: '0 4px 14px rgba(76,201,240,0.2)' }}
        >
          {isPlaying ? '⏸️ Mute Studio Mix' : '▶️ Activate Studio Environment'}
        </button>
      </header>

      {/* */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        
        {/* */}
        <section style={{ backgroundColor: '#1c2541', padding: '25px', borderRadius: '16px', border: '1px solid #3a0ca3' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#4cc9f0', uppercase: 'true' }}>Atmospheric Environmental Volumes</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {SOUNDS_DATA.map(sound => (
              <div key={sound.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '600' }}>
                  <span>{sound.name}</span>
                  <span style={{ color: '#4cc9f0' }}>{Math.round(volumes[sound.id] * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.01" 
                  value={volumes[sound.id]} 
                  onChange={(e) => handleVolumeChange(sound.id, e.target.value)}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#4cc9f0' }}
                />
              </div>
            ))}
          </div>
        </section>

        {/*  */}
        <section style={{ backgroundColor: '#1c2541', padding: '25px', borderRadius: '16px', border: '1px solid #3a0ca3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', color: '#64748b' }}>🎯 POMODORO CORE FOCUS CHRONOMETER</h3>
          
          {/*  */}
          <div style={{ fontSize: '64px', fontWeight: '800', fontFamily: 'monospace', color: '#f8fafc', margin: '15px 0' }}>
            {formatTime(timeLeft)}
          </div>

          {/*  */}
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button 
              onClick={() => setTimerRunning(!timerRunning)} 
              style={{ flex: 2, padding: '12px', backgroundColor: timerRunning ? '#64748b' : '#4cc9f0', color: '#0b1329', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
            >
              {timerRunning ? 'Pause Session' : 'Start Focus Session'}
            </button>
            <button 
              onClick={() => { setTimerRunning(false); setTimeLeft(25 * 60); }} 
              style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', border: '2px solid #64748b', color: '#ffffff', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;