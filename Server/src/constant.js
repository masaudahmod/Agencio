import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const origin = process.env.ORIGIN;
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET;
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET;

const MONGO_URI = process.env.MONGO_URI;

export { PORT, JWT_SECRET, ACCESSTOKEN_SECRET, REFRESHTOKEN_SECRET, MONGO_URI, origin };
