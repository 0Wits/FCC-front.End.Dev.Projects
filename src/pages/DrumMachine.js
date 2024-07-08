import React, { useState } from 'react';
import '../styles/DrumsStyle.css';
import { LoadButtons, LoadInputs } from '../scripts/drummachine_logic';

function DrumMachine() {
  const [switchOn, setSwitchOn] = useState(false); 
  const [bankOn, setBankOn] = useState(false); 
  const [volume, setVolume] = useState(0.5);
  const handleSwitchToggle = () => {
    setSwitchOn(prevState => !prevState); 
  };

  const handleBankToggle = () => {
    if (switchOn) {
      setBankOn(prevState => !prevState); 
    }
  };

  return (
    <div id="drum-machine" className="container text-center mt-5">
      <div className="row align-items-center">
        <div className="col">
          <LoadButtons switchOn={switchOn} bankOn={bankOn} volume={volume} />
        </div>
        <div className="col">
          <LoadInputs setVolume={setVolume} switchOn={switchOn} handleSwitchToggle={handleSwitchToggle} bankOn={bankOn} handleBankToggle={handleBankToggle} />
        </div>
      </div>
    </div>
  );
}

export default DrumMachine;
