document.getElementById("deliveryForm")

.addEventListener("submit",

async function(e){

e.preventDefault();

const formData=new FormData(this);

let data={};

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

data.additionalNotes=data.additionalNotes

.replace(/\n/g,"<br>");

const res = await fetch("/generate",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(data)

});

const blob = await res.blob();

const url = window.URL.createObjectURL(blob);

window.open(url,"_blank"); // better for mobile safari

});