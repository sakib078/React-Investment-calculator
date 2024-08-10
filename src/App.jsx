import React from 'react';
import Input from './components/Input';

import {calculateInvestmentResults, formatter} from '../src/util/investment.js'

const InputFieldList = [
  { label: 'INITIAL INVESTMENT', value: '10000' },
  { label: 'ANNUAL INVESTMENT', value: '1200' },
  { label: 'EXPECTED RETURN', value: '6' },
  { label: 'DURATION', value: '10' }
];

function App() {
    const [value , setValue] = React.useState(InputFieldList);


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
    

    console.log(value);
  
    return (
        <>
            <div id="user-input">
                {data}
            </div>
            <div id="result">
                <p> {value.value} </p>
            </div>
        </>
    );
}

export default App;
