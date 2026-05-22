const notas = []

function leerTexto() {

  const input1 = document.getElementById('input-1')
  const lista = document.getElementById('lista')

  const texto = input1.value.trim()

  if (texto !== "") {
//  ACA SE EMPUJAN LAS NOTAS DENTRO DE
//  LA VARIABLE TEXTO
    notas.push(texto)
// ACA SE GUARDA EN EL LOCAL STORAGE con
// SET ITEMS que guarda en un mini json
    localStorage.setItem(
      "notas",
      JSON.stringify(notas)
    )
    

    const li = document.createElement("li")

    li.textContent = texto

    lista.appendChild(li)

    input1.value = ''

  }
