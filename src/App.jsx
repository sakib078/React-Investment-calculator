import React from 'react';
import Input from './components/Input';
import Result from './components/Result.jsx';
import { calculateInvestmentResults } from '../src/util/investment.js';

const InputFieldList = [
  { label: 'INITIAL INVESTMENT', value: '10000' },
  { label: 'ANNUAL INVESTMENT', value: '1200' },
  { label: 'EXPECTED RETURN', value: '6' },
  { label: 'DURATION', value: '10' }
];

const defaultResultList = [
  {year:'', interest:'' , valueEndOfYear:'', annualInvestment :''}
]

// source : https://stackoverflow.com/questions/2970525/converting-a-string-with-spaces-into-camel-case
function camelize(text) {
  const a = text.toLowerCase()
      .replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return a.substring(0, 1).toLowerCase() + a.substring(1);
}

function normalizeObject(inputValue) {
  return inputValue.map(fields => {
    return { ...fields, label: camelize(fields.label), value: parseInt(fields.value) };
  });
}

function converToSingleObject(updatedValue) {
  return updatedValue.reduce((acc, field) => {
    acc[field.label] = field.value;
    return acc;
  }, {});
}

function App() {
  const [inputValue, setValue] = React.useState(InputFieldList);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    const selectedId = e.target.id;

    if (newValue >= 0) {
      setError(false);
      setErrorMessage('');
      handleSelect(e);
    } else {
      setError(true);
      setErrorMessage('Please enter the duraction greater then 0');
      e.target.defaultValue = 0;
    }

    if (selectedId === '3' && newValue === 0) {
      console.log('Hello');
      setError(false);
      setErrorMessage('');
    }
  };

  const newValues = [...InputFieldList.map(list => list)];

  const handleSelect = (e) => {
    const selectedId = e.target.id;

    setValue((preValue) => {
      const newObject = preValue.map((list, index) =>
        index === parseInt(selectedId) ? { ...list, value: e.target.value } : list
      );
      return newObject;
    });
  };

  let data = newValues.map((fields, index) => (
    <Input
      key={index}
      id={index.toString()}
      label={fields.label}
      value={fields.value}
      onSelect={handleChange} // handle the inputs and validate it.
    />
  ));

  console.log(inputValue);

  // normalize the inputValue object (label into camelCase and convert value to integer data type)
  const updatedValue = normalizeObject(inputValue);

  // Convert the array of objects into a single object = {label : value}
  const reducedValues = converToSingleObject(updatedValue);


  // Now you can destructure the object and pass the props to the function
  const finalResult = reducedValues.duration === 0 ? defaultResultList : calculateInvestmentResults(reducedValues);

  console.log(finalResult);

  return (
    <>
      <div id="user-input">
        {data}
      </div>
      {!error && <Result results={finalResult} />}
      {error && <p className='center'>{errorMessage}</p>}
    </>
  );
}

export default App;
