;(() => {
  const productsInShoppingCart = Cart.products
  if (productsInShoppingCart === null) return
  hydratePage(productsInShoppingCart)
})()

function hydratePage(productsInShoppingCart) {
  // Set total price
  document.getElementById('totalPrice').textContent = Cart.getTotalPrice() + '.00€'

  // Loop over all products and displays them
  const productList = Object.values(productsInShoppingCart) //La méthode Object.values() renvoie un tableau contenant les valeurs des propriétés
  productList.forEach((product) => {
    displayProduct(product)
  })

  addEventListeners()
}

function displayProduct(product) {
  // Get & clone template
  const templateElt = document.getElementById('productTemplate')
  const cloneElt = document.importNode(templateElt.content, true)

  // Hydrate template
  cloneElt.getElementById('productImage').src = product.imageUrl
  cloneElt.getElementById('productName').textContent = product.name
  cloneElt.getElementById('productQuantity').selectedIndex = product.quantity - 1
  cloneElt.getElementById('productPrice').textContent = product.price / 100 + '.00€'
  cloneElt.getElementById('productTotalPrice').textContent =
    (product.price * product.quantity) / 100 + '.00€'

  // Add events
  cloneElt.getElementById('productQuantity').onchange = (e) => {
    e.preventDefault() //doesn't prevent the event from spreading

    Cart.updateProductQuantity(product._id, e.target.selectedIndex + 1)

    // Update product total price
    const totalPriceElt = e.target.parentElement.parentElement.parentElement.querySelector(
      '#productTotalPrice'
    )
    const newPrice = (product.price * Cart.getProductQuantity(product._id)) / 100 + '.00€'
    totalPriceElt.textContent = newPrice

    // Update all products total price
    document.getElementById('totalPrice').textContent = Cart.getTotalPrice() + '.00€'
  }

  // Display template
  document.getElementById('productsList').prepend(cloneElt)
}
//clear the basket
/* const buttonClearBASKET = document.getElementById("clearBasket");
buttonClearBASKET.addEventListener("click", () => {
    clearBasket();
    location.reload();
}); */
//send order
function addEventListeners() {
  // Purchase button
  document.getElementById('confirmPurchase').onclick = (e) => {
    e.preventDefault() //won't reload the page if don't validate
    sendOrder()
  }

  // Input validity
  watchValidity(document.getElementById('firstname'), (e) => e.target.value.length > 1) //The target event property returns the item that raised the event.
  watchValidity(document.getElementById('lastname'), (e) => e.target.value.length > 1)
  watchValidity(document.getElementById('email'), (e) => {
    const emailRegex = /^[a-zA-Z0-9]+(.[\w]+)*@[\w]+(.[\w]+)*(\.[a-z]{2,4})$/
    return emailRegex.test(e.target.value)
  })
  watchValidity(document.getElementById('adress'), (e) => e.target.value.length > 6)
  watchValidity(document.getElementById('zipcode'), (e) => {
    const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/
    return zipcodeRegex.test(e.target.value) //methode test return true or false
  })
  watchValidity(document.getElementById('city'), (e) => e.target.value.length > 1)
}

function watchValidity(elt, condition) {
  elt.oninput = (e) => {  //oninput execute a JavaScript when a user writes something in an <input> field
    if (condition(e)) {
      validInputElt(e.target)
    } else {
      neutralInputElt(e.target)
    }
  }

  elt.onblur = (e) => {
    if (!condition(e)) {
      invalidInputElt(e.target)
    }
  }
}

function validInputElt(elt) {
  elt.style.border = 'solid 1px green'
  elt.style.boxShadow = '#00800066 0px 0px 4px'
}

function invalidInputElt(elt) {
  elt.style.border = 'solid 1px red'
  elt.style.boxShadow = 'rgba(128, 0, 0, 0.4) 0px 0px 4px'
}

function neutralInputElt(elt) {
  elt.style.border = ''
  elt.style.boxShadow = ''
}

function sendOrder() {
  const firstname = document.getElementById('firstname').value
  const lastname = document.getElementById('lastname').value
  const adress = document.getElementById('adress').value
  const zipcode = document.getElementById('zipcode').value
  const email = document.getElementById('email').value
  const city = document.getElementById('city').value
  
  const emailRegex = /^[a-zA-Z0-9]+(.[\w]+)*@[\w]+(.[\w]+)*(\.[a-z]{2,4})$/ //ne pas utiliser / comme délimiteur pour le travail sur les url
  const zipcodeRegex = /[0-9]{5}(-[0-9]{4})?/  
  const firstnameRegex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/
  const lastnameRegex = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/
  const adressRegex = /^[a-zA-Z0-9]{0,50}/
  const cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
  //+ quantifieur entre 1 et infinité  * entre 0 et infinté  -- ? entre 0 et 1
    //{5,} entre 5 et l'infini {5,8} entre 5 et 8
    //
  if (!(
    firstnameRegex.test(firstname)
    && lastnameRegex.test(lastname)
    && emailRegex.test(email) //La méthode test() vérifie s'il y a une correspondance entre un texte et une expression rationnelle. Elle retourne true en cas de succès et false dans le cas contraire.
    && adressRegex.test(adress)
    && zipcodeRegex.test(zipcode)
    && cityRegex.test(city)
  )) {
    alert("Veuillez remplir les champs correctements avant de confirmer la commande")
    return
  }

  const products = Object.values(Cart.products).map((product) => { //map crée un nouveau tableau
    return product._id
  })

  const order = {
    contact: {
      firstName: firstname,
      lastName: lastname,
      address: adress + ' ' + zipcode,
      city: city,
      email: email,
    },
    products: products,
  }

  const requestOptions = {
    method: 'POST',  // Ajoute des données dans le coeur de la requête
    body: JSON.stringify(order), //le contenu de la requête est dans le body converti en Json.stringify
    headers: { 'Content-Type': 'application/json; charset=utf-8' }, // précise les données envoyés au serveur avec sa valeurapplication/json
  }

  fetch(`http://localhost:3000/api/teddies/order`, requestOptions)
    .then((response) => response.json())
    .then((json) => {
      localStorage.removeItem('shoppingCart') //La méthode removeItem() de l'interface Storage , lorsque vous lui passez une clé en argument, va supprimer la ressource avec le nom de clé correspondant du storage
      window.location.href = `/frontend/order.html?orderId=${json.orderId}`
    })
    .catch(() => {
      alert(error)
    })
}
hamburger.onclick = () => {
  hamburger.classList.toggle("open");
  navUl.classList.toggle("slide");
}
