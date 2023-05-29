"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const PORT = 5001;
const app = express();
app.get("/test", (req, res) => {
  console.log(`endpoint /test reached !`);
  res.send("endpoint available");
});
app.listen(PORT, () => {
  console.log(`Server succesfully started on port : ${PORT} !`);
});
