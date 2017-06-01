import React from 'react';
import ReactDOM from 'react-dom';

export default function Header() {
    const welcome = 'Where will BART take you today'
    const logo = 'assets/images/Bart-logo.svg';

        return (
            <header className="reactHeader">
            <h1 className="welcome"/>
                <img className="logo" src={logo} />

            </header>

        );
}
