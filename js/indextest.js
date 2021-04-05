(async function() {
	const product = await getProducts()
  
	for (product of products) {
	  displayArticle(product)
	}
  })()
  
  function getProducts() {
	return fetch("http://localhost:3000/api/teddies")
	  .then(function(httpBodyResponse) {
		return httpBodyResponse.json()
	  })
	  .then(function(products) {
		return products
	  })
	  .catch(function(error) {
		alert(error)
	  })
  }
  
