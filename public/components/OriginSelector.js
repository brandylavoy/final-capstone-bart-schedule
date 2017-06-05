import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const FLAVOURS = [
    { label: 'Chocolate', value: 'chocolate' },
    { label: 'Vanilla', value: 'vanilla' },
    { label: 'Strawberry', value: 'strawberry' },
    { label: 'Caramel', value: 'caramel' },
    { label: 'Cookies and Cream', value: 'cookiescream' },
    { label: 'Peppermint', value: 'peppermint' },
];

var stationToLocation_mapper = {

    "12TH": "12th St. Oakland City Center BART Station, Broadway, Oakland, CA",
    "16TH": "16th St. Mission Station, Mission Street, San Francisco, California",
    "19TH": "19th Street BART station, Broadway, Oakland, CA",
    "24TH": "24th St Mission BART Station, Mission Street, San Francisco, CA",
    "ASHB": "Ashby BART Station, Adeline Street, Berkeley, CA",
    "BALB": "Balboa Park BART Station, Geneva Avenue, San Francisco, CA",
    "BAYF": "Bay Fair BART Station, Hesperian Boulevard, San Leandro, California",
    "CAST": "Castro Valley BART Station, Norbridge Avenue, Castro Valley, CA",
    "CIVC": "Civic Center BART Station, Market St, San Francisco, CA",
    "COLS": "Coliseum Bart Station, Oakland, CA",
    "COLM": "Colma BART Station, D St, Colma, CA",
    "CONS": "Concord BART Station, Oakland Avenue, Concord, CA",
    "DALY": "Daly City BART Station, Daly City, CA",
    "DBRK": "Downtown Berkeley BART Station, Shattuck Avenue, Berkeley, CA",
    "DUBL": "Dublin/Pleasanton BART Station, Owens Drive, Pleasanton, California",
    "DELN": "El Cerrito del Norte BART Station, Cutting Boulevard, El Cerrito, CA",
    "PLZA": "El Cerrito Plaza BART Station, Fairmount Avenue, El Cerrito, CA",
    "EMBR": "Embarcadero BART Station, Market Street, San Francisco, CA",
    "FRMT": "Fremont BART Station, Bart Way, Fremont, CA",
    "FTVL": "Fruitvale BART Station, East 12th Street, Oakland, CA",
    "GLEN": "Glen Park BART Station, Diamond Street, San Francisco, CA",
    "HAYW": "Hayward BART Station, Hayward, CA",
    "LAFY": "Lafayette BART Station, Deer Hill Road, Lafayette, CA",
    "LAKE": "Lake Merritt BART Station, Madison Street, Oakland, CA",
    "MCAR": "MacArthur BART Station, 40th Street, Oakland, CA",
    "MLBR": "Millbrae BART Station, Rollins Road, Millbrae, CA",
    "MONT": "Montgomery St. BART Station, Market Street, San Francisco, CA",
    "NBRK": "North Berkeley BART Station, Sacramento Street, Berkeley, CA",
    "NCON": "North Concord/Martinez BART Station, Port Chicago Highway, Concord, CA",
    "OAKL": "Oakland International Airport (OAK) Station, Oakland, CA 94621",
    "ORIN": "Orinda BART Station, Camino Pablo, Orinda, CA",
    "PITT": "Pittsburg/Bay Point BART Station, West Leland Road, Pittsburg, CA",
    "PHIL": "Pleasant Hill/Contra Costa Centre BART Station, Treat Blvd CA",
    "POWL": "Powell BART Station, Market Street, San Francisco, CA",
    "RICH": "Richmond BART Station, Nevin Avenue, Richmond, CA",
    "ROCK": "Rockridge BART Station, College Avenue, Oakland, CA",
    "SBRN": "San Bruno BART Station, Huntington Avenue, San Bruno, CA",
    "SFIA": "San Francisco Int'l Airport BART Station, San Francisco Airport, North Link Road, San Francisco, CA",
    "SANL": "San Leandro BART Station, San Leandro Boulevard, San Leandro, CA",
    "SHAY": "Hayward BART Station, Hayward, CA",
    "SSAN": "South San Francisco BART Station, Mission Road, South San Francisco, CA",
    "UCTY": "Union City BART Station, Union City, CA",
    "WARM": "Warm Springs BART Station, Fremont, CA",
    "WCRK": "Walnut Creek BART Station, Ygnacio Valley Road, Walnut Creek, CA",
    "WDUB": "Dublin/Pleasanton BART Station, Owens Drive, Pleasanton, CA",
    "WOAK": "West Oakland BART Station, 7th Street, Oakland, CA"
}






const WHY_WOULD_YOU = [
    { label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

var MultiSelectField = createClass({
    displayName: 'MultiSelectField',
    propTypes: {
        label: PropTypes.string,
    },
    getInitialState () {
        return {
            disabled: false,
            crazy: false,
            options: FLAVOURS,
            value: [],
        };
    },
    handleSelectChange (value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    },
    toggleDisabled (e) {
        this.setState({ disabled: e.target.checked });
    },
    toggleChocolate (e) {
        let crazy = e.target.checked;
        this.setState({
            crazy: crazy,
            options: crazy ? WHY_WOULD_YOU : FLAVOURS,
        });
    },
    render () {
        return (
            <div className="section">
            <h3 className="section-heading">{this.props.label}</h3>
            <Select multi simpleValue disabled={this.state.disabled} value={this.state.value} placeholder="Select your favourite(s)" options={this.state.options} onChange={this.handleSelectChange} />

            <div className="checkbox-list">
            <label className="checkbox">
            <input type="checkbox" className="checkbox-control" checked={this.state.disabled} onChange={this.toggleDisabled} />
            <span className="checkbox-label">Disable the control</span>
            </label>
            <label className="checkbox">
            <input type="checkbox" className="checkbox-control" checked={this.state.crazy} onChange={this.toggleChocolate} />
            <span className="checkbox-label">I don't like Chocolate (disabled the option)</span>
            </label>
            </div>
            </div>
        );
    }
});
module.exports = MultiSelectField;
