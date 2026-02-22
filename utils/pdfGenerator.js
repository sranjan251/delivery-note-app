const puppeteer = require("puppeteer");

async function generatePDF(html){

let browser;

try{

browser = await puppeteer.launch({

headless:true,

args:[

"--no-sandbox",

"--disable-setuid-sandbox",

"--disable-dev-shm-usage",

"--disable-gpu"

]

});

const page = await browser.newPage();

await page.setContent(html,{

waitUntil:"networkidle0"

});

const pdf = await page.pdf({

format:"A4",

printBackground:true,

margin:{

top:"20mm",

bottom:"25mm",

left:"20mm",

right:"20mm"

}

});

await browser.close();

return pdf;

}

catch(err){

console.error("PDF ERROR:",err);

if(browser){

await browser.close();

}

throw err;

}

}

module.exports = generatePDF;