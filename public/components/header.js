import React from 'react';
import ReactDOM from 'react-dom';



export default class Header extends React.Component {
    render() {
        return (
            <div>
               <img className = "logo" src = "./assets/images/Bart-logo.svg"/>
            <h1>"Search BART Trips" </h1>
            </div>
               );
            }
};
