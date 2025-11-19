# world-cup-database

This project builds a PostgreSQL database to store World Cup match data from **2014** and **2018**.

## Structure

- **teams**  
  Stores unique teams.  
  - `team_id` (PK, serial)  
  - `name` (unique, not null)  

- **games**  
  Stores individual matches.  
  - `game_id` (PK, serial)  
  - `year` (int, not null)  
  - `round` (varchar, not null)  
  - `winner_id` (FK → teams.team_id)  
  - `opponent_id` (FK → teams.team_id)  
  - `winner_goals` (int, not null)  
  - `opponent_goals` (int, not null)  

## Files

- `games.csv` – match data for 2014 and 2018.  
- `insert_data.sh` – Bash script to insert data into the database.  
- `worldcup.sql` – database schema with constraints.  
