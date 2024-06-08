"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var stories_1 = require("../lib/stories");
//define a route to get all stories
var storiesRoute = express_1.default.Router();
//define a route to get all stories
storiesRoute.get('/', function (request, response) {
    (0, stories_1.getStories)().then(function (stories) {
        response.json(stories);
    });
});
storiesRoute.get('/:id/chapters/:chapterNumber', function (request, response) {
    var id = parseInt(request.params.id);
    var chapterId = parseInt(request.params.chapterNumber);
    (0, stories_1.getChapterByStoryIdAndChapterId)(id, chapterId).then(function (chapter) {
        if (chapter) {
            response.json(chapter);
        }
        else {
            response.status(404).send('Chapter not found');
        }
    });
});
// define route to get all chapter titles by story id
storiesRoute.get('/:id/chapters', function (request, response) {
    var id = parseInt(request.params.id);
    (0, stories_1.getChapterTitlesByStoryId)(id).then(function (chapters) {
        response.json(chapters);
    });
});
storiesRoute.get('/:id', function (request, response) {
    var id = parseInt(request.params.id);
    (0, stories_1.getStoryById)(id).then(function (story) {
        if (story) {
            response.json(story);
        }
        else {
            response.status(404).send('Story not found');
        }
    });
});
exports.default = storiesRoute;
//# sourceMappingURL=stories.js.map