import React, { useState } from 'react';

const LoadButtons = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState('');

  const pressNumbers = (e) => {
    const value = e.target.value;
    if (displayValue === '0' && value === '.') {
      setDisplayValue('0.'); // Fix for the bug with '0.' disappearing
    } else if (displayValue === '0') {
      setDisplayValue(value);
    } else {
      setDisplayValue(displayValue + value);
    }
  };

  const handleOperator = (e) => {
    const op = e.target.value;
    if (displayValue === '' && previousValue !== '') {
      
      setOperator(op);
      setPreviousValue(previousValue.slice(0, -1) + op);
    } else if (displayValue !== '') {
      const current = parseFloat(displayValue);
      const previous = parseFloat(previousValue);
      let result = 0;
      switch (operator) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '/':
          result = previous / current;
          break;
        default:
          result = current;
      }
      setPreviousValue(result.toString() + op);
      setDisplayValue('');
      setOperator(op);
    }
  };
  
  const calculate = () => {
    if (operator && previousValue !== '' && displayValue !== '') {
      const current = parseFloat(displayValue);
      const previous = parseFloat(previousValue);
      let result = 0;
      switch (operator) {
        case '+':
          result = previous + current;
          break;
        case '-':
          result = previous - current;
          break;
        case '*':
          result = previous * current;
          break;
        case '/':
          result = previous / current;
          break;
        default:
          break;
      }
      setDisplayValue(result.toString());
      setPreviousValue(result.toString() + operator);
      setOperator(null);
    }
  };

  const clear = () => {
    setDisplayValue(0);
    setPreviousValue('');
    setOperator(null);
  };

  const numberGroups = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0]
  ];

  const operators = ['+', '-', '*', '/'];

  return (
    <div className="custom-calculator calculator card mt-5">
      <div className="custom-calculator-screen-container">
        <input 
          type="text" 
          className="custom-calculator-prev-screen" 
          value={previousValue} 
          disabled 
        />
        <input 
          type="text" 
          className="custom-calculator-screen calculator-screen z-depth-1" 
          value={displayValue} 
          disabled 
        />
      </div>
      <div className="custom-calculator-keys calculator-keys">
        {operators.map(op => (
          <button 
            key={op} 
            type="button" 
            data-mdb-button-init 
            value={op} 
            className="operator btn btn-info"
            onClick={handleOperator}
          >
            {op}
          </button>
        ))}
        {numberGroups.flat().map(number => (
          <button 
            key={number} 
            type="button" 
            data-mdb-button-init 
            value={number} 
            className="btn btn-dark"
            onClick={pressNumbers}
          >
            {number}
          </button>
        ))}
        <button 
          type="button" 
          data-mdb-button-init 
          className="decimal function btn btn-secondary" 
          value="."
          onClick={pressNumbers}
        >
          .
        </button>
        <button 
          type="button" 
          data-mdb-button-init 
          className="all-clear function btn btn-danger btn-sm" 
          value="all-clear"
          onClick={clear}
        >
          AC
        </button>
        <button 
          type="button" 
          data-mdb-button-init 
          className="equal-sign operator btn btn-default" 
          value="="
          onClick={calculate}
        >
          =
        </button>
      </div>
    </div>
  );
};

export { LoadButtons };

/*
SECOND VERSION, TOO BUGGY

import React, { useState } from 'react';
import '../styles/calc_style.css';

const LoadButtons = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');

  const pressButton = (e) => {
    const value = e.target.value;

    switch (value) {
      case '=':
        calculate();
        break;
      case 'all-clear':
        clear();
        break;
      case '.':
        handleDecimal();
        break;
      default:
        handleInput(value);
        break;
    }
  };

  const handleInput = (value) => {
    if (value === '0' && displayValue === '0') return; // Avoid multiple leading zeros
    if (value === '.' && displayValue.includes('.')) return; // Avoid multiple decimals

    setDisplayValue(displayValue + value);
  };

  const handleDecimal = () => {
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const calculate = () => {
    try {
      const result = evaluateExpression(displayValue);
      setPreviousValue(displayValue + '=');
      setDisplayValue(result.toString());
    } catch (error) {
      setDisplayValue('Error');
    }
  };

  const evaluateExpression = (expression) => {
    const operators = ['+', '-', '*', '/'];
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
  
    let outputQueue = [];
    let operatorStack = [];
  
    let currentNumber = '';
    let previousToken = null; // Track the previous token to handle unary minus
  
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (!isNaN(char) || char === '.') {
        currentNumber += char;
      } else if (operators.includes(char)) {
        if (currentNumber !== '') {
          outputQueue.push(parseFloat(currentNumber));
          currentNumber = '';
        }
  
        if (char === '-' && (previousToken === null || operators.includes(previousToken))) {
          currentNumber += '-';
        } else {
          while (
            operatorStack.length > 0 &&
            precedence[operatorStack[operatorStack.length - 1]] >= precedence[char]
          ) {
            outputQueue.push(operatorStack.pop());
          }
          operatorStack.push(char);
        }
      }
  
      previousToken = char;
    }
  
    if (currentNumber !== '') {
      outputQueue.push(parseFloat(currentNumber));
    }
  
    while (operatorStack.length > 0) {
      outputQueue.push(operatorStack.pop());
    }
  
    let resultStack = [];
    outputQueue.forEach((token) => {
      if (!isNaN(token)) {
        resultStack.push(token);
      } else {
        let b = resultStack.pop();
        let a = resultStack.pop();
        switch (token) {
          case '+':
            resultStack.push(a + b);
            break;
          case '-':
            resultStack.push(a - b);
            break;
          case '*':
            resultStack.push(a * b);
            break;
          case '/':
            if (b === 0) throw new Error('Division by zero');
            resultStack.push(a / b);
            break;
          default:
            break;
        }
      }
    });
  
    if (resultStack.length !== 1) throw new Error('Invalid expression');
    return resultStack[0];
  };
  

  const clear = () => {
    setDisplayValue(0);
    setPreviousValue(0);
  };

  return (
    <div className="custom-calculator calculator card mt-5">
      <div className="custom-calculator-screen-container">
        <input 
          type="text" 
          id="display"
          className="custom-calculator-prev-screen" 
          value={previousValue} 
          disabled 
        />
        <input 
          type="text" 
          id="display"
          className="custom-calculator-screen calculator-screen z-depth-1" 
          value={displayValue} 
          disabled 
        />
      </div>
      <div className="custom-calculator-keys calculator-keys">
        {[7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', 0, '.', '/', '='].map(item => (
          <button 
            key={item} 
            type="button" 
            id={
              typeof item === 'number'
                ? `number-${item}`
                : `operator-${item}`
            }
            value={item === '=' ? item : item.toString()} 
            className={`btn ${item === '=' ? 'btn-info' : 'btn-dark'}`}
            onClick={pressButton}
          >
            {item}
          </button>
        ))}
        <button 
          type="button" 
          id="clear"
          className="all-clear function btn btn-danger btn-sm" 
          value="all-clear"
          onClick={pressButton}
        >
          AC
        </button>
      </div>
    </div>
  );
};

export { LoadButtons };
*/
