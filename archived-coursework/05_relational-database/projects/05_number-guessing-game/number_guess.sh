#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=users -t --no-align -c"

echo "Enter your username:"
read USERNAME

USERNAME_FOUND=$($PSQL "SELECT * FROM users WHERE username='$USERNAME'")

if [[ -z "$USERNAME_FOUND" ]]
then
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  RESULT=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
else
  GAMES_PLAYED=$($PSQL "SELECT games_played FROM users WHERE username='$USERNAME'")
  BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username='$USERNAME'")

  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

RANDOM_NUMBER=$(( RANDOM % 1000 + 1 ))
echo "Guess the secret number between 1 and 1000:"
read GUESS
GUESS_COUNT=1;

while true
do
  if [[ $GUESS =~ ^[0-9]+$ ]]
  then
    if [ "$GUESS" -eq "$RANDOM_NUMBER" ]
    then
      break
    elif [ "$GUESS" -lt "$RANDOM_NUMBER" ]
    then
      echo "It's higher than that, guess again:"
    else
      echo "It's lower than that, guess again:"
    fi
  else
    echo "That is not an integer, guess again:"
  fi
  read GUESS
  ((GUESS_COUNT++))
done

RESULT=$($PSQL "UPDATE users SET games_played = games_played + 1 WHERE username='$USERNAME'")
BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username='$USERNAME'")

if [[ -z $BEST_GAME ]]
then
  RESULT=$($PSQL "UPDATE users SET best_game=$GUESS_COUNT WHERE username='$USERNAME'")
else
  if [ $GUESS_COUNT -lt $BEST_GAME ]
  then
    RESULT=$($PSQL "UPDATE users SET best_game=$GUESS_COUNT WHERE username='$USERNAME'")
  fi
fi

echo "You guessed it in $GUESS_COUNT tries. The secret number was $RANDOM_NUMBER. Nice job!"