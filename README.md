# Pokéstop

Pokéstop was made using Javascript, JQuery, HTML, and CSS. The PokéAPI v2 (https://pokeapi.co/) was used to fill in data for the pokemon, most often using their database of names, ID's, sprites, and additional descriptive text. The Pokédex feature was the first one added, followed by the Who's that Pokémon guessing game.

![Pokédex](https://i.imgur.com/jOu6WBg.png "pokedex")
### Approach

The main approach when working on this app was to get the logic working first, then filling in the rest. The Pokédex feature was the original goal, with everything else being stretch goals given the time constraints. The first thing done was being able to fetch a pokemon by its name or ID. From there, it was getting the syntax for populating the sprites data, as well as the flavor text from one of their other API branches. 
Once the data was able to be rendered, the next step was starting to style it all. Starting with styling for smaller screens, then changing what works best for larger ones. While it is far from perfect, the general aesthetic was achieved. 

## Link to Live Site
https://nicklol8.github.io/pokeinfo/

### Stretch Goals

The first stretch goal set was to be able to make the "Who's that Pokémon?" game. The basic logic for the game was pretty easy to figure out after becoming so familiar with the API. The styling is very basic for now, but hopefully with more time I can make it look better.

The second stretch goal was to make a Poké-tic-tac-toe. While that is currently not made, it is something that will come.

### Unsolved Issues

The biggest issue is that in the "Who's that Pokémon" game, when getting the answer correct and moving to the next one, it still repeats the first guess, and then submits the second guess. 
Another small issue is that if the user doesn't spell the name correctly, nothing will display in the Pokédex. While it doesn't break anything, being able to match closely spelled names would be a nice feature (eg. User inputs: ninetails, actual name is Ninetales).

