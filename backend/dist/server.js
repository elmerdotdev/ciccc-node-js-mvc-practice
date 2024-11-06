"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookieSession = require("cookie-session");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:4321',
    credentials: true
}));
const SIGN_KEY = (_a = process.env.COOKIE_SESSION_SIGN_KEY) !== null && _a !== void 0 ? _a : 'zfqfqwff23e';
const ENCRYPT_KEY = (_b = process.env.COOKIE_SESSION_ENCRYPT_KEY) !== null && _b !== void 0 ? _b : 'wef1rgw3ef';
app.use(cookieSession({
    name: 'session',
    keys: [SIGN_KEY, ENCRYPT_KEY],
    maxAge: 3 * 60 * 1000
}));
app.use(express_1.default.json());
app.use('/', user_routes_1.default);
const PORT = Number(process.env.PORT || 3000);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
