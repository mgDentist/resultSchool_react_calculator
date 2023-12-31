import { useState } from 'react';
import styles from './App.module.css'

const App = () => {

  const buttonsNumber = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
  const signs = ['+', '-'];
  const resultsButtons = ['=', 'C'];
  const [resultString, setResultString] = useState('');
  const [greenText, setGreenText] = useState(false);

  const enterNumber = () => {
    return buttonsNumber.map((buttonNumber) => (
      <button
        className={styles.button}
        key={buttonNumber}
        onClick={() => {
          setResultString(resultString + buttonNumber);
          setGreenText(false);
        }}
      >
        {buttonNumber}
      </button>
    ))
  }

  const doAction = () => {
    return signs.map((sign) => (
      <button
        className={styles.button}
        key={sign}
        onClick={() => {
          setResultString(resultString + sign);
          setGreenText(false);
        }}
      >
        {sign}
      </button>
    ))
  }

  const calculateResult = (expression) => {
    let numbers = expression.split(/[+-]/);
    let operators = expression.replace(/[0-9]/g,'').split('');
    let result = parseFloat(numbers[0]);

    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '+') {
        result += parseFloat(numbers[i + 1]);
      } else if (operators[i] === '-') {
        result -= parseFloat(numbers[i + 1]);
      }
    }
    return result;
  }

  const showResult = () => {
    return resultsButtons.map((item) => (
      <button
        className={styles.button}
        key={item}
        onClick={() => {
          if (item === '=') {
            try {
              let result = calculateResult(resultString);
              setResultString(result.toString());
              setGreenText(true);
            }
            catch (error) {
              setResultString('Ошибка');
              setGreenText(false);
            }
          } else {
            setResultString('');
            setGreenText(false);
          }
          setGreenText(!greenText);
        }}
      >
        {item}
      </button>
    ))
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Калькулятор мечты</h1>
        <section>
          <p
            className={`${greenText ? styles.greenText : ''} ${styles.resultWindow}`}
          >
            {resultString}
          </p>
          <div
            className={styles.buttonsWrapper}
          >
            <p
              className={styles.numberButtons}
            >
              {enterNumber()}
            </p>
            <p
              className={styles.actionButtons}
            >
              {doAction()}
              {showResult()}
            </p>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
