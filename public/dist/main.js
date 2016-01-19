$(document).ready(function(){

	var productSource   = $("#product-template").html();
	var cartSource   = $("#cart-template").html();

	var productTemplate = Handlebars.compile(productSource);
	var cartTemplate = Handlebars.compile(cartSource);
	
	var products = $.ajax( "/products" )
		.done(function(data) {
			$("#product-listing").html(productTemplate( { products: data } ));
		})
		.fail(function() {
			console.log( "error-cart" );
		});

	var cart = $.ajax( "/cart_order" )
		.done(function(data) {
			$("#product-cart").html(cartTemplate({ cart_order: data } ));
		})
		.fail(function() {
			console.log( "error-cart" );
		});


	// On .btn--addToCart click
		// get product.id 
			// add product.name to cart and increase count by 1
			// add product.id to cart_order[] and increase count by 1

	$(".shopping-container").on("click", ".btn--addToCart", function(e){
		console.log( "success", products );

		// push each data set ID and count to cart_order
		// add product to cart-template and update cart price
	});


	// For each product in cart 
		// On btn--incrementCartCount click
			// get product.id
				// increment count by 1
				// increment cart price by product price
				// increment cart_order[] and increase count by 1
		// On btn--decrementCartCount click
			// get product.id
				// decrement count by 1
				// decrement cart price by product price
				// decrement cart_order[] and decrease count by 1

	// On .btn--submitCart click
		// for each product in cart
			// calculate product.price * count
				// add each product price calculation 
				// check total is same as cart price
					// if same, direct user to payment portal

});




