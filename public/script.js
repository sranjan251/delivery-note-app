document.getElementById("deliveryForm")

.addEventListener("submit", async function(e){

e.preventDefault();

const formData = new FormData(this);

let data = {};

formData.forEach((v,k)=>{

data[k]=v;

});

function formatList(text){

return text

.split("\n")

.filter(x=>x.trim()!="")

.map((d,i)=>`${i+1}. ${d}`)

.join("<br>");

}

data.documents=formatList(data.documents);

data.paymentDetails=formatList(data.paymentDetails);

data.additionalNotes=(data.additionalNotes||"")

.replace(/\n/g,"<br>");


// DIRECT NAVIGATION (BEST FOR SAFARI)

const response = await fetch("/generate",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

const blob = await response.blob();

const fileURL = URL.createObjectURL(blob);

// Safari reliable open

window.location.href = fileURL;

});