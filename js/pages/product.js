// Main function, auto executed at load time
(async () => {
    const productId = getProductId()
    console.log(productId);
    const productData = await getProductData(productId)
    console.log(productData);
    hydratePage(productData)
})()

function getProductId() {
    return new URLSearchParams(window.location.search).get('id')
}
async function getProductData(productId) {
    return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .catch((error) => {
      console.log(error)
    })
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData)
}
  
function hydratePage(product) {
    // Hydrate page with data
    document.getElementById('productImage').src = product.imageUrl
    document.getElementById('productName').textContent = product.name
    document.getElementById('productPrice').textContent = `${product.price / 100}.00 €`
    document.getElementById('productDescription').textContent = product.description
    document.getElementById('productColors').style.gridTemplateColumns = `repeat(${product.colors.length}, 1fr)`
  
    // Add event listeners on button
    document.getElementById('addToCart').onclick = (event) => {
      event.preventDefault()
      Cart.addProduct(product)
      redirectToShoppingCart(product.name)
    }
    // Get parent element
    const colorsElt = document.getElementById('productColors')
  
    // Display all colors
    product.colors.forEach((color) => {
      // Get & clone template for one color
      const templateElt = document.getElementById('productColor')
      const cloneElt = document.importNode(templateElt.content, true)
      if (color === "Pale brown"){
        color = '#987654'
      }else if (color === "Dark brown"){
        color = '#654321'
      }
      // Hydrate color clone
      cloneElt.querySelector('div').style.backgroundColor = color
  
      // Display a new color
      colorsElt.appendChild(cloneElt)
    })
}
//fonction constructeur
class CartObject {
    get products() {
      //La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre.
      return JSON.parse(localStorage.getItem('shoppingCart') || '{}')
    }
  
    set products(products) {
      localStorage.setItem('shoppingCart', JSON.stringify(products))
    }
  
    addProduct(productObject) {
      let products = this.products
  
      const productAlreadyInCarte = !!products[productObject._id]
  
      if (productAlreadyInCarte) {
        // Increase quantity
        products[productObject._id].quantity++
      } else {
        // Add product
        products[productObject._id] = {
          quantity: 1,
          ...productObject,
        }
      }
  
      this.products = products
    }
  
    getProductQuantity(productId) {
      const products = this.products
      return products[productId].quantity
    }
  
    updateProductQuantity(productId, quantity) {
      const products = this.products
      products[productId].quantity = quantity
      console.log(products)
      this.products = products
    }
  
    getTotalPrice() {
      const products = this.products
      const totalPrice = Object.values(products).reduce((acc, curr) => {
        return acc + (curr.price * curr.quantity) / 100
      }, 0)
      return totalPrice
    }
}
  
const Cart = new CartObject()
console.log(Cart);

function redirectToShoppingCart(productName) {
window.location.href = `/frontend/cart.html?lastAddedProductName=${productName}`
} 

// Get the modal
var modal = document.getElementById('myModal');
 
// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = document.getElementsByClassName('myImg')[0];
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function(){
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}
 
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
 
// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none";
}
//event add to card
document.addEventListener("DOMContentLoaded", function(event) {
    const cartButtons = document.querySelectorAll('.cart-button');
    cartButtons.forEach(button => {
    button.addEventListener('click',cartClick);
    });
    function cartClick(){
    let button =this;
    button.classList.add('clicked');
    }
});
//Hamburger
hamburger.onclick = () => {
    hamburger.classList.toggle("open");
    navUl.classList.toggle("slide");
} //Propriété classList avec toggle comme mééthode( String [, force] )
//Si un seul argument est présent : change la présence d'une classe dans la liste. Si la classe existe, alors la supprime et renvoie false, dans le cas inverse, ajoute cette classe et retourne true.

//fonction timer
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    //La méthode setInterval () appelle une fonction ou évalue une expression à des intervalles spécifiés (en millisecondes).
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
window.onload = function () {
    var sixtyMinutes = 60 * 60,
        display = document.querySelector('#timer');
    startTimer(sixtyMinutes, display);
};
