import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import {FiLogIn} from 'react-icons/fi';

function Logon() {

  const [id, setId] = useState('');
  
  const history = useHistory();

  async function handleLogon(e) {
    e.preventDefault();

    try{
      const response = await axios.post('/sessions', {id});

      localStorage.setItem('id', id );
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile');
    }catch(error) {
      alert('Não foi possível completar o Logon, verifique o ID e tente novamete');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero"/>
      
        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>

          <Link to="/register">
            <FiLogIn size={16} color="#E02041" />
             Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}

export default Logon;