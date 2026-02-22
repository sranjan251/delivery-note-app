const express = require("express");

const fs = require("fs");

const Mustache = require("mustache");

const generatePDF = require("../utils/pdfGenerator");

const router = express.Router();

router.post("/", async(req,res)=>{

try{

const data=req.body;

const template = fs.readFileSync(

"templates/deliveryTemplate.html",

"utf8"

);

const html = Mustache.render(template,data);

const pdf = await generatePDF(html);

res.set({

"Content-Type":"application/pdf",

"Content-Disposition":"attachment; filename=delivery-note.pdf"

});

res.send(pdf);

}

catch(err){

console.log(err);

res.status(500).send("PDF generation error");

}

});

module.exports = router;