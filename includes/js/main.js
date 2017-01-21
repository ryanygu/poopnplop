jQuery(function($) {
	"use strict";

	$.validate();

	new WOW().init();
	//Variables
	var fixed_point = 0;
	var loaded = false;

	// Author Code Here
	$(window).load(function(){
		$('.owl-book').owlCarousel({
			singleItem:true,
			items:1,
			pagination:false,
			autoPlay:3000
		});
		$('.owl-reviews').owlCarousel({
			items:3,
			navigation:true,
			autoPlay:5000,
			navigationText: ["<i class='arrow_carrot-left'></i>","<i class='arrow_carrot-right'></i>"]
		});
		$('.main-nav').onePageNav({
			currentClass: 'active',
			changeHash: false,
			scrollSpeed: 400
		});
		$(".get-direction").tooltip({
		    direction: "top"
		});
		// Navbar "Breaking" Fix
		loaded = true;
		Adjust();
		$('.navbar').after("<div class='navbar-filler'></div>");
	});

	$(window).resize(function(){
		Adjust();
	});


	$(window).scroll(function(){

		//Following Navbar
		if!($(window).scrollTop() > fixed_point && loaded)
		{
			$('.navbar').addClass('nav-fixed');
			$('.navbar-filler').height($('.navbar').outerHeight(true));
		}
		else
		{
			//$('.navbar').removeClass('nav-fixed');
			$('.navbar-filler').height(0);
		}
	});
    
	function Adjust(){
		if($(window).width() > 768)
		{
			$('header').height($(window).height());
			$('.intro-book').css('top', ($('header').height() / 2 - $('.intro-book').height() / 2) + "px");
			$('.intro-text').css('top', ($('header').height() / 2 - $('.intro-text').height() / 2) + "px");
		}
		else {
			$('header').height(400);
		}
		if(!$('.navbar').hasClass("nav-fixed") && loaded)
			fixed_point = $('.navbar').offset().top;
	}
	
	$('.sample-button').click(function(event){
		$('#sample-form').slideDown();
		event.preventDefault();
	});

	$('form').submit(function(event){
		if($(this).find(".has-error").length > 0)
			return;
		event.preventDefault();
		var that = $(this),
			url = $(that).attr('action'),
			type = $(that).attr('method'),
			dataX = {};
			
		$(that).find("[name]").each(function(){
			dataX[$(this).attr("name")] = $(this).val();
		});

		$('.notification-box').addClass('active');

		$.ajax({
			type:'POST',
			url: url,
			data: dataX,
			success: function(response){
				$('.notification-box span').html(response);
					setTimeout(function(){
						$('.notification-box').removeClass('active');
						$('.notification-box span').html("Sending...");
					}, 4000);
				}
		});
	});

	// Mobile Nav
	$('.mobile-nav > ul').html($('.navbar-nav').html());
	$('.mobile-nav').append("<a href='#' class='close-btn'><i class='icon_close'></i></a>");

	$('.navbar-toggle').click(function(event){
		event.stopPropagation();
		$('#wrapper').addClass('behind');
		$('.mobile-nav').addClass('active');
	});
	$('.mobile-nav a.close-btn').click(function(event){
		$('#wrapper').removeClass('behind');
		$('.mobile-nav').removeClass('active');
		event.preventDefault();
	});
    
	// Scrolling
	$('a.scrollto').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $("[name='" + this.hash.slice(1) +"']");
			if (target.length) {
				$('#wrapper').removeClass('behind');
				$('.mobile-nav').removeClass('active');
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});

(function($) {
    "use strict";
	
	// Options for Message
	//----------------------------------------------
  var options = {
	  'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
	  'btn-success': '<i class="fa fa-check"></i>',
	  'btn-error': '<i class="fa fa-remove"></i>',
	  'msg-success': 'All Good! Redirecting...',
	  'msg-error': 'Wrong login credentials!',
	  'useAJAX': true,
  };

	// Login Form
	//----------------------------------------------
	// Validation
  $("#login-form").validate({
  	rules: {
      lg_username: "required",
  	  lg_password: "required",
    },
  	errorClass: "form-invalid"
  });
  
	// Form Submission
  $("#login-form").submit(function() {
  	remove_loading($(this));
		
		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));
		
		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });
	
	// Register Form
	//----------------------------------------------
	// Validation
  $("#register-form").validate({
  	rules: {
      reg_username: "required",
  	  reg_password: {
  			required: true,
  			minlength: 5
  		},
   		reg_password_confirm: {
  			required: true,
  			minlength: 5,
  			equalTo: "#register-form [name=reg_password]"
  		},
  		reg_email: {
  	    required: true,
  			email: true
  		},
  		reg_agree: "required",
    },
	  errorClass: "form-invalid",
	  errorPlacement: function( label, element ) {
	    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
    		element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
	    }
			else {
  	  	label.insertAfter( element ); // standard behaviour
  	  }
    }
  });

  // Form Submission
  $("#register-form").submit(function() {
  	remove_loading($(this));
		
		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));
		
		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Forgot Password Form
	//----------------------------------------------
	// Validation
  $("#forgot-password-form").validate({
  	rules: {
      fp_email: "required",
    },
  	errorClass: "form-invalid"
  });
  
	// Form Submission
  $("#forgot-password-form").submit(function() {
  	remove_loading($(this));
		
		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));
		
		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Loading
	//----------------------------------------------
  function remove_loading($form)
  {
  	$form.find('[type=submit]').removeClass('error success');
  	$form.find('.login-form-main-message').removeClass('show error success').html('');
  }

  function form_loading($form)
  {
    $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
  }
  
  function form_success($form)
  {
	  $form.find('[type=submit]').addClass('success').html(options['btn-success']);
	  $form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
  }

  function form_failed($form)
  {
  	$form.find('[type=submit]').addClass('error').html(options['btn-error']);
  	$form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
  }

	// Dummy Submit Form (Remove this)
	//----------------------------------------------
	// This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.
  function dummy_submit_form($form)
  {
  	if($form.valid())
  	{
  		form_loading($form);
  		
  		setTimeout(function() {
  			form_success($form);
  		}, 2000);
  	}
  }
	
})(jQuery);