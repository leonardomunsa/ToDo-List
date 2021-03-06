## To Do List Project

A full stack CRUD project to monitorate tasks, where you can:
- Create a task
- Read the tasks
- Update a task
- Delete a task

The project was made using:
- Node JS
- Mongo DB Atlas
- React JS

## How to clone the repository and test the project

Clone the project from Github :

```sh
$ git clone git@github.com:leonardomunsa/ToDo-List.git or git clone https://github.com/leonardomunsa/ToDo-List.git
$ cd ToDo-List
```

#### To make the databse work:

```
- create a .env doc
- add the variable MONGO_DB_URL to it
- put the string of your connection in the variable
```

You can use your mongo db to connect, or use a image of one with docker.
These steps are to use Mongo DB Atlas that only requires a string that you take in the website to connect.

#### Install dependencies and start react app and node server:

```sh
$ npm install
$ npm start
$ cd frontend
$ npm install
$ npm start
```

If everything is ok, you will be able to open at:

```bash
http://localhost:3001
```
#### To run the tests:

```sh
$ npm test
```

To run a specific test, just write tests/name_of_the_test.test.js besides the command above.
