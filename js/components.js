const HeaderComponent = ({title}) => {

return `

<header class="header">

<img 
src="https://www.martindale-avvo.com/wp-content/uploads/2019/08/iStock-1088905934.jpg"
class="logo">

<h2 class="center-title">
${title}
</h2>

</header>

`;

}



const MenuComponent = () => {

return `

<div class="menu">

<a href="main.html" class="active">
Translate
</a>

<a href="wordbase.html">
Word Base
</a>

</div>

`;

}



const CardComponent = ({title}) => {

return `

<div class="card">

<p class="info">
${title}
</p>

<textarea id="inputText"
placeholder="Type text...">
</textarea>

</div>

`;

}



const ResultComponent = ({title}) => {

return `

<div class="card">

<p class="info">
${title}
</p>

<div id="result" class="result-box">
Translation...
</div>

</div>

`;

}



const ButtonComponent = ({text}) => {

return `

<button onclick="translateText()">
${text}
</button>

`;

}



const FooterComponent = () => {

return `

<footer class="footer">

<p>
Simple Translator Project
</p>

</footer>

`;

}



const AlertComponent = ({text}) => {

return `

<div class="alert">
${text}
</div>

`;

}



const BadgeComponent = ({text}) => {

return `

<span class="badge">
${text}
</span>

`;

}



const ImageComponent = ({url}) => {

return `

<img src="${url}" class="small-image">

`;

}



const BoxComponent = ({text}) => {

return `

<div class="box">
${text}
</div>

`;

}