import { useState } from 'react';
import styles from './App.module.css'

const App = () => {

  const buttonsNumber = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'];
  const signs = ['+', '-'];
  const resultsButtons = ['=', 'C'];
  const [resultString, setResultString] = useState('');
  const [greenText, setGreenText] = useState(false);

  function calculateResult (expression) {
    // eslint-disable-next-line no-new-func
    const calculate = new Function('return ' + expression + ';');
    return calculate();
  }


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

  const showResult = () => {
    return resultsButtons.map((item) => (
      <button
        className={styles.button}
        key={item}
        onClick={() => {
          if (item === '=') {
            try {
              const result = calculateResult(resultString);
              setResultString(result.toString());
              setGreenText(true);
            } catch (error) {
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
