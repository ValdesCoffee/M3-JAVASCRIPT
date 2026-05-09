let nombre = prompt("Ingrese su nombre :) : "); // Este pide el nombre
while (nombre === null || nombre.trim() === "") /* Bucle para comproba */{
    console.error("Error: Por favor, ingresa un nombre válido"); // Mensaje de error en consola si no es un número
    nombre = prompt("Por favor, ingrese un nombre válido: ");
}
let edadTexto = prompt("Ingrese su edad: "); // Pedir edad del usuario //
while (edadTexto === null || edadTexto.trim() === "" || isNaN(edadTexto)) //* Bucle para comprobar si es númerico o no */ 
{console.error("Error: Por favor, ingresa una edad válida en números"); // Mensaje de error en consola si no es un número
    edadTexto = prompt("Por favor, ingrese un número válido: "); // Vuelve a pedirle al usuario la edad hasta que ingrese un valor válido
}
const edad = Number(edadTexto); // Se convirte la edad a un valor number
if (edad < 18) /* Condicional que evalúa su grupo de edad*/ {
    alert(`Hola, ${nombre}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código!`); // Alerta si no lo es
} else {
    alert(`Hola, ${nombre}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación!`); // Alerta si lo es
}
// Muestra los numeros en consola ü
console.log(nombre);
console.log(edad);