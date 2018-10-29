/**
 *  Functions for index page
 */
	
(function() {
	
	var age_groups, subscriptions, selected_age_group = 1, selected_subscription = -1, selected_duration = -1;
	
	/*
	 *  Popup message rendering 
	 */
	function showPopupMessage(type, message){
		var messageElement = document.getElementById("pop-up-message");
		messageElement.classList.add(type);
		messageElement.innerHTML = message;
		messageElement.classList.add("visible");
		
		setTimeout(function(){
			messageElement.classList.remove("visible");
			messageElement.classList.remove(type);
		}, 4000);
	}
	
	/*
	 * Validates registration form
	 */
	function regValidate(e) {
	
		var username = document.forms["regform"]["username"].value;
		var password = document.forms["regform"]["password"].value;
		var rpassword = document.forms["regform"]["retry-password"].value;
		var name = document.forms["regform"]["name"].value;
		var email = document.forms["regform"]["email"].value;
		var phone = document.forms["regform"]["phone"].value;
		
		var emailLegalReg =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var phoneReg = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		
		localStorage.clear();
		
		if (username == "") {
			e.preventDefault();
	        e.stopPropagation();
	        showPopupMessage("error", "Username must be filled out");
	        document.forms["regform"]["username"].focus();
	    }else if (password== "") {
	        e.preventDefault();
	        e.stopPropagation();
	        showPopupMessage("error", "Password must be filled out");
	        document.forms["regform"]["password"].focus();
	    }else if (rpassword == "") {
	        e.preventDefault();
	        e.stopPropagation();
	        showPopupMessage("error", "Confirm Password must be filled out");
	        document.forms["regform"]["retry-password"].focus();
	    }else if (name == "") {
	        e.preventDefault();
	        e.stopPropagation();
	        showPopupMessage("error", "Full Name must be filled out");
	        document.forms["regform"]["name"].focus();
	    }else if (email == "") {
	        e.preventDefault();
	        e.stopPropagation();
	        showPopupMessage("error", "Email must be filled out");
	        document.forms["regform"]["email"].focus();
	    }else if(!emailLegalReg.test(email)){
	    	 e.preventDefault();
		        e.stopPropagation();
		        showPopupMessage("error", "Please enter a valid email id");
		        document.forms["regform"]["email"].focus();
	    }else if(phone == "") {
	        e.preventDefault();
	        e.stopPropagation();
	        showPopupMessage("error", "Phone must be filled out");
	        document.forms["regform"]["phone"].focus();
	    }else if(!phoneReg.test(phone)) {
	        e.preventDefault();
	        e.stopPropagation();
	        showPopupMessage("error", "Phone number is invalid");
	        document.forms["regform"]["phone"].focus();
	    }else if(password != rpassword){
	    	e.preventDefault();
	        e.stopPropagation();
	    	showPopupMessage("error", "Passwords do not match");
	        document.forms["regform"]["password"].focus();
	    }
	}
	
	/*
	 * Validates login form
	 */
	function loginValidate(e){
		var username = document.forms["loginform"]["username"].value;
		var password = document.forms["loginform"]["password"].value;
		
		localStorage.clear();
		
		if (username == "") {
			e.preventDefault();
	        e.stopPropagation();
			showPopupMessage("error", "Username must be filled out");
	        document.forms["loginform"]["username"].focus();
	    }else if (password== "") {
	    	e.preventDefault();
	        e.stopPropagation();
	    	showPopupMessage("error", "Password must be filled out");
	        document.forms["loginform"]["password"].focus();
	    }
	}
	
	/*
	 * Hides login form and shows register form
	 */
	function register(failed) {
		
		document.getElementById("login").style.display="none";
		document.getElementById("register").style.display="inline";
		if(failed == true){
			var incorrect_register_element = document.getElementById("incorrect-register");
			incorrect_register_element.classList.remove("hide");
		}
	}
	
	/*
	 *  Hides register form and shows login form
	 */
	function login() {
		document.getElementById("login").style.display="inline";
		document.getElementById("register").style.display="none";
	}
	
	/*
	 * Success handler for load age groups 
	 */
	function loadAgeGroupsSuccessHandler(response){
		
		response = JSON.parse(response);
		// Sorting by ids
		response.sort(function(a, b){return a['id'] - b['id']});
		age_groups = response;
		
		// Framing html string to append to age groups container 
		var age_group_string = "";
		
		for (var i = 0; i < response.length; i++){
		    var age_group_object = response[i];
		    age_group_string += '<li class="' + (age_group_object['id'] == selected_age_group? 'selected-age':'')  + '" data-id="' + age_group_object['id'] + '">'
	        					+ '<button type="button" class="age_border pointer"><img class="box-age" alt="' + age_group_object['name'] + '" src="images/' + age_group_object['name'].replace(" ","").trim().toLowerCase() + '.jpg"></button>'
	        					+ '<p class="size"><br> ' + age_group_object['name'] + '</p>'
	        					+ '</li>';
		    
		}
		
		var age_group_list_element = document.getElementById("age-group-list");
		age_group_list_element.innerHTML += age_group_string;
		
		// Selecting an age group with click
		age_group_list_element.addEventListener("click", function(e){
			if(e.target && (e.target.tagName == "IMG" || e.target.tagName == "BUTTON")){
				age_group_list_element.getElementsByClassName("selected-age")[0].classList.remove("selected-age");
				
				var parentNode;
				if(e.target.parentNode.tagName == "LI"){
					parentNode = e.target.parentNode;
				}
				
				if(e.target.parentNode.parentNode.tagName == "LI"){
					parentNode = e.target.parentNode.parentNode;
				}
				
				parentNode.classList.add("selected-age");
				selected_age_group = parentNode.getAttribute("data-id");
			
				
				var inner_sub_elements = document.getElementsByClassName("inner-subscription-container");
				
				for(var k = 0; k < inner_sub_elements.length; k++){
					if(inner_sub_elements[k].getAttribute("data-age") == selected_age_group){
						inner_sub_elements[k].classList.remove("hide");
					}
					else{
						inner_sub_elements[k].classList.add("hide");
					}
				}
				
				if(document.getElementsByClassName("sub-selected").length){
					document.getElementsByClassName("sub-selected")[0].classList.remove("sub-selected");
				}
				selected_subscription = -1;
			}
		});
		
		loadPredefinedSubscriptions();
	};
	
	/*
	 *  Fetch age group by id
	 */
	function getAgeGroupById(id){
		for(var i = 0; i < age_groups.length; i++){
			if(age_groups[i]['id'] == id){
				return age_groups[i]['name'];
			}
		}
		
		return "";
	}
	
	/*
	 * Fetches age groups from the database
	 */
	function loadAgeGroups(){
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	            loadAgeGroupsSuccessHandler(this.responseText);
	        }
	    };
	    
	    xhttp.open("GET", "AgeGroups", true);
	    xhttp.send(); 
	}
	
	/*
	 *  Success handler for predefined subscriptions
	 */
	function loadPredefinedSubscriptionsSuccessHandler(response){
		
		var subscription_desc = {
			'premium': ["High-grade products", "Free Home Delivery", "24/7 Customer service"],
			'standard': ["Conventional products", "Home Delivery within a week", "24/7 Customer service"],
			'economical': ["Quality budget-friendly products", "Home Delivery at $5", "24/7 Customer service"]
		};
		
		response = JSON.parse(response);
		
		response.sort(function(a, b){return a['ageGroup'] - b['ageGroup']});
		subscriptions = response;
		
		var subscription_list_string = "";
		var age_group_visited = [];
		
		for (var i = 0; i < response.length; i++){
			var sub_object = response[i];
			var sub_total = 0;
			var sub_age_group_name = getAgeGroupById(sub_object['ageGroup']);
			
			for(var j = 0; j < sub_object['products'].length; j++){
				sub_total += sub_object['products'][j].price * sub_object['products'][j].amount; 
			}
			
			subscriptions[i]['price'] = sub_total;
			
			if(i%3 == 0){
				var hide_val = sub_object['ageGroup'] == selected_age_group ? 'inner-subscription-container':'inner-subscription-container hide';
				subscription_list_string += '<div class="' + hide_val + '" data-age="' + sub_object['ageGroup'] + '">' +
											'<ul class="subscription">' +
											'<h2>Choose a subscription for ' + sub_age_group_name.replace(" ","") + '</h2>' +
											'<div class="border"></div>';
			}
			
			subscription_list_string += '<div class="subscription-box">' +        			
										'<ul class="card" data-id="' + sub_object['id'] + '">' +
										'<li><h3>' + sub_object['name'].toUpperCase() + '</h3></li><br>' +
										'<li class="border1"></li>' +
										'<li><h3 class="price">$' + sub_total + ' </h3><span>/ pack</span></li><br>' +
										'<li>' + subscription_desc[sub_object['name'].toLowerCase()][0] + '</li><br>' +
										'<li>' + subscription_desc[sub_object['name'].toLowerCase()][1] + '</li><br>' +
										'<li>' + subscription_desc[sub_object['name'].toLowerCase()][2] + '</li><br>' +
										'<li>' + sub_object['products'].length + ' Product package</li><br>' + 
										'<li><button type="button" class="subscription_button pointer">SELECT</button></li>'+
										'<li><button type="button" class="addToCart_button pointer">ADD TO CART</button></li>'+
										'</ul>' +
										'</div>';
			
			if(i%3 == 2){
				age_group_visited.push(sub_object['ageGroup']);
				subscription_list_string += '</ul></div>';
			}
		}
		
		var subscription_list_element = document.getElementById("subscription-container");
		subscription_list_element.innerHTML = subscription_list_string;
		
		// Event handler for subscription select action
		var subscription_buttons = document.getElementsByClassName("subscription_button");
		
		for(var l = 0; l < subscription_buttons.length; l++){
			subscription_buttons[l].addEventListener("click", function(e){
				if(e.target && e.target.tagName == "BUTTON"){
					if(document.getElementsByClassName("sub-selected").length){
						document.getElementsByClassName("sub-selected")[0].classList.removes("sub-selected");
					}
					e.target.parentNode.parentNode.classList.add("sub-selected");
					selected_subscription = e.target.parentNode.parentNode.getAttribute("data-id");
				}
			});
		}
		
		// Event handler for add to cart action
		var cart_buttons = document.getElementsByClassName("addToCart_button");
		for(var l = 0; l < cart_buttons.length; l++){
			cart_buttons[l].addEventListener("click", function(e){
				if(e.target && e.target.tagName == "BUTTON"){
					var sub_id = e.target.parentNode.parentNode.getAttribute("data-id");						
					
					if(typeof(Storage) !== "undefined"){
						
						if(localStorage.getItem("cartItems") == null){
							localStorage.setItem("cartItems", JSON.stringify([]));
						}
						
						var cart = JSON.parse(localStorage.getItem("cartItems"));
						
						// Check if cart already has subscription
						var found = 0;
						for(var m = 0; m < cart.length; m++){
							if(cart[m].sub_id == sub_id){
								cart[m].quantity += 1;
								
								// Find subscription to get price
								for(var i=0; i < subscriptions.length; i++){
									if(subscriptions[i].id == sub_id){
										cart[m].price = subscriptions[i].price * cart[m].quantity;
										break;
									}
								}
								found = 1;
								break;
							}
						}
						
						// If subscription found in cart, update session variable and cart display
						if(found == 1){
							localStorage.setItem("cartItems", JSON.stringify(cart));
							renderCartDisplay();
						}
						else{
							var cart_object = {};
							
							// Get the subscription details and age group information and create a cart item
							for(var i=0; i < subscriptions.length; i++){
								if(subscriptions[i].id == sub_id){
									
									cart_object.age_group_id = subscriptions[i].ageGroup;
									cart_object.sub_id = subscriptions[i].id;
									cart_object.sub_name = subscriptions[i].name;
									cart_object.quantity = 1;
									cart_object.price = subscriptions[i].price * cart_object.quantity;
									
									for(var k = 0; k < age_groups.length; k++){
										if(age_groups[k].id == subscriptions[i].ageGroup){
											cart_object.age_group_name = age_groups[k].name;
											break;
										}
									}
									break;	
								}
							}
							
							// Add cart item to session variable and update display
				            addToCartSession(cart_object);
				            renderCartDisplay();
						}
					}
				}
			});
		}
	}
	
	/*
	 * 	Add subscription to cart in session storage
	 */
	function addToCartSession(cart_object){
		
		// Check if session storage is supported by browser
		if(typeof(Storage) !== "undefined"){
			
			var cart = JSON.parse(localStorage.getItem("cartItems"));
			cart.push(cart_object);
			localStorage.setItem("cartItems", JSON.stringify(cart));
		}
	}
	
	/*
	 *  Update cart model in UI
	 */
	function renderCartDisplay(){
		
		if(typeof(Storage) !== "undefined") {
			
			var cart_session_items = localStorage.getItem("cartItems");
			
			if(cart_session_items == null){
				return;
			}
			
			var cart = JSON.parse(cart_session_items);
			var cart_string = "";
			
			for(var p = 0; p < cart.length; p++){
				cart_string += '<tr><td>' + (p+1) + '</td>'
							+ '<td>' + cart[p].age_group_name + '</td>'
							+ '<td>' + cart[p].sub_name + '</td>'
							+ '<td>' + cart[p].quantity + '</td>'
							+ '<td>' + Number(cart[p].price).toFixed(2) + '</td>'
							+ '<td><button class="delete_cart" data-sub-id="' + cart[p].sub_id + '">Delete</button></td></tr>';
			}
			cart_string += '</tr>';
			
			document.getElementById("cart-table1").innerHTML = cart_string;
			
			// Update cart item count
			document.getElementById("cart-count").innerHTML = cart.length;
			
			// Delete from cart event listeners
			var cart_delete_buttons = document.getElementById("cart-table1").getElementsByClassName("delete_cart");
			
			for(var l = 0; l < cart_delete_buttons.length; l++){
				cart_delete_buttons[l].addEventListener("click", function(e){
					
					var sub_id = e.target.getAttribute("data-sub-id");
					var cart = JSON.parse(localStorage.getItem("cartItems"));
					
					for(var p = 0; p < cart.length; p++){
						if(cart[p].sub_id == sub_id){
							cart.splice(p,1);
						}
					}
					
					localStorage.setItem("cartItems", JSON.stringify(cart));
					renderCartDisplay();
				});
			}
		}
	}
	
	/*
	 * 	Add event handlers to cart
	 */
	function initializeCartEvents(){
		var modal = document.getElementById('cart-modal');

		// Get the button that opens the modal
		var btn = document.getElementById("cart_btn");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
		
		// When the user clicks the button, open the modal 
		btn.addEventListener("click", function(){			
			modal.style.display = "block";
		});
		   
		// When the user clicks on <span> (x), close the modal
		span.addEventListener("click", function(){	
			modal.style.display = "none";
		});
		
		// When the user clicks anywhere outside of the modal, close it
		window.addEventListener("click", function(event){
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		});
		
	}
	
	/*
	 *  Fetches predefined subscription data
	 */
	function loadPredefinedSubscriptions(){
		var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (this.readyState == 4 && this.status == 200) {
	        	loadPredefinedSubscriptionsSuccessHandler(this.responseText);
	        }
	    };
	    
	    xhttp.open("GET", "PredefinedSubscriptions", true);
	    xhttp.send();
	}
	
	/*
	 *  Subscription duration event listeners
	 */
	function addSubscriptionDurationEventListeners(){
		var duration_elements = document.getElementsByClassName("duration_button");
		
		for(var m = 0; m < duration_elements.length; m++){
			duration_elements[m].addEventListener("click", function(e){
				if(e.target && e.target.tagName == "BUTTON"){
					if(document.getElementsByClassName("selected-dur").length){
						document.getElementsByClassName("selected-dur")[0].classList.remove("selected-dur");
					}	
					e.target.classList.add("selected-dur");
					selected_duration = e.target.getAttribute("data-val");
				}
			});
		}
	}
	
	/*
	 *  Proceed to Cart checkout
	 */
	function proceedToCartCheckout(){
		if(localStorage.getItem("cartItems") == null){
			showPopupMessage("error", "Add items to cart before checkout!");
			return;
		}
		
		var cart = JSON.parse(localStorage.getItem("cartItems"));

		if(cart.length == 0){
			showPopupMessage("error", "Add items to cart before checkout!");
			return;
		}
		
		var checkout_url =  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + contextPath + "/checkout?type=cart";
		window.location.href = checkout_url;
	}
	
	/*
	 *  Proceed to checkout
	 */
	function proceedToCheckout(){
		
		if(loginStatus == false){
			showPopupMessage("error", "Login to proceed to checkout!");
			return;	
		}
		
		if(selected_subscription == -1 || selected_duration == -1 || selected_age_group == -1){
			showPopupMessage("error", "Select an age group, subscription and duration before checkout!");
			return;
		}
		
		var checkout_url =  window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + contextPath + "/checkout?age=" + selected_age_group + "&sub=" + selected_subscription + "&dur=" + selected_duration;
		window.location.href = checkout_url;
	}
	
	/*
	 *  Function to initialize all event listeners 
	 */
	function initEventListeners(){
		document.getElementById("login").addEventListener("submit", function(e){ loginValidate(e);});
		document.getElementById("register").addEventListener("submit", function(e){ regValidate(e);});
		document.getElementById("login-button").addEventListener("click", login);
		document.getElementById("sign-up-button").addEventListener("click", register);
		document.getElementsByClassName("checkout_btn")[0].addEventListener("click", proceedToCheckout);
		document.getElementsByClassName("cartCheckout_btn")[0].addEventListener("click", proceedToCartCheckout);
		
		initializeCartEvents();
		addSubscriptionDurationEventListeners();
	}
	
	/*
	 *  Initializing the Index page
	 */
	function initIndex(){
		if(loginStatus == true){
			document.getElementsByClassName("home")[0].style.display="none";
			document.getElementById("user-button").classList.remove("hide");
			document.getElementById("cart_btn").classList.remove("hide");
		}
		else if(loginStatus == false){
			register(true);
		}
		
		//Setting logout path
		var logoutPath = contextPath + "/logout";
		var indexPath = contextPath + "/index";
		var transactionPath = contextPath + "/transactionHistory";
		var userPath = contextPath + "/userProfile";
	    
	    document.getElementById("logout_button").setAttribute("href", logoutPath);
	    document.getElementById("transaction").setAttribute("href", transactionPath);
	    document.getElementById("logo-link").setAttribute("href", indexPath);
	    document.getElementById("user_profile").setAttribute("href", userPath);
	    
	    loadAgeGroups();
	    renderCartDisplay();
	    initEventListeners();
	}
	
	/*
	 *  Function call to initialize the index page
	 */
	initIndex();

})();