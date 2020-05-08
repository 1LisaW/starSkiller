import React from 'react';
import './Header.css';
function FilterElement(roleName, onClick){
    return(
        <div className="filterElem">
            <a onClick={onClick}>{roleName}</a>
        </div>
    )
}

function Header (){
    return(
        <header>
            <menu></menu>

        </header>
    )
}

export default Header;