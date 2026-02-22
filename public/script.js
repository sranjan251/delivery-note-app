document.getElementById("deliveryForm")

.addEventListener("submit", async function(e){

e.preventDefault();

const formData = new FormData(this);

let data = {};

formData.forEach((v,k)=>{

data[k] = v;

});


function formatList(text){

return text

.split("\n")

.filter(x=>x.trim()!="")

.map((d,i)=>`${i+1}. ${d}`)

.join("<br>");

}


data.documents = formatList(data.documents);

data.paymentDetails = formatList(data.paymentDetails);

data.additionalNotes = (data.additionalNotes || "")

.replace(/\n/g,"<br>");


// SEND REQUEST

const res = await fetch("/generate",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});


// MOBILE SAFE DOWNLOAD

const blob = await res.blob();

const blobUrl = URL.createObjectURL(blob);


// Create REAL LINK (Safari Compatible)

const link = document.createElement("a");

link.href = blobUrl;

link.target = "_blank";

link.rel="noopener";

document.body.appendChild(link);

link.click();

document.body.removeChild(link);

URL.revokeObjectURL(blobUrl);

});