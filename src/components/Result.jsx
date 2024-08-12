import { formatter} from '../util/investment.js'


import React from 'react';

export default function Result({ results }) {

  const headers = (
    <tr>
      {Object.keys(results[0]).map((col) => (
        <th key={col}>{col}</th>
      ))}
    </tr>
  );

  const content = results.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {Object.values(row).map((col, colIndex) => (
        <td key={colIndex}>{ colIndex === 0 ? col : formatter.format(col) }</td>
      ))}
    </tr>
  ));

  return (
    <div id="result">
      <table>
        <thead>{headers}</thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
