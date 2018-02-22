$(window).on('load', function() {

	// say hello
	console.log('Hello, Want to hire me? Go to: http://realhe.ro');

	// Deep BG effect.
	$("#rh-full-cover").interactive_bg({
		animationSpeed : "200ms",
		strength : 12,
	});
	
	// Add class for CSS preloader
	$('body').addClass( 'loaded' );
	
	$("body").on({
	    ontouchmove : function(e) {
	        e.preventDefault(); 
	    }
	});

});

// change background size on window resize
$(window).resize(function() {
	$("#rh-full-cover > .ibg-bg").css({
		width : $(window).outerWidth(),
		height : $(window).outerHeight()
	});
}); 