/* fetch de l'api pour test
fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(json => console.log(json))
*/
// fonction principale, auto appel (async) avec le () à la fin
(async () => {
  const products = await getProducts() //await : attend que la promesse soit résolu dans une fonction asynchrone
  hydratePage(products)
})()

async function getProducts() {
  return fetch("http://localhost:3000/api/teddies") //return du fetch
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((products) => (products))
    .catch((error) => {
      alert(
        "La connexion au serveur a échoué. Veuillez réessayer !"
      )
    })
}

function hydratePage(products) {
  // création de la fonction du hydratePage
  document.getElementById('productsList').innerHTML = ''
  
  // "méthode"boucle du tableau products suivi de la fonction "lien:https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array"
  // Méthode pour itérer sur un tableau en ayant accès à l'indice du tableau
  // displayProduct est la fonction appelé dans la boucle par une fonction de callback
  products.forEach((product) => { //la methode forEach permet d’itérer sur les propriétés d’un tableau
    displayProduct(product)
  })
}
function displayProduct(product) {
  // Get template
  
  const templateElt = document.querySelector('.product')

/* var node = document.importNode(externalNode, deep);
Clone template Le nouveau Node ou DocumentFragment à importer dans le document courant. 
Après l'importation, le nouveau parentNode du noeud est null, car il n'a pas encore été 
inséré dans l'arborescence du document.
deep
Une valeur booléenne qui indique s'il faut ou non importer la totalité de la sous-arborescence DOM provenant de externalNode. Si ce paramètre est true (vrai), alors externalNode et tous ses descendants sont copiés
*/  
  const cloneElt = document.importNode(templateElt.content, true)
  

  // Hydrate template
  cloneElt.getElementById('productImage').src = product.imageUrl
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
  cloneElt.getElementById('productDescription').textContent = product.description
  cloneElt.getElementById('productLink').href = `/frontend/products.html?id=${product._id}`
  
  // Display template
  document.getElementById('productsList').appendChild(cloneElt)
}


let date1 = new Date();

let dateFrance = date1.toLocaleString('fr-FR',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

document.getElementById('p1').innerHTML =  dateFrance;

