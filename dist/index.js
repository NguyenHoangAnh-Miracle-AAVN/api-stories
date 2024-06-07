"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var stories_1 = __importDefault(require("./routes/stories"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1.default)();
var port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// define a route to get all stories from defined route
app.use('/stories', stories_1.default);
app.get('/', function (req, res) {
    console.log('Home page visited!');
    var pathFile = path_1.default.join(__dirname, 'public', 'home.htm');
    console.log(pathFile);
    res.sendFile(pathFile);
});
app.listen(port, function () {
    return console.log("Express is listening at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map