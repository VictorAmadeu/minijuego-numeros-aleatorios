/***************************************************************
 * script.js
 *
 * Este archivo contiene la lógica completa de nuestro minijuego:
 * 1. Definimos y usamos funciones predefinidas de JavaScript.
 * 2. Creamos y utilizamos nuestras propias funciones (definidas por el usuario).
 * 3. Trabajamos con arrays para almacenar y mostrar un historial de intentos.
 **************************************************************/

/* 1. Seleccionamos los elementos del DOM (Document Object Model) que necesitamos manipular */
const guessInput = document.getElementById("guessInput"); // Campo de texto donde se ingresa el número
const guessButton = document.getElementById("guessButton"); // Botón para realizar el intento
const message = document.getElementById("message"); // Área para mostrar mensajes sobre el estado del juego
const resetButton = document.getElementById("resetButton"); // Botón para reiniciar el juego
const guessHistory = document.getElementById("guessHistory"); // Lista para mostrar el historial de intentos

/* 2. Declaramos variables globales que usaremos para la lógica del juego */
// Usamos Math.random() (función predefinida) para generar un número aleatorio entre 1 y 100
// y Math.floor() para redondear hacia abajo dicho número aleatorio
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Creamos un array para almacenar los intentos del usuario
let attempts = [];

/* 3. Función personalizada (definida por el usuario) para mostrar mensajes en pantalla */
function showMessage(text, type = "info") {
  // 'text' es el texto del mensaje
  // 'type' define el tipo de alerta de Bootstrap (info, success, danger, etc.)

  // Ajustamos el contenido del <div> de mensaje
  message.textContent = text;

  // Ajustamos la clase de Bootstrap para cambiar el color de la alerta
  message.className = `alert alert-${type}`;

  // Mostramos el mensaje estableciendo la propiedad 'display' a 'block'
  message.style.display = "block";
}

/* 4. Función personalizada para ocultar el botón de reinicio al iniciar el juego */
function hideResetButton() {
  // Cambiamos el estilo CSS para no mostrar el botón
  resetButton.style.display = "none";
}

/* 5. Función personalizada para mostrar el botón de reinicio */
function showResetButton() {
  // Cambiamos el estilo CSS para mostrar el botón
  resetButton.style.display = "inline-block";
}

/* 6. Evento asociado al botón "Probar suerte" */
// Cuando el usuario hace clic, se ejecuta la función handleGuess
guessButton.addEventListener("click", handleGuess);

/* 7. Función principal que maneja la lógica cuando el usuario hace un intento */
function handleGuess() {
  // Convertimos el valor ingresado en el input a número entero
  // parseInt() es otra función predefinida de JavaScript
  const userGuess = parseInt(guessInput.value);

  // Validamos si el usuario ingresó realmente un número
  if (isNaN(userGuess)) {
    showMessage("Por favor, ingresa un número válido.", "warning");
    return; // Salimos de la función si no es un número
  }

  // Agregamos el intento actual al array 'attempts' con push() (función predefinida de arrays)
  attempts.push(userGuess);

  // Llamamos a la función que actualiza la lista de historial
  updateGuessHistory();

  // Comparamos el número ingresado (userGuess) con el número aleatorio (randomNumber)
  if (userGuess === randomNumber) {
    // Si acierta el número
    showMessage(
      `¡Felicidades! Has adivinado el número secreto: ${randomNumber}`,
      "success"
    );
    // Mostramos el botón para reiniciar el juego
    showResetButton();
    // Desactivamos el botón "Probar suerte" para no seguir intentando
    guessButton.disabled = true;
  } else if (userGuess < randomNumber) {
    // Si el número ingresado es menor que el secreto
    showMessage("Demasiado bajo. ¡Intenta un número más alto!", "info");
  } else {
    // Si el número ingresado es mayor que el secreto
    showMessage("Demasiado alto. ¡Prueba con un número más bajo!", "info");
  }

  // Limpiamos el campo de texto para el siguiente intento
  guessInput.value = "";
  // Colocamos el foco de nuevo en el input para facilidad de uso
  guessInput.focus();
}

/* 8. Función personalizada para actualizar el historial de intentos (arrays) */
function updateGuessHistory() {
  // Limpiamos la lista UL antes de volver a pintarla
  guessHistory.innerHTML = "";

  // Recorremos cada intento del array 'attempts'
  // Usamos forEach (función predefinida de arrays) para iterar
  attempts.forEach(function (attempt, index) {
    // Creamos un elemento <li> para mostrar cada intento
    const li = document.createElement("li");
    // Agregamos la clase de Bootstrap para formatear la lista
    li.classList.add("list-group-item");
    // El texto contendrá el número de intento y el valor
    li.textContent = `Intento #${index + 1}: ${attempt}`;
    // Insertamos el <li> dentro de la lista UL
    guessHistory.appendChild(li);
  });
}

/* 9. Evento asociado al botón "Reiniciar juego" */
// Llamará a la función resetGame cuando se haga clic
resetButton.addEventListener("click", resetGame);

/* 10. Función personalizada que reinicia el juego */
function resetGame() {
  // Generamos un nuevo número aleatorio
  randomNumber = Math.floor(Math.random() * 100) + 1;

  // Limpiamos el array de intentos
  attempts = [];

  // Limpiamos la lista UL en el HTML
  guessHistory.innerHTML = "";

  // Limpiamos y ocultamos el mensaje
  message.style.display = "none";

  // Ocultamos el botón de reinicio
  hideResetButton();

  // Reactivamos el botón "Probar suerte"
  guessButton.disabled = false;

  // Limpiamos el campo input
  guessInput.value = "";
  // Colocamos el foco de nuevo en el input
  guessInput.focus();
}

/* 11. Al cargar la página, aseguramos que el botón de reinicio no se muestre */
hideResetButton();
