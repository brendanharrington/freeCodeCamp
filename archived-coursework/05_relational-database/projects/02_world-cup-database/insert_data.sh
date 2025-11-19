#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  if [[ $WINNER != "winner" ]]
  then
    # get winner id
    WINNER_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")"

    if [[ -z $WINNER_ID ]]
    then
      # insert winner name
      INSERT_WINNER_RESULT="$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")"

      if [[ $INSERT_WINNER_RESULT == "INSERT 0 1" ]]
      then
        echo "Inserted into teams (winner), $WINNER"
      fi

      # get new winner id
      WINNER_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")"
    fi

    # get opponent id
    OPPONENT_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")"

    if [[ -z $OPPONENT_ID ]]
    then
      # insert opponent name
      INSERT_OPPONENT_RESULT="$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT')")"

      if [[ $INSERT_OPPONENT_RESULT == "INSERT 0 1" ]]
      then
        echo "Inserted into teams (opponent), $OPPONENT"
      fi

      # get new opponent id
      OPPONENT_ID="$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")"
    fi

    # echo "$YEAR | $ROUND | $WINNER_ID | $OPPONENT_ID | $WINNER_GOALS | $OPPONENT_GOALS"

    # get game id
    GAME_ID="$($PSQL "SELECT game_id FROM games WHERE year=$YEAR AND round='$ROUND' AND winner_id='$WINNER_ID' AND opponent_id='$OPPONENT_ID'")"

    if [[ -z $GAME_ID ]]
    then
      # insert game
      INSERT_GAME_RESULT="$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)")"

      if [[ $INSERT_GAME_RESULT == "INSERT 0 1" ]]
      then
        echo "Inserted game ($YEAR $ROUND, $WINNER vs. $OPPONENT) into games"
      fi
    fi
  fi
done