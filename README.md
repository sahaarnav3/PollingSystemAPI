# Polling system API

This is a backend api for creating questions and adding options to a specific question. Options can be voted. Questions, options can be deleted and questions can be viewed with all of their options.

## API Endpoints

| HTTP Verbs | Endpoints                          | Action                                 |
| ---------- | -----------------------------------| -------------------------------------- |
| POST       | /questions/create                  | To create a  question                  |
| POST       | /questions/:id/options/create      | To add options to a specific question  |
| POST       | /questions/:id/delete              | To delete a question                   |
| POST       | /options/:id/delete                | To delete an option                    |
| GET        | /options/:id/add_vote              | To increase the count of votes         |
| GET        | /questions/:id                     | To view a question and its options     |

## Tech stack
* NodeJS
* ExpressJS
* MongoDB
* Mongoose ODM

## Installation Guide

- Clone this repository.
- Run npm install to install all the dependencies.
- Create an .env file in your project root folder and add your variables. (For the PORT Number to be used(Mandatory)).

## Usage

- Run npm start to start the application.
- Connect to the API using Postman on port 3000.

