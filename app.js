const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdowns  =document.querySelectorAll(".dropdown select");

const btn =document.querySelector("button");

const fromCurr =document.querySelector(".from select");

const toCurr =document.querySelector(".to select");

const msg = document.querySelector(".msg");



for(select of dropdowns ){
    for (currCode in countryList){
           let newOption = document.createElement("option");
           newOption.innerText= currCode;
           newOption.value =currCode;

           if (select.name==="from" && currCode ==="USD") {
            newOption.selected="selected";
           } else if(select.name==="to" && currCode ==="INR"){
            newOption.selected="selected";
           }
           select.append(newOption);
    }
     
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}
const updateExchangeRate = async()=>{
    let amount= document.querySelector(".amount input");
    let amtVlu= amount.value;
    console.log(amtVlu);
    if (amtVlu===""|| amtVlu <1) {
        amtVlu=1;
        amount.value= "1";
    }

    const URL= `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount =amtVlu * rate;
    console.log(finalAmount);
    
    msg.innerText =`${amtVlu} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

const updateFlag =(element)=>{
    let currCode = element.value;
    let countryCode= countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/shiny/64.png`;

    let img =element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();    
    updateExchangeRate();
});
window.addEventListener("load",()=>{
    updateExchangeRate();
});

