import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';

import { AutoInit } from 'materialize-css';
import { periods } from './periods';
import './App.css';

export default function App() {
  const [periodData, setPeriodData] = useState([]);


  useEffect(() => {
    AutoInit();
  }, []);

  const getData = useCallback(async (event) => {
    const selected = event.target.value;
    const response = await axios.get(
      `/api/transaction?period=${selected}`
    );
    setPeriodData(response.data);
  }, []);

  const totals = useMemo(() => {

    const revenue = periodData.reduce((acc, transaction) => {
      if (transaction.type === '+') {
        return acc + transaction.value;
      }
      return acc;
    }, 0);

    console.log(periodData, revenue);

    const cost = periodData.reduce((acc, transaction) => {
      if (transaction.type === '-') {
        return acc + transaction.value;
      }
      return acc;
    }, 0);

    const balance = revenue - cost;

    return {
      revenue,
      cost,
      balance
    }
  }, [periodData]);

  return (
    <div className="container">
      <div className="header">
        <h3>Bootcamp Full Stack - Desafio Final </h3>
        <h4> Controle Financeiro Pessoal </h4>

        <div className="period">
          <button className="btn waves-effect">
            <i className="material-icons">chevron_left</i>
          </button>

          <div className="custom-select">
            <select onChange={getData}>
              <option value="0">Selecione</option>
              {periods.map(period => (
                <option value={period}>{period}</option>
              ))}
            </select>
          </div>

          <button className="btn waves-effect">
            <i className="material-icons">chevron_right</i>
          </button>
        </div>

        <div className="totals">
          <p><b>Ganhos:</b><span class="revenue">{totals.revenue}</span></p>
          <p><b>Despesas:</b><span class="cost">{totals.cost}</span></p>
          <p><b>Saldo:</b><span class="balance">{totals.balance}</span></p>
        </div>
      </div>

      <main>
        {periodData.map(transaction => (
          <p>{transaction.description}</p>
        ))}
      </main>
    </div>
  );
}
