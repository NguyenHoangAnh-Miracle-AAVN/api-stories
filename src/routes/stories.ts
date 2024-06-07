import express from "express";
import { getChapterByStoryIdAndChapterId, getChapterTitlesByStoryId, getStories, getStoryById } from "../lib/stories";


//define a route to get all stories
const storiesRoute = express.Router();

//define a route to get all stories
storiesRoute.get('/', (request, response) => {
    getStories().then((stories) => {
        response.json(stories);
    });
}); 


storiesRoute.get('/:id/chapters/:chapterNumber', (request, response) => {
    const id = parseInt(request.params.id);
    const chapterId = parseInt(request.params.chapterNumber);
    getChapterByStoryIdAndChapterId(id, chapterId).then((chapter) => {
        if (chapter) {
            response.json(chapter);
        } else {
            response.status(404).send('Chapter not found');
        }
    });
}
);

// define route to get all chapter titles by story id
storiesRoute.get('/:id/chapters', (request, response) => {
    const id = parseInt(request.params.id);
    getChapterTitlesByStoryId(id).then((chapters) => {
        response.json(chapters);
    });
});


storiesRoute.get('/:id', (request, response) => {
    const id = parseInt(request.params.id);
    getStoryById(id).then((story) => {
        if (story) {
            response.json(story);
        } else {
            response.status(404).send('Story not found');
        }
    });
});

export default storiesRoute;