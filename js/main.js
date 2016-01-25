$(document).ready(function(){

	var productSource   = $("#product-template").html();
	var productTemplate = Handlebars.compile(productSource);

	var cartSource   = $("#cart-template").html();
	var cartTemplate = Handlebars.compile(cartSource);

	// used to track live updates to cart based on user interaction
	var cart_order_updated  = [];

	// minicart starts with 0 items
	var cart_count = 0;
	
	// get product list from db.json
	var products = $.ajax( "/products" )
		.done(function(data) {
			$("#product-listing").html(productTemplate( { products: data } ));
		})
		.fail(function() {
			console.log( "error-cart" );
		});

	// get cart order from db.json -- initial state, on load
	var cart = $.ajax( "/cart_order" )
		.done(function(data) {
			$("#product-cart").html(cartTemplate({ cart_order: data } ));
		})
		.fail(function() {
			console.log( "error-cart" );
		});

	$("#product-listing").on("click", ".btn--addToCart", function(e){

		// get info for each selected product
		var productName = $(e.target).data('product-name');
		var productPrice = $(e.target).data('product-price');
		var productCount = $(e.target).attr('count');
		var productID = parseInt($(e.target).attr('id'));

		// increase productCount by 1
			// account for duplicates - WIP
		productCount = parseInt(productCount) + 1;

		// add info for each selected product to cart_order_updated array -- WIP
			// check for productID
				// if ID doesn't exist, add item
				cart_order_updated.push( { id: productID, name : productName, price : productPrice, count: productCount } );
				// if ID exists, increase count by 1
				// cart_order_updated.push( { count: productCount + 1 } );
		// console.log(cart_order_updated);
		
		// remove 'Cart is currently empty' copy
		$(".cart ul div").remove();

		// add list element for each selected product: display name, price, # of items
			// account for duplicates - WIP
		$(".cart ul").append("<li>" + productName + "</br>" + "Price: " + productPrice + "</br>" + "Selected: " + productCount + "</li>");


		// increment cart_count by 1 and display on page
		cart_count = cart_count + 1;
		$(".cart_count").html("Items: " + cart_count);

		// turn productPrice into int to faciliate 'Total Cost' changes in minicart
		var productPriceNum = parseInt( productPrice.replace('$', '') );
		
		// update based on total items in cart - WIP
		var totalPrice = productPriceNum * cart_count;
		$(".cart_total").html("Total Cost: $" + totalPrice);
	});


	//  --  TO DO  -- //

	// For Each Product in Cart 
		// Increment items
			// On btn--incrementCartCount click
				// get product.id
					// increment count by 1
					// increment cart price by product price
					// increment cart_order[] and increase count by 1
		// Decrement items 
			// On btn--decrementCartCount click
				// get product.id
					// decrement count by 1
					// decrement cart price by product price
					// decrement cart_order[] and decrease count by 1

	// Purchase
		// On .btn--submitCart click
			// verify product count
			// verify product cost
			// if not equal, recalculate and update

	// Maintain Cart State
		// POST cart_order_updated state to /cart_order in db.json

});
