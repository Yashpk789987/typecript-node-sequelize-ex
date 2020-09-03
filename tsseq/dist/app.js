"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const app = express_1.default();
models_1.db.sync({});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/save/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let book = yield models_1.Book.create({ authorId: 1, name: req.params.name });
        res.json({ ok: true, book });
    }
    catch (error) { }
}));
app.get("/author/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let author = yield models_1.Author.create({ name: req.params.name });
        res.json({ ok: true, author });
    }
    catch (error) { }
}));
app.get("/books", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield models_1.Book.findAll({ include: "author" });
    res.json({ ok: true, books });
}));
app.listen(process.env.PORT || 4000, () => {
    console.log(`app is listening to port 4000`);
});
//# sourceMappingURL=app.js.map