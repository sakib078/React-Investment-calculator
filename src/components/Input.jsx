import React  from "react";

export default function Input({ id, label, value, onSelect }) {

    return (  
        <div className=  "input-group" >
            <label>{label}</label>
            <input
              type="number"
              id={id}
              defaultValue={value}
              onChange={onSelect}
              min='0'
              required
             />
          </div>
    );
}
