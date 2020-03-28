import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import axios from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './style.css';


function Profile() {

  const ongId = localStorage.getItem('id');
  const ongName = localStorage.getItem('ongName');

  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  useEffect( () => {
    const response = axios.get('/profile', {
      headers: {
        Authorization: ongId
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId] );

  async function handleDeleteIncident(id) {
    try{
      await axios.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(e) {
      alert('Erro ao excluir este caso, tente novamente.');
    }
  }

  return (
    <div className="profile-container">

      <header>
        <img src={logoImg} alt="Be the Hero"/>
        <span> Bem Vindo(a), {ongName} </span>

        <Link className="button" to="incidents/new"> Cadastrar um novo caso </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={16} color="#E02041" />
        </button>
      </header>

      <h1> Casos Cadastrados</h1>

      <ul>
        {console.log(incidents)}
        
        {incidents.map( incident => {
          return (
          <li key={incident.id} >
            <strong> CASO: </strong>
            <p> {incident.title} </p>

            <strong> DESCRIÇÃO: </strong>
            <p> {incident.description} </p>

            <strong> VALOR: </strong>
            <p>{Intl.NumberFormat('pt-BR', {
                style: 'currency', 
                currency: 'BRL'})
              .format(incident.value)} </p>

            <button type="button">
              <FiTrash2 size={20} color="#a8a8b3"
                onClick={ () => handleDeleteIncident(incident.id) } />
            </button>
          </li>
        ); })}

      </ul>

    </div>

  );
}

export default Profile;