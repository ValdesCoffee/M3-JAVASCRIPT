const notas = []
function leerTexto() {

  const input1 = document.getElementById('input-1')
  const lista = document.getElementById('lista')

  const texto = input1.value.trim()

  if (texto !== "") {
    const li = document.createElement("li")

    li.textContent = texto

    lista.appendChild(li)

    input1.value = ''

  }

}
