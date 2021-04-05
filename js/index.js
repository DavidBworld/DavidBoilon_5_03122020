// fonction principale, auto appel (async)
(async () => {
  const products = await getProducts()
  hydratePage(products)
})()

async function getProducts() {
  return fetch("http://localhost:3000/api/teddies")
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((products) => (products))
    .catch((error) => {
      alert(
        "La connexion au serveur n'a pas pu être effectué. Cela est certainement lié à l'endormissement du serveur Heroku, veuillez attendre quelques secondes le temps qu'il sorte de son lit puis réesayez"
      )
    })
}

function hydratePage(products) {
  // création de la fonction du hydratePage
  document.getElementById('productsList').innerHTML = ''

  // boucle pour afficher tous les produits
  products.forEach((product) => {
    displayProduct(product)
  })
}
function displayProduct(product) {
  // Get template
  const templateElt = document.getElementById('product')

  // Clone template
  const cloneElt = document.importNode(templateElt.content, true)

  // Hydrate template
  cloneElt.getElementById('productImage').src = product.imageUrl
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  cloneElt.getElementById('productDescription').textContent = product.description
  cloneElt.getElementById('productLink').href = `/products.html?id=${product._id}`

  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}

