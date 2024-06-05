import express from "express";

export const storiesRoute = express.Router();

// Define story-related routes
storiesRoute.get('/', (request, response) => {
    response.send('Hello world');
})

storiesRoute.post('/', (request, response) => {

})
