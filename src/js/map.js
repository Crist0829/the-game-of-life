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
                    // Su valor por defecto 60
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
        if(arrayCellCords[(arrayCellCords.length - 1)-numberRows+index]){
            count ++
        }
        if(arrayCellCords[(arrayCellCords.length - 1)-(numberRows-1)+index]){
            count ++
        }
        if(arrayCellCords[(arrayCellCords.length - 1)-(numberRows+1)+index]){
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
        if(arrayCellCords[(index+numberRows)-(arrayCellCords.length-1)]){
            count ++
        }
        if(arrayCellCords[(index+(numberRows-1))-(arrayCellCords.length-1)]){
            count ++
        }
        if(arrayCellCords[(index+(numberRows+1))-(arrayCellCords.length-1)]){
            count ++
        }
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

    neighbors = neighborsLiving(index) //Almacena la cantidad de vecinos vivos que tiene la celula en el array 
                                       //arrayCellCords (tiene el estado inicial)
                                       //Se toma el indice (index) como parametro para la posición de la celula en el array.

//---------------------------------------------------REGLAS---------------------------------------//

    if(arrayCellCords[index] === 0){ // Si una celula está muerte y tiene 3 vecinas vivas: "nace"
        if(neighbors === 3){
            arrayCellCordsAux[index] = 1 // Se almacena su nuevo valor en el arrayCell auxiliar
        }
        
    }else{ // Si una celula está viva y tiene dos o 3 vecinas vivas: "sobrevive" en caso contrario muere
        if(neighbors === 2 || neighbors === 3){
            arrayCellCordsAux[index] = 1 // Se almacena su nuevo estado en el ArrayCell auxiliar
        }else{
            arrayCellCordsAux[index] = 0 // Se almacena su nuevo estado en el ArrayCell auxiliar
        }
        
    }
}

function renewCellStatus(index){
    arrayCellCords[index] = arrayCellCordsAux[index] //
    arrayCellCordsAux[index] = 0
}

function changeColor(index){
    if(arrayCellCordsAux[index]){
        arrayCell[index].style.backgroundColor = "#000"
    }else{
        arrayCell[index].style.backgroundColor = "rgb(36, 194, 194)"
    }
}

/*Cambia el estado de las celulas y los array de coordenadas con base en las reglas
Establecidas en la función rules (llama a la función rules), luego cambia de color cada div de la celula 
con base en su estado (llama a la función changeColor) y finalmente le pasa el valor del array que contiene el estado 
de las celulas después de pasarle las reglas al array que contiene el estado inicial
(el valor posterior pasará a hacer el inicial y el posterior estará vacío mientras 
se vuelven a aplicar las reglas) (Llama a la función renewCellStatus*/
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

/*Llena la variable Cell con div's (que serán la representación gráfica de las celulas)
(cada una tendrá un id)
luego la pondrá en el contenedor o lienzo "map", una vez que esté hecho, 
se seleccionará cada celula por su id y se establecera un evento (click)
al que se le asigará la función liveOrDie que establecerá si la celula está viva 
o muerta (si está viva, con un click estará muerta y viceversa)*/
function setMap(){ 
    arrayCellCords = []
    arrayCellCordsAux = []
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

setNumbButtom.addEventListener("click", () => { //Cambia el número de filas y columnas que tiene el liezo "map"
    if(userNumber.value === ""){
        userNumber.value = 0
    }
    let userNumber2 = parseInt(userNumber.value)
    if(userNumber2 < 30 || userNumber2 > 150){
        alert("Elige un número entre 30 y 150")
    }else{
        numberRows = userNumber2
        setMap()
    }
})


/*Cuando se da click al boton play se iniciará el juego llamando a la función changeStatus
que es la encargada de llamar las reglas y cambiar el estado de las celulas
cuando se haya iniciado el juego, también se creará la función correspondiente 
para "pausar" o detener el juego que se asignará al botón correspondiente
también se crea el listener para el boton "clear" que reestablerá las celulas a su estado inicial*/
playButon.addEventListener("click", () => {
    var rulesEvent = setInterval(() => { 
        changeStatus()
        }, 100)

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