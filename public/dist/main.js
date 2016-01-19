$(document).ready(function(){

	var productSource   = $("#product-template").html();
	var cartSource   = $("#cart-template").html();

	var productTemplate = Handlebars.compile(productSource);
	var cartTemplate = Handlebars.compile(cartSource);
	
	var products = $.ajax( "/products" )
		.done(function(data) {
			$("#product-listing").html(productTemplate({ products: data } ));
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

});