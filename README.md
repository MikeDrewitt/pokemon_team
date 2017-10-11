# Pokemon Team Builder

This is a Pokemon team management application. It allows the user, once they have a Team
selected to view different statistics about the team that they've put together as well as choose
available moves for each Pokemon, etc.

A live site can be found [here](http://pokemonteamdetails.appspot.com/#!/)!

![Application screenshot](screenshot.png?raw=true "Application screenshot")

# Getting started

Assuming that you have npm/ yarn installed this should be very easy (hopefully)! Run

``` npm install ```

in the root of the repository to install all project dependancies. Then run

``` npm start ```

to run the local development server. It should be located at localhost:8080.

# Don't have/ know how to use npm?

If it's the case that you either don't have npm installed or have never heard of it
you should be able to find a link to their documentation for installation [here](https://www.npmjs.com/get-npm).

# Testing

You need to have karma-cli tools installed for the easiest method of utilizing the test suit. Assuming you ran npm install,
you should be good to go, but if you run into errors you can always install karma globally by

``` npm -g karma-cli ```

Once karma is installed you can run the test suit with the command

``` karma start ```

# Stuff I'd like to see done/ Personal notes.

There are some things that given a more time/ if this were a production application that
I would have like to have seen done. I'd like for the moves types to be taken into account when
calculating the best attacking types, while also taking into account STAB moves, etc. I'd also like to
take into account the types of moves that are being used by which Pokemon, so for example: if a pokemon
with a better physical attack stat is using most special attacks this should be taken into account and visa vera.

Another thing that I'd like to add is the ability to change the generation to allow for stuff like move, type, nature changes, etc.
Between generations of the games a lot changes so the stats should reflect that as such. Unfortunately the API that is currently being used
[pokeapi](pokeapi.co) while rather extensive, does not have all of the information needed to accomplish such a goal as far as I could tell.

Obviously given more time I'd also like to create a backend for this to allow users to sign in and save multiple teams
to be viewed and updated at later times. Perhaps using something like OAuth to allow users to sign in via google, facebook, etc. The CSS and UX
could also use a fair bit of work in some areas to make it not only more user friendly, but also more aesthetically pleasing for the majority of users.

Lastly, making the whole page more mobile friendly would be a first thing to do next should I spend any more time on this. Bootstrap keeps it
from really going off the rails as far as responsiveness goes, but it certainly could be much better.

With all of this said, I feel the application as it stands suffices in showing off what angularjs can do given a limited amount of time
and resources.
