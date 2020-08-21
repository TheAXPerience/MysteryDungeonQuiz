# The Mystery Dungeon Quiz

## Structure
Either a website or phone application. We will talk as though we are making a web application in Django.

First screen will have the blurb you first see when you take the quiz, and a "Start" button.
When this button is pressed, should ping the server to return a list of random questions (8 - 10).

Second screen will be a single view that has layered questions; these layers disappear when the question is answered.
Refer to this website, which details sample JavaScript quizzes: https://www.sitepoint.com/simple-javascript-quiz/

Then, send to results to the server, which will calculate the percentages.
Then, the server should send back the Pokemon whose profile picture matches the highest match, along with the blurb about the personality type.
Should return a table of personalities, Pokemon profile pictures, and percentages.

Questions ceom from here: https://bulbapedia.bulbagarden.net/wiki/Appendix:Mystery_Dungeon:_Explorers_of_Sky_walkthrough/Chapter_0

## The personality types (and associated Pokemon)
* Lonely (Bulbasaur, Mudkip)
* Docile (Charmander, Bulbasaur)
* Quirky (Squirtle, Piplup)
* Brave (Pikachu, Charmander)
* Calm (Chikorita, Cyndaquil)
* Timid (Cyndaquil, Turtwig)
* Jolly (Totodile, Eevee)
* Relaxed (Phanpy, Vulpix)
* Quiet (Treecko, Chikorita)
* Hardy (Torchic, Treecko)
* Rash (Mudkip, Torchic)
* Bold (Turtwig, Squirtle)
* Naive (Chimchar, Skitty)
* Impish (Piplup, Chimchar)
* Hasty (Shinx, Pikachu)
* Sassy (Riolu, Totodile)

Question: should it stick to "Are you a boy or a girl?" or do something else? Like "Do you prefer red or blue?"?
