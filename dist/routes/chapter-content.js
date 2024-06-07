"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var chapterContentRoute = (0, express_1.Router)();
chapterContentRoute.get('/', function (request, response) {
    response.send('Chapter content');
});
exports.default = chapterContentRoute;
//# sourceMappingURL=chapter-content.js.map