let map = document.getElementById("map")
let cell = "" // Contendrá las celulas que se crearán a partir de un bucle
let arrayCell = [] // Contendra cada una de las celulas creadas por su id
let arrayCellCords = [] // array que servirá como tabla de coordenadas, alamcenará el estado inicial de las celulas
let arrayCellCordsAux = [] // Almacenará el estado de las celulas después de pasar por las reglas
let neighbors // Se almacenará la cantidad de vecinas vivas que tiene una celula par establecer las reglas
let stopButon = document.getElementById("stop")
let playButon = document.getElementById("play")
let clearButon = document.getElementById("clear")

let numberRows = 60 //Será el número de filas y columnas que tendrá el lienzo "map"
let userNumber = document.getElementById("num-row")
let setNumbButtom = document.getElementById("set-num-row")


function liveOrDie(index){ // Establece si una celula está viva o muerta recibe el indece como argumento
    if(arrayCellCords[index]){
        arrayCellCords[index] = 0
        arrayCell[index].style.backgroundColor = "rgb(36, 194, 194)"
    }else{
        arrayCellCords[index] = 1
        arrayCell[index].style.backgroundColor = "#000"
    }
}

function neighborsLiving(index){
    let count = 0
    if(index < 60){
        /* if(arrayCellCords[(arrayCellCords.length - 1)-60+index]){
            count ++
        }
        if(arrayCellCords[(arrayCellCords.length - 1)-59+index]){
            count ++
        }
        if(arrayCellCords[(arrayCellCords.length - 1)-61+index]){
            count ++
        } */
        if(arrayCellCords[index-1]){
            count ++
        }
        if(arrayCellCords[index+1]){
            count ++
        }
        if(arrayCellCords[index+numberRows]){
            count ++
        }
        if(arrayCellCords[index+(numberRows-1)]){
            count ++
        }
        if(arrayCellCords[index+(numberRows+1)]){
            count ++
        }
    }else if(index > (arrayCellCords.length-1)-numberRows){
        if(arrayCellCords[index-numberRows]){
            count ++
        }
        if(arrayCellCords[index-(numberRows-1)]){
            count ++
        }
        if(arrayCellCords[index-(numberRows+1)]){
            count ++
        }
        if(arrayCellCords[index-1]){
            count ++
        }
        if(arrayCellCords[index+1]){
            count ++
        }
        /* if(arrayCellCords[(index+60)-(arrayCellCords.length-1)]){
            count ++
        }
        if(arrayCellCords[(index+59)-(arrayCellCords.length-1)]){
            count ++
        }
        if(arrayCellCords[(index+61)-(arrayCellCords.length-1)]){
            count ++
        } */
    }else{
        if(arrayCellCords[index-numberRows]){
            count ++
        }
        if(arrayCellCords[index-(numberRows-1)]){
            count ++
        }
        if(arrayCellCords[index-(numberRows+1)]){
            count ++
        }
        if(arrayCellCords[index-1]){
            count ++
        }
        if(arrayCellCords[index+1]){
            count ++
        }
        if(arrayCellCords[index+numberRows]){
            count ++
        }
        if(arrayCellCords[index+(numberRows-1)]){
            count ++
        }
        if(arrayCellCords[index+(numberRows+1)]){
            count ++
        }
    }

    return count

}

function rules(index){ //Establece las reglas del juego y cambia el estado de cada celula en el array de coordenadas auxiliar

    neighbors = neighborsLiving(index) 

    if(arrayCellCords[index] === 0){ // Si una celula está muerte y tiene 3 vecinas vivas: "nace"
        if(neighbors === 3){
            arrayCellCordsAux[index] = 1 // Se almacena su nuevo valor en el arrayCell auxiliar
        }
        
    }else{ // Si una celula está viva y tiene dos o 3 vecinas vivas: "sobrevive" en caso contrario muere
        if(neighbors === 2 || neighbors === 3){
            arrayCellCordsAux[index] = 1 // Se almacena su nuevo valor en el ArrayCell auxiliar
        }else{
            arrayCellCordsAux[index] = 0 // Se almacena su nuevo valor en el ArrayCell auxiliar
        }
        
    }
    
}

function renewCellStatus(index){
    arrayCellCords[index] = arrayCellCordsAux[index]
    arrayCellCordsAux[index] = 0
}

function changeColor(index){
    if(arrayCellCordsAux[index]){
        arrayCell[index].style.backgroundColor = "#000"
    }else{
        arrayCell[index].style.backgroundColor = "rgb(36, 194, 194)"
    }
}

function changeStatus(){ 

    for(let i = 0; i < arrayCellCords.length; i++){
        rules(i)
    }

    for(let i = 0; i < arrayCellCords.length; i++){
        changeColor(i)
    }

    for(let i = 0; i < arrayCellCords.length; i++){
        renewCellStatus(i)
    }

}

function setMap(){

    cell = ""
        for(let i = 0; i < (numberRows * numberRows); i++){
            cell += `<div class="cell" id="c_${i}"></div>` //Crea cada una de las celulas con un id
            arrayCellCords[i] = 0 // establece que cada celula tiene un valor inicial de 0 "muerta"
            arrayCellCordsAux[i] = 0 // establece que cada celula tiene un valor inicial de 0 "muerta"
        }
        
        map.innerHTML = cell //Coloca las celulas en el lienzo "map"
        map.style.display = "grid"
        map.style.gridTemplateRows = `repeat(${numberRows}, 1fr)`
        map.style.gridTemplateColumns = `repeat(${numberRows}, 1fr)`
        map.style.gap = "1px"

        /*Una vez se han agregado todas las celulas al lienzo, se procede a seleccionar cada ua por su id
        y luego se le agrega el listener correspondiente para poder cambiar su estado (con la funcion liveOrDie) */
        for(let i = 0; i < arrayCellCords.length; i++){
            arrayCell[i] = document.getElementById("c_" + i) //Almacena cada celula por su id
            arrayCell[i].addEventListener("click", () => {
                liveOrDie(i)
             })
        }

}

setNumbButtom.addEventListener("click", () => {

    if(userNumber.value === ""){
        userNumber.value = 0
    }

    let userNumber2 = parseInt(userNumber.value)
    if(userNumber2 < 60 || userNumber2 > 120){
        alert("Elige un número entre 60 y 120")
    }else{
        numberRows = userNumber2
        setMap()
    }
})


playButon.addEventListener("click", () => {
    var rulesEvent = setInterval(() => { //Se ejecuta cada 1 segundo y ve si hay cambios en cada celula, ejecutando las reglas (rules)
        changeStatus()
        }, 500)

    function deleteRulesEvent(){
        clearInterval(rulesEvent)
    }

    stopButon.addEventListener("click", () => {
        deleteRulesEvent()
    })

    clearButon.addEventListener("click", () => {
        clearInterval(rulesEvent)
        for(let i = 0; i < arrayCellCords.length; i++){
            arrayCellCords[i] = 0
            arrayCellCordsAux[i] = 0
            changeColor(i)
        }
    })
})

window.onload = () => {
    setMap()
}