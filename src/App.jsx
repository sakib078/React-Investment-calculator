import React from 'react';
import Input from './components/Input';
import Result from './components/Result.jsx'

import {calculateInvestmentResults} from '../src/util/investment.js'

const InputFieldList = [
  { label: 'INITIAL INVESTMENT', value: '10000' },
  { label: 'ANNUAL INVESTMENT', value: '1200' },
  { label: 'EXPECTED RETURN', value: '6' },
  { label: 'DURATION', value: '10' }
];



// source : https://stackoverflow.com/questions/2970525/converting-a-string-with-spaces-into-camel-case
function camelize(text) {
  const a = text.toLowerCase()
      .replace(/[-_\s.]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
  return a.substring(0, 1).toLowerCase() + a.substring(1);
}


function normalizeObject(inputValue)
{
  return inputValue.map(fields =>
    {
        return  {...fields , label : camelize(fields.label) , value: parseInt(fields.value) };
    } 
  )
}


function converToSingleObject(updatedValue)
{
  return updatedValue.reduce((acc, field) => {
    acc[field.label] = field.value;
    return acc;
   }, {});
} 


function App() {

    const [inputValue , setValue] = React.useState(InputFieldList);


    const newValues = [...InputFieldList.map(list => list)];
    

    const handleSelect = (e) =>
      {
        const selectedId = e.target.id;

        setValue((preValue) =>
        {

          // passed try 
          const newObject = preValue.map((list, index) =>  
            index === parseInt(selectedId) ? { ...list, value: e.target.value } : list
        );


          // failed tries ....

          // const newObject  = preValue.map((list, index) =>  
          //   index === selectedId ? {label: list[selectedId].label , value: e.target.value} : list
          // )
          // const newObject = selectedId ? [{label: preValue[selectedId].label , value: e.target.value, index : selectedId}, ...preValue] : preValue

          return newObject;
        }
        );
      }

    let data = newValues.map((fields, index) => (
        <Input 
            id={index} 
            label={fields.label} 
            value={fields.value} 
            onSelect= {handleSelect} // Handle onChange as needed
        /> 
    ));


    console.log(inputValue);

    // normalize the inputValue object (label into camelCase and convert value to intiger data Type)
    const updatedValue = normalizeObject(inputValue);
    
    // Convert the array of objects into a single object  = {label : value}
    const reducedValues = converToSingleObject(updatedValue);

    // Now you can destructure the object and pass the props to the function
    const finalResult = calculateInvestmentResults(reducedValues);

    console.log(finalResult);

    return (
        <>
            <div id="user-input">
                {data}
            </div>
            {<Result results={finalResult} />}
        </>
    );
}

export default App;
