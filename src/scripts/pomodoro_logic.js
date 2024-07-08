import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faSync, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import phoneAudio from '../audio/phoneAUDIO.wav';

const Pomodoro = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [timerLabel, setTimerLabel] = useState('Session');

  const beepAudio = useRef(null);
  const timerInterval = useRef(null);

  const handleBreakIncrement = () => {
    if (breakLength < 60) setBreakLength(breakLength + 1);
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) setBreakLength(breakLength - 1);
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      const newSessionLength = sessionLength + 1;
      setSessionLength(newSessionLength);
      if (isSession) setTimeLeft(newSessionLength * 60);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      const newSessionLength = sessionLength - 1;
      setSessionLength(newSessionLength);
      if (isSession) setTimeLeft(newSessionLength * 60);
    }
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timerInterval.current);
    } else {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 0) {
            beepAudio.current.play();
            if (isSession) {
              setTimerLabel('Break');
              setIsSession(false);
              return breakLength * 60;
            } else {
              setTimerLabel('Session');
              setIsSession(true);
              return sessionLength * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(timerInterval.current);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(1500);
    setIsRunning(false);
    setIsSession(true);
    setTimerLabel('Session');
    beepAudio.current.pause();
    beepAudio.current.currentTime = 0;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="pomodoro-container d-flex flex-column align-items-center justify-content-center">
      <h1>Pomodoro</h1>
      <div className="d-flex justify-content-around w-50">
        <div className="length-control d-flex flex-column align-items-center border-container">
          <h3 id="break-label">Break Length</h3>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faArrowUp} className="icon-button" id="break-increment" onClick={handleBreakIncrement} />
            <span className="mx-2" id="break-length">{breakLength}</span>
            <FontAwesomeIcon icon={faArrowDown} className="icon-button" id="break-decrement" onClick={handleBreakDecrement} />
          </div>
        </div>
        <div className="length-control d-flex flex-column align-items-center border-container">
          <h3 id="session-label">Session Length</h3>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faArrowUp} className="icon-button" id="session-increment" onClick={handleSessionIncrement} />
            <span className="mx-2" id="session-length">{sessionLength}</span>
            <FontAwesomeIcon icon={faArrowDown} className="icon-button" id="session-decrement" onClick={handleSessionDecrement} />
          </div>
        </div>
      </div>
      <div className="time-control d-flex flex-column align-items-center">
        <div className="time-display border-container" id="time-left">{formatTime(timeLeft)}</div>
        <h3 id="timer-label">{timerLabel}</h3>
        <div className="controls d-flex justify-content-center">
          <FontAwesomeIcon icon={faPlayCircle} className="mx-2 icon-button" id="start_stop" onClick={handleStartStop} />
          <FontAwesomeIcon icon={faSync} className="mx-2 icon-button" id="reset" onClick={handleReset} />
        </div>
      </div>
      <audio id="beep" ref={beepAudio} src={phoneAudio}></audio>
    </div>
  );
};

export default Pomodoro;
