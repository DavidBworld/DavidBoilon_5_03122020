//fonction constructeur 
class CartObject {
  get products() { // avec get, la propriété sera définie sur le prototype de l'objet
    //La méthode getItem() de l'interface Storage renvoie la dernière valeur associée à la clé passée en paramètre.
    return JSON.parse(localStorage.getItem('shoppingCart') || '{}')
  }

  set products(products) {
    localStorage.setItem('shoppingCart', JSON.stringify(products))
  }

  addProduct(productObject) {
    //this.products assigns values to the object property and refers to the current object
    let products = this.products

    const productAlreadyInCarte = !!products[productObject._id] //!! return true (boolean) if the object isn't empty

    if (productAlreadyInCarte) {
      // Increase quantity
      products[productObject._id].quantity++
    } else {
      // Add product
      products[productObject._id] = {
        quantity: 1,
        ...productObject,//opérateur ... copie les propriétés énumérables propres d'un objet fourni sur l'objet nouvellement créé.
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
    this.products = products
  }

  getTotalPrice() {
    const products = this.products
    const totalPrice = Object.values(products).reduce((acc, curr) => { //La méthode Object.values() renvoie un tableau contenant les valeurs des propriétés propres énumérables d'un objet 
      return acc + (curr.price * curr.quantity) / 100    //La méthode reduce applique une fonction de call back avec un accumaateur et la valeur de l'élément courant actuellement manipulé dans le tableau.
    }, 0)
    return totalPrice
  }
}

const Cart = new CartObject() //new Cart instance


//Supprimer un contenu du local strage
/* function removeProduct(productId){
  let storageProducts = JSON.parse(localStorage.getItem('products'));
  let products = storageProducts.filter(product => product.productId !== productId );
  localStorage.setItem('products', JSON.stringify(products));
} */
//a)	Opérateur GET avec class CartObject

//Dans la fonction constructeur j’utilise l’opérateur get, comme propriété qui sera définie sur le prototype de l'objet dont j’applique la méthode JSON.parse() qui analyse la chaîne de caractères JSON et construit l'objet décrit par cette chaîne avec comme paramètre la méthode getItem() de l'interface Storage qui renvoie la valeur (‘shoppingCart’) à la clé passée en paramètre.

//b)	Opérateur set ajoute les valeurs et les méthodes sur le prototype

//Pour stocker les valeurs dans le local storage, j’utilise localStorage.setItem qui va l’ajouter ou mettre à jour avec le nom de la clé (‘shoppingCart) et sa valeur qui sera un ojbet javascript traité avec la méthode La méthode JSON.stringify()

//c)	Ajout de l’objet ou mise à jour par rapport à _id reçu

//const products correspond à l’objet courant qui retourne true lorsque l’objet n’est pas vide et si l’objet est déjà présent ajoute ++ sinon créer un nouvelle objet avec son _id

//d)	Méthode de production de l’_id et de sa quantité

//Faire référence à la propriété de l’objet et changer sa quantité en utilisant la méthode object.value qui créer un tableau sur lequel la méthode reduce le réduira à une seule valeur soit la quantité
