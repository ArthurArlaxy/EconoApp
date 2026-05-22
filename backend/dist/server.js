"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = require("./router");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api", router_1.router);
// Serve o frontend
app.use(express_1.default.static(path_1.default.join(__dirname, '..', '..', 'frontend', 'dist')));
app.get('/{*path}', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html'));
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor Online em http://localhost:${PORT}`);
});
