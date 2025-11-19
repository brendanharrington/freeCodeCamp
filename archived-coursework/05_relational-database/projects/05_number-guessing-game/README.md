# number-guessing-game

A Bash + PostgreSQL project for the freeCodeCamp Relational Database curriculum.

## Project Description

This is a number guessing game that stores user information in a PostgreSQL database.
When a user plays, the program will:

* Ask for their username.
* If it's their first time, add them to the database.
* If they’ve played before, show their total games played and best game (fewest guesses).
* Generate a random number between 1 and 1000.
* Prompt the user to guess until they get the correct number.
* Update the database with their results.

## Database Schema

**Table: users**

| Column       | Type    | Description                         |
| ------------ | ------- | ----------------------------------- |
| user_id      | SERIAL  | Primary key                         |
| username     | VARCHAR | Unique username of the player       |
| games_played | INT     | Number of games played              |
| best_game    | INT     | Fewest guesses needed to win a game |

## Features

* Validates that guesses are integers.
* Gives feedback if the guess is higher or lower than the target.
* Tracks how many games each user has played.
* Updates the best game only if the new score is better.
