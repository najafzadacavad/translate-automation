document.getElementById("header-component").innerHTML =
HeaderComponent();

document.getElementById("menu-component").innerHTML =
MenuComponent();

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

const translateText = () =>{

let text = document.getElementById("inputText").value.toLowerCase();

let lang = document.getElementById("language").value;

let result = translator.getTranslation(text,lang);

document.getElementById("result").innerHTML = result;

}