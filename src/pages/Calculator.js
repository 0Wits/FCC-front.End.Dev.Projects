import React from 'react';
import '../styles/calc_style.css';
import { LoadButtons } from '../scripts/calculator_logic';

function Calculator() {
  return (
    <div className='d-flex justify-content-center'>
      <LoadButtons />
    </div>
  );
}

export default Calculator;
