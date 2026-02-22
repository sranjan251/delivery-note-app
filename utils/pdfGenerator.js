const puppeteer = require("puppeteer-core");

async function generatePDF(html){

const browser = await puppeteer.launch({

headless:true,

// IMPORTANT PART

executablePath:

process.env.CHROME_PATH ||

"/usr/bin/chromium-browser",

args:[

"--no-sandbox",

"--disable-setuid-sandbox",

"--disable-dev-shm-usage"

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

module.exports = generatePDF;