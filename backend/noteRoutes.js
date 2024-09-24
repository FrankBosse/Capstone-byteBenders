/**
 *
 * This file creates all of the note routes
 *
 * once server gets a request it finds corresponding route and the logic in route gets * executed
 *
 *  Exports as  noteRoutes
 *
 *  References for this file are from
 *  https://www.youtube.com/watch?v=Jcs_2jNPgtE&t=8033s
 *
 *  */

const express = require("express"); // imports express object from the npm i express, saves it in in express variable
const database = require("./connect"); // imports ./connect file from backend, saves it in the database variable
const { verifyToken } = require("./middleware/auth"); // imports verifyToken function from authMiddleware file
require("dotenv").config({ path: "./.env" }); // imports dotenv , loads the environment variables from .env file

// sets the express object router function as noteRoutes variable
let noteRoutes = express.Router();

// imports from mongodb to convert string to object id
const ObjectId = require("mongodb").ObjectId;

// Read all / GET
// async callback function, passes in HTTP request and response object
// uses the express noteRoutes object to set the GET route as "/notes"
// uses the getDB function from the ./connect file to return the DB
// awaits, goes into DB collection "notes" and finds all, returns as array, saves as data
// check to make sure data  has a value then returns response in json, if not gives an error
// Authenticated route, verifyToken middleware is called before the async function is executed
noteRoutes.route("/notes").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db.collection("notes").find({}).toArray();

  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("data was not found");
  }
});

// Read One / GET
// async callback function, passes in HTTP request and response object
// uses the express noteRoutes object to set the GET route as "/notes/:id"
// uses the getDB function from the ./connect file to return the DB
// awaits, goes into DB collection "notes" and  calls findsOne method, passing in the "id" from the route to find item in database with matching "id", returns as array, saves as data
// check to make sure data  has a value then returns response in json, if not gives an error
// * new ObjectId(request.params.id), converts the id string in a MongoDb id
// * (Object.keys(data.length > 0) , because object doesnt have a length need to grab its keys and see if there are more than 0
// Authenticated route, verifyToken middleware is called before the async function is executed
noteRoutes.route("/notes/:id").get(verifyToken, async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection("notes")
    .findOne({ _id: new ObjectId(request.params.id) });
  if (Object.keys(data.length > 0)) {
    response.json(data);
  } else {
    throw new Error("data was not found");
  }
});

// create one / POST
// async callback function, passes in HTTP request and response object
// uses the express noteRoutes object to set the POST route as "/notes"
// uses the getDB function from the ./connect file to return the DB
// creates a new object stored as MongoObject, each property of the object is set by the request object with the corresponding name, this will be passed in when the request is sent
//  awaits, goes into DB collection "notes" and uses mongo insertOne function to add the MongoObject into the database
// sends JSON response back to client
// Authenticated route, verifyToken middleware is called before the async function is executed
noteRoutes.route("/notes").post(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    noteTitle: request.body.noteTitle,
    noteContent: request.body.noteContent,
    createdBy: request.body.createdBy,
    dateCreated: request.body.dateCreated,
  };
  let data = await db.collection("notes").insertOne(mongoObject);
  response.json(data);
});

// update one / PUT
// async callback function, passes in HTTP request and response object
// uses the express noteRoutes object to set the POST route as "/notes/:id"
// uses the getDB function from the ./connect file to return the DB
// creates an updated object stored as MongoObject, each property of the object is set by the request object with the corresponding name, this will be passed in when the request is sent
//  awaits, goes into DB collection "notes" and uses mongo updateOne function to add the updated MongoObject into the database where the id of the request object matches the database object
// sends JSON response back to client
// * new ObjectId(request.params.id), converts the id string in a MongoDb id
// Authenticated route, verifyToken middleware is called before the async function is executed
noteRoutes.route("/notes/:id").put(verifyToken, async (request, response) => {
  let db = database.getDb();
  let mongoObject = {
    $set: {
      noteTitle: request.body.noteTitle,
      noteContent: request.body.noteContent,
      createdBy: request.body.createdBy,
      dateCreated: request.body.dateCreated,
      dateUpdated: new Date(),
    },
  };
  let data = await db
    .collection("notes")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

// Delete One / delete
// async callback function, passes in HTTP request and response object
// uses the express noteRoutes object to set the GET route as "/notes/:id"
// uses the getDB function from the ./connect file to return the DB
// awaits, goes into DB collection "notes" and  calls deleteOne method, passing in the "id" from the route to find item in database with matching "id", deletes item, returns as array, saves as data
// check to make sure data  has a value then returns response in json, if not gives an error
// * new ObjectId(request.params.id), converts the id string in a MongoDb id
// Authenticated route, verifyToken middleware is called before the async function is executed
noteRoutes
  .route("/notes/:id")
  .delete(verifyToken, async (request, response) => {
    let db = database.getDb();
    let data = await db
      .collection("notes")
      .deleteOne({ _id: new ObjectId(request.params.id) });

    response.json(data);
  });

module.exports = noteRoutes;
