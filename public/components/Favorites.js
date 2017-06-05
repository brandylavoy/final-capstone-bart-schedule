import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

//declare the favorites function

export default class Favorites extends React.Component {
    render(){
        return(
            <section className="dashboard">
                <h3>Favorite Routes</h3>
                    <button className="deleteFavoriteButton">
                        <p><i className="fa fa-trash-o" aria-hidden="true"></i></p>
                    </button>
                    <ul>
                    </ul>
            </section>
        );
    }
}
