//add the react and react dom requirments
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

//declare function for search results
export default class Results extends React.Component {
    render(){
        return (
            <section className="display-results">

                <ul className="activity-results">
                </ul>
            </section>
        );
    }
}

