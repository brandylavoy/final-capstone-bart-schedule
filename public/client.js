/* global $ */

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

var route_mapper = {
        ['ROUTE 1']: "San Francisco Int'l Airport / Millbrae Bound Train",
        ['ROUTE 2']: "Pittsburg/Bay Point Bound Train",
        ['ROUTE 3']: "Richmond Bound Train",
        ['ROUTE 4']: "Fremont Bound Train",
        ['ROUTE 5']: "Daly City Bound Train",
        ['ROUTE 6']: "Fremont Bound Train",
        ['ROUTE 7']: "Daly City/Millbrae Bound Train",
        ['ROUTE 8']: "Richmond Bound Train",
        ['ROUTE 11']: "Daly City Bound Train",
        ['ROUTE 12']: "Dublin/Pleasanton Bound Train",
        ['ROUTE 19']: "Oakland Int'l Airport Bound Train",
        ['ROUTE 20']: "Oakland Coliseum Bound Train",
}

var bikes_mapper = {
        [0]: "No bikes allowed",
        [1]: "Bikes are allowed"
}

function populateSelect() {
    $("#cityNameOrigin").html('');
    var buildTheSelectOutput = "";
    buildTheSelectOutput += '<option value="0" selected> Please select origin station</option>';
    $.each(stationToLocation_mapper, function (mapperKey, mapperValue) {
        buildTheSelectOutput += '<option value="' + mapperKey + '">' + mapperValue + '</option>';
    });


    //use the HTML output to show it in the index.html
    $("#cityNameOrigin").html(buildTheSelectOutput);
}

function populateSelectDestination() {
    $("#cityNameDestination").html('');
    var buildTheSelectDestinationOutput = "";
    buildTheSelectDestinationOutput += '<option value="0" selected> Please select a destination</option>';
    $.each(stationToLocation_mapper, function (mapperKey, mapperValue) {
        buildTheSelectDestinationOutput += '<option value="' + mapperKey + '">' + mapperValue + '</option>';
    });


    //use the HTML output to show it in the index.html
    $("#cityNameDestination").html(buildTheSelectDestinationOutput);
}

// search for running activities
// local ajax call to the server external api

function ajaxScheduleSearch(cityNameOrigin, cityNameDestination) {

    $.ajax({
            type: "GET",
            url: "/schedule/" + cityNameOrigin + "/" + cityNameDestination,
            dataType: 'json',
        })
        .done(function (dataOutput) {
            //         console.log(dataOutput);
            displayScheduleSearchData(dataOutput.root);

            // displayScheduleScheduleResults(JSON.parse(resultsForJsonParse));
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


function displayScheduleSearchData(dataMatches) {
    console.log(dataMatches);
    //create an empty variable to store one LI for each of the results

    var buildTheHtmlOutput = '<ul class="activity-results">';
    $.each(dataMatches.schedule.request.trip, function (dataMatchesKey, dataMatchesValue) {
        //create and populate one LI for each of the results
        buildTheHtmlOutput += '<li class="events">';
        buildTheHtmlOutput += '<div class="favorites">';
        buildTheHtmlOutput += '<form class="addToFavorites">';
        buildTheHtmlOutput += '<input type="hidden" class="addToFavoritesOrigin" value="' + stationToLocation_mapper[dataMatches.origin] + '">';
        buildTheHtmlOutput += '<input type="hidden" class="addToFavoritesDestination" value="' + stationToLocation_mapper[dataMatches.destination] + '">';
        buildTheHtmlOutput += '<button type="submit" class="addToFavoritesButton" id="addToFavoritesButton">';
        buildTheHtmlOutput += '<i class="fa fa-heart" aria-hidden="true" id="heart"></i>';
        buildTheHtmlOutput += '</button>';
        buildTheHtmlOutput += '</form>';
        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '<div class="event-description">';
        buildTheHtmlOutput += '<p class="arrow-separator"><i class="fa fa-play" aria-hidden="true"></i></p>';
        buildTheHtmlOutput += '<p class="departure">  <i class="fa fa-clock-o" aria-hidden="true"></i> ' + dataMatchesValue['@origTimeMin'] + '</p>';
        buildTheHtmlOutput += '<p><i class="fa fa-train" aria-hidden="true"></i> ' + stationToLocation_mapper[dataMatches.origin] + '</p>';
        if (dataMatchesValue.leg.length === 1) {
            buildTheHtmlOutput += '<p>' + route_mapper[dataMatchesValue.leg['@line']] + ' (' + dataMatchesValue.leg.length + ')</p>';
            buildTheHtmlOutput += '<p> ' + bikes_mapper[dataMatchesValue.leg['@bikeflag']] + '</p>';
        } else {
            $.each(dataMatchesValue.leg, function (legKey, legValue) {
                if (route_mapper[legValue['@line']] !== undefined) {
                    buildTheHtmlOutput += '<p class="arrow-separator"><i class="fa fa-arrow-circle-down" aria-hidden="true"></i></p>';
                    buildTheHtmlOutput += '<p><i class="fa fa-forward" aria-hidden="true"></i> ' + (legKey + 1) + ': ' + route_mapper[legValue['@line']];
                }
                if (bikes_mapper[legValue['@bikeflag']] !== undefined) {
                    buildTheHtmlOutput += '<a href="#" class="tooltip">';
                    buildTheHtmlOutput += '  <i class="fa fa-bicycle" aria-hidden="true"></i>';
                    buildTheHtmlOutput += '<span>';
                    buildTheHtmlOutput += '<strong>' + bikes_mapper[legValue['@bikeflag']] + '</strong>';
                    buildTheHtmlOutput += '</span>';
                    buildTheHtmlOutput += '</a>';
                    console.log(legValue);
                }
                if (route_mapper[legValue['@line']] !== undefined) {
                    buildTheHtmlOutput += '</p>';
                }
            });
        }
        buildTheHtmlOutput += '<p class="arrow-separator"><i class="fa fa-pause" aria-hidden="true"></i> </p>';
        buildTheHtmlOutput += '<p class="arrival"> <i class="fa fa-clock-o" aria-hidden="true"></i> ' + dataMatchesValue['@destTimeMin'] + '</p>';
        buildTheHtmlOutput += '<p><i class="fa fa-train" aria-hidden="true"></i> ' + stationToLocation_mapper[dataMatches.destination] + ' </p>';
        buildTheHtmlOutput += '<div class="fare"><i class="fa fa-usd" aria-hidden="true"></i>' + dataMatchesValue['@fare'] + '</div>';


        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '</li>';
        console.log(dataMatchesValue);
    });
    buildTheHtmlOutput += '<img src="images/BART_cc_map_20141029.png" class="map" id="map">';
    buildTheHtmlOutput += '</ul>';
    //use the HTML output to show it in the index.html
    $('.display-results').html(buildTheHtmlOutput);

}



//populate favorites container
function populateFavoritesContainer() {


    $.ajax({
            type: "GET",
            url: "/populate-favorites/",
            dataType: 'json',
        })
        .done(function (dataOutput) {
            console.log(dataOutput);
            //If successful, set some globals instead of using result object

            var buildTheHtmlOutput = "";

            $.each(dataOutput, function (dataOutputKey, dataOutputValue) {

                buildTheHtmlOutput += '<li class="favorites">';
                buildTheHtmlOutput += '<div class="deleteFavorite">';
                buildTheHtmlOutput += '<form class="deleteFavoriteValue">';
                buildTheHtmlOutput += '<input type="hidden" class="deleteFavoriteValueInput " value="' + dataOutputValue._id + '">';
                buildTheHtmlOutput += '<input type="hidden" class="addToFavoritesOrigin" value="' + dataOutputValue.origin + '">';
                buildTheHtmlOutput += '<input type="hidden" class="addToFavoritesDestination" value="' + dataOutputValue.destination + '">';

                buildTheHtmlOutput += '<button type="submit" class="deleteFavoriteButton">';
                buildTheHtmlOutput += '<p><i class="fa fa-trash-o" aria-hidden="true"></i></p>';
                buildTheHtmlOutput += '</button>';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += '</div>';
                buildTheHtmlOutput += '<p><i class="fa fa-train" aria-hidden="true"></i> ' + dataOutputValue.origin + ' --> ' + dataOutputValue.destination + '</p>';
                buildTheHtmlOutput += '</li>';
                //                console.log(dataOutput);
            });
            $(".favoritesContainer").html(buildTheHtmlOutput);
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//document ready function
$(function () {
    populateFavoritesContainer();

    $('#welcome').show();
    $('#userInput').hide();
    $('#displayResults').hide();
    $('#dashboard').hide();

    populateSelect();
    populateSelectDestination();

    //on start quiz
    $('#startSearchButton').on('click', function () {
        $('#welcome').hide();
        $('#dashboard').hide();
        $('#userInput').show();
        $('#displayResults').hide();

    });

    $('#searchButton').on('click', function () {
        $('#welcome').hide();
        $('#dashboard').show();
        $('#userInput').show();
        $('#displayResults').show();

    });
});




// STEP 1 - get the input from the user
$("#scheduleSearch").submit(function (event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    //get the value from the input box
    var cityNameOrigin = $("#cityNameOrigin").val();
    var cityNameDestination = $("#cityNameDestination").val();
    console.log(cityNameOrigin, cityNameDestination);

    if ((cityNameOrigin == 0) || (cityNameDestination == 0)) {
        alert("Sorry that search did not yeild any results. Please select an origin station, and a destination station and try your search again.");
    } else {
        // console.log(userInput);
        ajaxScheduleSearch(cityNameOrigin, cityNameDestination);
    }
    //use that value to call the getResults function defined bellow

});





// add activity to favorites section
$(document).on('click', '.activity-results .addToFavoritesButton', function (event) {


    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();

    //get the value from the input box
    $(this).toggleClass("highlight");


    var addToFavoritesOrigin = $(this).parent().find('.addToFavoritesOrigin').val();
    var addToFavoritesDestination = $(this).parent().find('.addToFavoritesDestination').val();
    //    var favoritesUrlValue = $(this).parent().find('.addToFavoritesUrlValue').val();

    var nameObject = {
        'origin': addToFavoritesOrigin,
        'destination': addToFavoritesDestination
    };

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(nameObject),
            url: '/add-to-favorites/',
        })
        .done(function (result) {

            populateFavoritesContainer();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});


// add Schedule to favorites section
$(document).on('click', '.schedule-results .myTripButton', function (event) {


    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();

    //get the value from the input box
    $(this).toggleClass("highlight");

    var favoritesValue = $(this).parent().find('.myTripValue').val();
    var favoritesDateValue = $(this).parent().find('.myTripDateValue').val();
    var favoritesPlaceValue = $(this).parent().find('.myTripPlaceValue').val();
    var favoritesUrlValue = $(this).parent().find('.myTripUrlValue').val();

    var nameObject = {
        'name': favoritesValue,
        'date': favoritesDateValue,
        'place': favoritesPlaceValue,
        'url': favoritesUrlValue
    };

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(nameObject),
            url: '/add-to-favorites/',
        })
        .done(function (result) {

            populateFavoritesContainer();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});


$(document).on('click', '.deleteFavorite', function (event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    //get the value from the input box



    var favoritesIdToDelete = $(this).parent().find('.deleteFavoriteValueInput').val();


    var nameObject = {
        'name': favoritesIdToDelete
    };

    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            contentType: 'application/json',
            url: '/delete-favorites/' + favoritesIdToDelete,
        })
        .done(function (result) {
            populateFavoritesContainer();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
});
