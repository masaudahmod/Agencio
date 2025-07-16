import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET;
REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET;

export { PORT, JWT_SECRET, ACCESSTOKEN_SECRET, REFRESHTOKEN_SECRET };