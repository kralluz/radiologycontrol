// Header.js
import React from 'react';
import './Header.css'; // Supondo que você esteja usando um arquivo CSS dedicado para o Header

function Header() {
  return (
    <div id="header">
      <h1 className='logo'>RadiologyControl</h1>
      <p className='subtitle'>Gerenciamento e análise de dados radiológicos</p>
    </div>
  );
}

export default Header;
