// let BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";



// fetch(url)// returns a promise
// console.log(fetch(BASE_URL))

const selects=document.querySelectorAll(".drop-down select");
let btn=document.querySelector("button");
let Fromvalue=document.querySelector(".from select");
let Tovalue=document.querySelector(".to select");
let showresult=document.querySelector(".result-para p");




// add country list into the options
for( let select of selects)
{
    for( let code in countryList)
{
    let opt= document.createElement("option");
    opt.innerText=code;
    opt.value=code;
    select.appendChild(opt);
    
    if(select.name==="from" && opt.value==="USD"){
        opt.selected="selected"
    } 
    else if(select.name==="to" && opt.value==="INR"){
        opt.selected="selected"
    }
   
  }//changing flag
  
  select.addEventListener("change" , function (evt){

    updateFlag(evt.target);
  }); 
}
// flag changing function
let updateFlag=(ele)=>{
    let currcode=ele.value;
    let countryFlag=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countryFlag}/flat/64.png`;  
  let img=ele.parentElement.querySelector("img");
   img.src=newsrc;
}

//button
btn.addEventListener("click",async(evt)=>{
  evt.preventDefault();
  let amount=document.querySelector("input");
  let amountvalue=amount.value;
  if(amountvalue===" "||amountvalue<1){
    amountvalue=1;
    amount.value=1;
  }
  console.log(Fromvalue.value,Tovalue.value);
  // const url=`${BASE_URL}/${Fromvalue.value.toLowerCase()}/${Tovalue.value.toLowerCase()}.json`;
  const url=`https://api.currencyapi.com/v3/latest?apikey=cur_live_k4Dmu4hlKFtqnHxPudY1md5T6W0NSP5gc6WRTvIw&currencies=${Tovalue.value}&base_currency=${Fromvalue.value}`;
  let response=await fetch(url);
  let data= await response.json();
  let realvalue=data.data[Tovalue.value].value;
    // console.log(data.data[Tovalue.value].value);
    console.log(realvalue)
    let total=realvalue*amountvalue;
    showresult.innerText=`${amountvalue} ${Fromvalue.value}=${total}  ${Tovalue.value}`;

  

})
