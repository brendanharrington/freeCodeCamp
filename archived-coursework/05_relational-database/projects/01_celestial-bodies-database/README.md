# celestial-bodies

This project is part of the [FreeCodeCamp Relational Database Certification](https://www.freecodecamp.org/learn/relational-database). It creates a PostgreSQL database that models galaxies, stars, planets, and moons in a simplified version of the universe.

## Overview
The database is designed to capture hierarchical relationships:
- **Galaxy Types** (e.g., Spiral, Elliptical, Irregular, Lenticular, Peculiar)
- **Galaxies** linked to a galaxy type
- **Stars** belonging to galaxies
- **Planets** orbiting stars
- **Moons** orbiting planets
Each entity has attributes, constraints, and foreign key relationships for relational integrity.

## Schema
- **galaxy_types**  
  - `galaxy_type_id` (PK)  
  - `name` (UNIQUE)  

- **galaxy**  
  - `galaxy_id` (PK)  
  - `name` (UNIQUE)  
  - `galaxy_type_id` (FK → galaxy_types.galaxy_type_id)  

- **star**  
  - `star_id` (PK)  
  - `name` (UNIQUE)  
  - `galaxy_id` (FK → galaxy.galaxy_id)  

- **planet**  
  - `planet_id` (PK)  
  - `name` (UNIQUE)  
  - `star_id` (FK → star.star_id)  

- **moon**  
  - `moon_id` (PK)  
  - `name` (UNIQUE)  
  - `planet_id` (FK → planet.planet_id)

## Sample Data
- **Galaxy Types:** Spiral, Elliptical, Irregular, Lenticular, Peculiar, Dwarf  
- **Galaxies:** Milky Way, Andromeda, Triangulum, Whirlpool, Sombrero, Messier 87  
- **Stars:** Sun, Proxima Centauri, Alpheratz, M33-1, NGC 5194-V1, Sombrero A, M87-V1  
- **Planets:** Earth, Mars, Jupiter, Saturn, Proxima b, Andromeda I, Andromeda II, Triangulum Prime, etc.  
- **Moons:** Luna, Phobos, Deimos, Europa, Titan, Enceladus, Ganymede, Callisto, etc.
