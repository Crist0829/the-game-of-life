let descButton = document.getElementById("desc-button")
let descText = document.getElementById("desc-text")
let rulesButton = document.getElementById("rules-button")
let rulesText  = document.getElementById("rules-text")
let patternsButton = document.getElementById("patterns-button")
let patternsText = document.getElementById("patterns-text")

function accordion(element, tis){
    if(element.style.maxHeight){
        tis.removeAttribute("class", "active")
        element.style.padding = "0px"
        element.style.border = "none"
        element.style.maxHeight = null
    }else{
        tis.setAttribute("class", "active")
        element.style.padding = "0.5rem"
        element.style.border = "solid 1px #000"
        element.style.maxHeight = element.scrollHeight + "px"
    }

}

descButton.addEventListener("click", () => {
    accordion(descText, descButton);
})

rulesButton.addEventListener("click", () => {
    accordion(rulesText, rulesButton);
})

patternsButton.addEventListener("click", () => {
    accordion(patternsText, patternsButton);
})