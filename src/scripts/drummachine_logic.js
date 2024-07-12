import React, { useState, useEffect } from 'react';

const audioClips = [
  { keyCode: 81, keyTrigger: "Q", id: "Heater-1", id2: "Chord 1", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
  { keyCode: 87, keyTrigger: "W", id: "Heater-2", id2: "Chord 2", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
  { keyCode: 69, keyTrigger: "E", id: "Heater-3", id2: "Chord 3", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3" },
  { keyCode: 65, keyTrigger: "A", id: "Heater-4", id2: "Shaker", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
  { keyCode: 83, keyTrigger: "S", id: "Clap", id2: "Open HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
  { keyCode: 68, keyTrigger: "D", id: "Open-HH", id2: "Closed HH", url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3" },
  { keyCode: 90, keyTrigger: "Z", id: "Kick-n-Hat", id2: "Punchy Kick", url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
  { keyCode: 88, keyTrigger: "X", id: "Kick", id2: "Side Stick", url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3" },
  { keyCode: 67, keyTrigger: "C", id: "Closed-HH", id2: "Snare", url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3", url2: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" }
];

const LoadButtons = ({ switchOn, bankOn, volume }) => {
  const audio = new Audio();
  const [activeKey, setActiveKey] = useState(null); 
  const [disabled, setDisabled] = useState(true);
  let lp = document.getElementById("last-played"); 

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!switchOn) return;
      const clip = audioClips.find(clip => clip.keyCode === e.keyCode);
      if (clip) {
        setActiveKey(clip.keyTrigger);
        lp.textContent = bankOn ? clip.id2 : clip.id;
        bankOn ? playSFX(clip.url2) : playSFX(clip.url);
      }
      setTimeout(() => {
        setActiveKey(null);
      }, 300);
    };
  
    setDisabled(!switchOn);
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchOn, bankOn, volume]);
  

  const handleButtonClick = (keyTrigger, id, id2, url, url2) => {
    if (disabled) return; 
    setActiveKey(keyTrigger); 
    lp.textContent = bankOn ? id2 : id; 
    bankOn ? playSFX(url2) : playSFX(url); 
    setTimeout(() => {
      setActiveKey(null); 
    }, 300);
  };

  const playSFX = (src) => {
    try {
      audio.src = src; 
      audio.volume = volume; 
      audio.play(); 
    } catch (err) {
      console.log(err); 
    }
  };

  const rows = [];
  for (let i = 0; i < audioClips.length; i += 3) {
    rows.push(audioClips.slice(i, i + 3)); 
  }

  return (
    <div id="display">
      {
        rows.map((row, rowIndex) => (
          <div key={rowIndex} className="btn-group-lg d-flex justify-content-end mt-2">
            {
              row.map(prop => (
                <button
                  key={prop.keyTrigger}
                  className={`btn btn-secondary btn-tr ms-3 
                    ${activeKey === prop.keyTrigger && switchOn ? 'active' : ''} 
                    ${disabled ? 'disabled' : ''}`}
                  id={prop.id}
                  disabled={disabled}
                  onClick={() => handleButtonClick(prop.keyTrigger, prop.id, prop.id2, prop.url, prop.url2)}
                >
                  <span>{prop.keyTrigger}</span>
                  <audio
                    className="clip"
                    id={prop.keyTrigger}
                    src={bankOn ? prop.url2 : prop.url}
                  />
                </button>
              ))
            }
          </div>
        ))
      }
    </div>
  );
};

const LoadInputs = ({ setVolume, switchOn, handleSwitchToggle, bankOn, handleBankToggle }) => {
  return (
    <div>
      <div className="d-flex justify-content-center mb-3 me-5">
        <h4>Power</h4>
        <div className="form-check form-switch mb-3 ms-3">
          <input
            className="form-check-input"
            style={{ height: '25px', width: '45px' }}
            type="checkbox"
            onClick={handleSwitchToggle}
            defaultChecked={switchOn}
          />
        </div>
      </div>
      <div className="mb-3 me-5">
        <strong>Last Played SFX:</strong> <br /> <span id="last-played">-</span>
      </div>
      <div className="d-flex justify-content-center mb-3 me-5">
        <input type="range" style={{width: '60%'}} min="0" max="100" id="volume-range"
          onChange={(e) => setVolume(e.target.value / 100)} />
      </div>
      <div className="d-flex justify-content-center mb-3 me-5">
        <h4>Bank</h4>
        <div className="form-check form-switch mb-3 ms-3">
          <input
            className="form-check-input"
            style={{ height: '25px', width: '45px' }}
            type="checkbox"
            onClick={handleBankToggle}
            checked={bankOn}
            disabled={!switchOn}
          />
        </div>
      </div>
    </div>
  );
};

export { LoadButtons, LoadInputs };
