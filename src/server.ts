import app from "./app";
import process = require("process");
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
    console.log(`Server succesfully started on port : ${PORT} !`);
});
