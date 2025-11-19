# salon-appointment-scheduler

This project is a **PostgreSQL + Bash script** application that manages customer appointments for a salon. It was built as part of the **Relational Database curriculum** on freeCodeCamp.

## Features

* Customers can select from a list of salon services.
* If a phone number is not found in the database, the script prompts to add a new customer.
* Appointments are recorded with the associated customer, service, and time.
* Uses PostgreSQL as the backend database.
* Uses a Bash script (`salon.sh`) to handle user interaction.

## Files

* `salon.sh` – Main Bash script that handles input and database queries.
* `salon.sql` – Database setup file that creates tables (`customers`, `appointments`, `services`) and sequences.
* `examples.txt` – Sample runs showing correct program behavior.

## Database Schema

* **customers**

  * `customer_id` (PK, serial)
  * `phone` (unique)
  * `name`
* **services**

  * `service_id` (PK, serial)
  * `name`
* **appointments**

  * `appointment_id` (PK, serial)
  * `customer_id` (FK → customers)
  * `service_id` (FK → services)
  * `time`
