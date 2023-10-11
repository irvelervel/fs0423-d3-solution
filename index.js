const renderBooks = function (books) {
  // a questo punto genero i books per la pagina
  books.forEach((book) => {
    // cosa faccio per ogni book?
    // creo una colonna vuota
    const newCol = document.createElement('div') // div vuoto
    newCol.classList.add('col', 'col-4') // lo rende una vera e propria colonna
    // creo una card
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.style.height = '580px'
    newCard.innerHTML = `
        <img src="${book.img}" class="card-img-top" alt="${book.title}">
        <div class="card-body d-flex flex-column justify-content-between">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">${book.price}</p>
            <button class="btn btn-primary" onclick="deleteMe(event)">Scarta</button>
            <button class="btn btn-success" onclick="addToCart(event)">Add to cart</button>
        </div>
    `
    // appendere la card alla col
    newCol.appendChild(newCard)
    // -> prendo un riferimento alla row
    const row = document.getElementById('books-wall')
    // ci manca solo da appendere la col alla row
    row.appendChild(newCol)
  })
}

const addToCart = function (e) {
  // qui dentro dobbiamo risalire al titolo del libro che faceva parte della card di cui abbiamo cliccato il bottone success
  console.log(e.target.parentElement.querySelector('h5').innerText)
  // mi salvo il titolo in una variabile
  const bookTitle = e.target.parentElement.querySelector('h5').innerText
  // troviamo un riferimento alla ul vuota del carrello
  const cartUl = document.getElementById('cart')
  const newLi = document.createElement('li') // <li></li>
  newLi.innerText = bookTitle
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('btn', 'btn-danger')
  deleteButton.innerText = 'Rimuovi'
  deleteButton.addEventListener('click', function (e) {
    const liToRemove = e.target.parentElement
    liToRemove.remove()
  })
  newLi.appendChild(deleteButton)
  cartUl.appendChild(newLi)
}

const deleteMe = function (e) {
  console.log('elimino!', e.target.closest('.col'))
  // il metodo closest() trova il match più vicino tra l'elemento su cui lo chiamate e il selettore CSS che inserite tra le ()
  // risalendo il dom
  e.target.closest('.col').remove()
}

// recuperiamo i libri dall'endpoint fornito
fetch('https://striveschool-api.herokuapp.com/books')
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Problema contattando il server :(')
    }
  })
  .then((data) => {
    console.log(data)
    renderBooks(data)
  })
  .catch((err) => {
    console.log('ERRORE!', err)
  })
