import React from 'react';
import {default as PomodoroLogic} from '../scripts/pomodoro_logic';
import '../styles/pomodoro_style.css';

function Pomodoro() {
  return (
    <div>
      <PomodoroLogic />
    </div>
  );
}

export default Pomodoro;
