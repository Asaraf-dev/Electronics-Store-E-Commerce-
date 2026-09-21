/*--- Footer ---*/
function esFooterInit(){const footer=document.querySelector(".es-footer");if(!footer)return;const footerLinks=footer.querySelectorAll(".es-footer-link");footerLinks.forEach(function(link){link.addEventListener("click",function(){footerLinks.forEach(function(item){item.classList.remove("es-footer-active");});link.classList.add("es-footer-active");});});}
/*--- Footer Component Loaded ---*/
document.addEventListener("esComponentLoaded",function(event){if(event.detail&&event.detail.component==="footer")esFooterInit();});