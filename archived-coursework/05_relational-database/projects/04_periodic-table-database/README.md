# periodic-table-database

This repository contains my submission for the **freeCodeCamp Periodic Table Database** project.

## Files

* `element.sh` — Bash script that queries the PostgreSQL database and prints element details
* `periodic_table.sql` — Database dump with all required schema changes and data fixes applied

## Schema

### `elements`

| Column        | Type    | Constraints      |
| ------------- | ------- | ---------------- |
| atomic_number | INT     | PRIMARY KEY      |
| symbol        | VARCHAR | UNIQUE, NOT NULL |
| name          | VARCHAR | UNIQUE, NOT NULL |

### `properties`

| Column                | Type    | Constraints                         |
| --------------------- | ------- | ----------------------------------- |
| atomic_number         | INT     | REFERENCES elements(atomic_number)  |
| atomic_mass           | DECIMAL |                                     |
| melting_point_celsius | DECIMAL | NOT NULL                            |
| boiling_point_celsius | DECIMAL | NOT NULL                            |
| type_id               | INT     | REFERENCES types(type_id), NOT NULL |

### `types`

| Column  | Type    | Constraints |
| ------- | ------- | ----------- |
| type_id | SERIAL  | PRIMARY KEY |
| type    | VARCHAR | NOT NULL    |

## Examples

```bash
./element.sh 1
The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius.
```

```bash
./element.sh He
The element with atomic number 2 is Helium (He). It's a nonmetal, with a mass of 4.0026 amu. Helium has a melting point of -272.2 celsius and a boiling point of -269 celsius.
```

```bash
./element.sh Unknown
I could not find that element in the database.
```

```bash
./element.sh
Please provide an element as an argument.
```
