import React from 'react';
import {Link} from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';
import './style.css';

function NewIncident() {
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

        <form>
          <input placeholder="Título do caso" />
          <textarea placeholder="Descrição"/>
          <input placeholder="Valor em R$" />

          <button className="button" type="submit" > Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default NewIncident;