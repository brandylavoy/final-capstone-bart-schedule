import React from 'react';
import ReactDOM from 'react-dom';



export default class Header extends React.Component {
    render() {
        return ( <
            div >
            <
            h1 > < img className = "logo"
            src = "./assets/images/Bart-logo.svg" / >
            Search BART Trips < /h1> <
            /div>
        );
    }
}
