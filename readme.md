# BART (Bay Area Rapid Transit) API schedule search
Thinkful (https://www.thinkful.com) Final Capstone Project - Full Stack app integrating with *BART.gov*'s API

![landing page](https://github.com/brandylavoy/final-capstone-bart-schedule/blob/master/git_hub_images/landing-page-no-results.png)


![search box with no results](https://github.com/brandylavoy/final-capstone-bart-schedule/blob/master/git_hub_images/origin-destination-drop-down-selectors-no-results.png)


![schedule search results showing](https://github.com/brandylavoy/final-capstone-bart-schedule/blob/master/git_hub_images/search-results-returned-no-favorites.png)


![schedule search results with one favorite](https://github.com/brandylavoy/final-capstone-bart-schedule/blob/master/git_hub_images/search-results-one-selected-to-add-to-favoirtes-container.png)


![favorites container with three routes favorited](https://github.com/brandylavoy/final-capstone-bart-schedule/blob/master/git_hub_images/favorites-container-with-three-favorites.png)

## Background

I built this app because I frequently utilize public transportation in and around the San Francisco Bay Area.

## Use Case

This app gives people in the Bay Area access to the BART schedule, the search provides the user with the next four trains leaving from their origin of choice and arriving at the destination that they set.

## Initial UX

The initial mobile and desktop wireframes can be seen below:

![Initial Wireframe](https://github.com/brandylavoy/final-capstone-bart-schedule/blob/master/git_hub_images/BART-wireframe.JPG)

## Working Prototype

You can access a working prototype of the app here: https://final-capstone-bart-schedule.herokuapp.com/

## Functionality
The app's functionality includes:

* Search for the BART trains leaving from the origin selected by the user and arriving at their destination of choice.
* The app returns the next four trains.
* Results provide the fare, the estimated departure time, the departure station, the final destination of the train - which is how trains are indentified on the station platform, the train to transfer to (if applicable if no direct trains are available), an indicator that lets you know if bikes are allowed on the train, the estimated arrival time, and the Destination station.
* The results are in ascending order by departure time.
* Add chosen results to a favorites section.
* Delete events from favorites section.


## Technical

The app is built with HTML, CSS, JavaScript, jQuery, Node.js, and React.js. It uses AJAX JSON calls to the *BART.gov* Open Platform API to return the serach results. All data is held in an mLab database during the user's session. It has been built to be fully responsive across mobile, tablet and desktop screen resolutions.

## Development Roadmap

This is v1.0 of the app, but future enhancements are expected to include:

* The ability to get real time train arrival data
* The transfer BART station that the user needs to switch trains for routes that require multiple trains.
* The ability to use the favorite route section to populate the search field.
* The ability to limit the origin and destination dropdowns.
* A link to a google search for nearby businesses - restaurant, coffee shop, bank, etc.
