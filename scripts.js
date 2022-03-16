const palabras = ["amor", "paz", "bondad", "cielo", "tierra", "fuego", "aire","agua","miel","lino","sol"];

let palabra = "";

let intentos = 0;

let letrasIntentadas = [];

const botonEnviar = document.getElementById("enviar");

const inputTexto = document.getElementById("input");

const infoMensaje = document.getElementById("info");

const masInfo = document.getElementById("mas-info");

let respuesta = document.getElementById("respuesta");

const imagenAhorcado = document.getElementById("imagen-ahorcado");

const canvas = document.getElementById("canvas");


function desactivarEnvio(estado) {
  botonEnviar.disabled = estado;
  inputTexto.disabled = estado;
}

function reset() {
  palabra = "";
  respuesta.innerHTML = "";
  masInfo.innerHTML = "";
  letrasIntentadas = [];
  inicio();
  mostrarInfo();
  desactivarEnvio(false);
}

function mostrarInfo() {
  infoMensaje.innerHTML = "Te quedan " + intentos + " intentos"; 
}

function incluirLetra(letra) {
  if (letrasIntentadas.includes(letra)) {
    masInfo.innerHTML = "ya intentaste la letra";
  } else {
    letrasIntentadas.push(letra);
  }
}

function limpiarImagen() {
  const imagenAhorcado = document.getElementById("imagen-ahorcado");
  const canvas = document.getElementById("canvas");
  const img = document.createElement("img");
  img.id = "imagen-ahorcado";
  canvas.removeChild(imagenAhorcado);
  canvas.appendChild(img);
}

function enviar() {
  const letra = inputTexto.value;
  masInfo.innerHTML = "";
  inputTexto.value = "";
  console.log
  incluirLetra(letra);
  if (palabra.includes(letra) === false) {
    intentos--;
    agregarDibujo();
  }
  mostrarInfo();
  mostrarPalabra();
  if (intentos === 0) {
    fracaso();
  }
}

function exito() {
  console.log("GANASTE");
  desactivarEnvio(true);
  limpiarImagen();
  infoMensaje.innerHTML = "GANASTE";
}

function fracaso() {
  infoMensaje.innerHTML = "PERDISTE";
  desactivarEnvio(true);
  console.log(palabra);
  masInfo.innerHTML = "La palabra era " + palabra;
  respuesta.innerHTML = "";
  limpiarImagen();
}

function mostrarPalabra() {
  let palabraAMostrar = "";
  const letras = palabra.split("");
  for (let index = 0; index < letras.length; index++) {
    const letra = letras[index];
    if (letrasIntentadas.includes(letra)) {
      palabraAMostrar = palabraAMostrar + letra;
    } else {
      palabraAMostrar = palabraAMostrar + "_";
    }
  }
  respuesta.innerHTML = palabraAMostrar;
  if (palabra === palabraAMostrar) {
    exito();
  }
}

function agregarDibujo() {
  const imagenAhorcado = document.getElementById("imagen-ahorcado");
  const canvas = document.getElementById("canvas");
  const img = document.createElement("img");
  img.src = "imagenes/ahorcado" + intentos + ".jpeg";
  img.alt = "ahorcado";
  img.id = "imagen-ahorcado";
  canvas.removeChild(imagenAhorcado);
  canvas.appendChild(img);
}

function inicio() {
  palabra = palabras[Math.floor(Math.random() * palabras.length)]; //elegimos una palabra al azar del array palabras
  intentos = palabra.length; //la cantidad de letras d ela palabra es igual a la cantidad de intentos
  mostrarInfo();
  mostrarPalabra();
}

window.onload = inicio();
