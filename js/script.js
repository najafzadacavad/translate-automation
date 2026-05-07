document.getElementById("header-component").innerHTML =
HeaderComponent({
title:"Translator"
});



document.getElementById("menu-component").innerHTML =
MenuComponent();



if(document.getElementById("translate-card")){

document.getElementById("translate-card").innerHTML =
CardComponent({
title:"Enter text"
});

}



if(document.getElementById("result-card")){

document.getElementById("result-card").innerHTML =
ResultComponent({
title:"Result"
});

}



if(document.getElementById("button-component")){

document.getElementById("button-component").innerHTML =
ButtonComponent({
text:"Translate"
});

}



if(document.getElementById("footer-component")){

document.getElementById("footer-component").innerHTML =
FooterComponent();

}



if(document.getElementById("alert-component")){

document.getElementById("alert-component").innerHTML =
AlertComponent({
text:"Modern JavaScript Components"
});

}



const jsonData = `{

"hello":{"tr":"merhaba","az":"salam"},

"world":{"tr":"dunya","az":"dunya"},

"computer":{"tr":"bilgisayar","az":"komputer"},

"student":{"tr":"ogrenci","az":"telebe"}

}`;



class Translator{

constructor(){

this.dictionary = JSON.parse(jsonData);

}



getTranslation(text,lang){

if(this.dictionary[text]){

const {tr,az} = this.dictionary[text];

if(lang==="tr"){
return tr;
}else{
return az;
}

}

return "Translation not found";

}

}



const translator = new Translator();



const translateText = () => {

let text =
document.getElementById("inputText")
.value
.toLowerCase();



let lang =
document.getElementById("language")
.value;



let result =
translator.getTranslation(text,lang);



document.getElementById("result")
.innerHTML = result;

}