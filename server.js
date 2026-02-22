const express = require("express");

const bodyParser = require("body-parser");

const pdfRoute = require("./routes/pdfRoute");

const app = express();

app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/generate", pdfRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{

console.log("Server Running");

});