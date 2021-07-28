import React from 'react';
import Main from '../../components/template/Main'

export default props=>
  <React.Fragment>
    <Main icon="home" title="Início" subtitle="Projeto React">
        <div className="display-4">Bem vindo!</div>
        <hr />
        <p className="mb-0">
          Sistema de cadastro de usuários desenvolvido em React
        </p>
      </Main>
  </React.Fragment>