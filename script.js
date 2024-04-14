const container = document.querySelector('#table');

const estraiNumero = document.querySelector('#estraiNumero');

const numeroEstratto = document.querySelector('#numeroEstratto');

const reset = document.querySelector('#reset')

let numero = 0;

let numeriDaEstrarre = [];

let numeriEstratti = [];


//VERIFICA VINCITA
let ambo = false;
let terno = false;
let quaterna = false;
let cinquina = false;

//Costruisco layout pagina
let cartella = [];
let counter = 1;
let rows = 6
let col = 3

//GENERO LE 90 CASELLE ASSEGNANDO UNA CLASSE E UN ID
for (let i = 0; i < 6; i++) {

    cartella.push([])

    for (let j = 0; j < 3; j++) {

        cartella[i].push([])

        for (let k = 1; k <= 90 / rows / col; k++) {

            const number = document.createElement('div');

            number.classList = `box`
            number.id = counter;
            number.innerHTML += counter;
            container.appendChild(number);

            cartella[i][j].push(counter++)
        }
    }
}

//SELEZIONO TUTTI GLI ELEMENTI CON LA CLASSE 'box'
const box = document.querySelectorAll('.box');

//COMPILO UN ARRAY CON I 90 NUMERI DA ESTRARRE
function generaNumeriDaEstrarre() {
    for (let i = 1; i <= 90; i++) {
        numeriDaEstrarre.push(i)
    }
}

generaNumeriDaEstrarre();

//AL CLICK DEL TASTO ESTRAGGO UN NUOVO NUMERO E COLORO LA CASELLA CORRISPONDENTE
estraiNumero.addEventListener('click', () => {
    console.log('cartella', cartella)
    verificaNumeriEstratti()

    if (numeriEstratti.length === 90) {

        numeroEstratto.innerHTML = `Tutti i numeri sono stati estratti`

        reset.classList.remove('display')
        numeroEstratto.classList.add('display')
    } else {

        numeroEstratto.innerHTML = numeroEstratto == undefined ? 'Numero estratto' : `Numero estratto: ${numero}`
    }

    box.forEach((elemento) => {
        if (numero.toString() === elemento.id) {
            elemento.classList.add('green');
        }
    })

    //VERIFICA VINCITE
    //creo un nuovo array di numeri che sono presenti sia nelle cartelle che nei numeri estratti
    cartella.forEach((e, eIndex) => {
        e.forEach((it, itIndex) => {
            let arrayCartelle = it.filter(numero => numeriEstratti.includes(numero))
            if (arrayCartelle.length === 2 && !ambo) {
                ambo = true;
                alert('Ambo')
            } else if (arrayCartelle.length === 3 && !terno) {
                terno = true
                alert('Terno')
            } else if (arrayCartelle.length === 4 && !quaterna) {
                quaterna = true
                alert('Quaterna')
            } else if (arrayCartelle.length === 5 && !cinquina) {
                cinquina = true
                alert('Cinquina')
            } 
        })
    })   
    console.log(numeriEstratti)
})

//VERIFICO CHE IL NUOVO NUMERO RANDOMICO NON SIA GIA' STATO ESTRATTO
function verificaNumeriEstratti() {

    let numeriRimanenti = numeriDaEstrarre.filter(numero => !numeriEstratti.includes(numero));

    if (numeriRimanenti.length === 0) {
        estraiNumero.classList.add('display')
    }

    numero = numeriRimanenti[Math.floor(Math.random() * numeriRimanenti.length)];

    numeriEstratti.push(numero);

    return numero;
}

//RESET
reset.addEventListener('click', () => {
    numeriEstratti.length = 0;
    estraiNumero.classList.remove('display')
    reset.classList.add('display')
    numeroEstratto.classList.remove('display')
    box.forEach((elemento) => { elemento.classList.remove('green') })
    ambo = false;
    terno = false;
    quaterna = false;
    cinquina = false;
})



