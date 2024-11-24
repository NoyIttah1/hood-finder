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
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const Neighborhood_1 = __importDefault(require("./models/Neighborhood"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// MongoDB connection
const MONGO_URL = 'mongodb://localhost:27017/noy';
mongoose_1.default.connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
// Routes
// app.get('/', (req: Request, res: Response) => {
//     res.send('Backend server is running');
// });
app.get('/neighborhoods', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const neighborhoods = yield Neighborhood_1.default.find();
        res.json(neighborhoods);
    }
    catch (error) {
        console.error('Error fetching neighborhoods:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}));
// Start server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
