import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import axios from '../../services/api';

import './style.css';

function NewIncident() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  const ongId = localStorage.getItem('id');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try{
      await axios.post('/incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    }catch(e) {
      alert('Erro, tente novamente.');
    }
    

  }

  return (
    <div className="new-incident-container">
      <div className="content">

        <section>
          <img src={logoImg} alt="Be the Hero"/>

          <h1>Cadastrar Novo Caso</h1>
          <p>Descreva o caso detalhado junto com o valor necessário e encontre 
            o herói que irá resolvê-lo.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para tela de login
          </Link>
        </section>

        <form onSubmit={handleNewIncident} >
          <input 
            placeholder="Título do caso" 
            value={title}
            onChange={ e => setTitle(e.target.value) }
          />
          <textarea 
            placeholder="Descrição"
            value={description}
            onChange={ e => setDescription(e.target.value) }
          />
          <input 
            placeholder="Valor em R$" 
            value={value}
            onChange={ e => setValue(e.target.value) }
          />

          <button className="button" type="submit" > Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default NewIncident;