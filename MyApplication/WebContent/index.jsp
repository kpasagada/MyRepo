<!DOCTYPE html>
<%@page import="db.DbManager"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html lang="en" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=yes" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!--LINKS-->
        <link href="https://fonts.googleapis.com/css?family=Lato:100,300,300i,400" rel="stylesheet">        
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<title>Baby On Board | Landing</title>
    </head>
    
    <body>
    
	    <!-- Login Validation -->
	    <script type="text/javascript">
	    	var loginStatus;
		    var loginStatus = <%=session.getAttribute("loginStatus")%>;
		    var contextPath = "<%=request.getContextPath()%>";
	    </script>
	    
		<!-- Database Connection -->
		<%
			DbManager db = new DbManager();
			Connection conn = (Connection)db.getConnection();
		%>
	
		<!--HEADER SECTION -->
        <div class="header">
            <a href="bob.html"> <img src="images/baby.png" alt="logo" class="logo"> </a>
            <ul class="main-nav">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#work">How it works</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li id="logout-button" class="hide"><a href="/logout">Logout</a></li>
            </ul>
        </div>
        
        <!--LANDING PAGE-->
        <div class="home">
           <form id="login" name="loginform" action="LoginController" method="post" onsubmit="return loginValidate()" >
                 <h1 style="text-align:center;"><img class="human" src="images/human.png"/> <br><br>LOGIN</h1>
                 <input type="text" name="username" class="login" placeholder="Username">
                 <input type="password" name="password" class="login" placeholder="Password">
                 <button type="submit" class="login" name="submit" value="login">Login</button>
                 <h3 style="text-align:center;"> Forgot Your Password? <br><br></h3>
                 <button id="sign-up-button" type="button" class="button" style="padding: 0px 56px;" > Not a registered user yet? Sign Up!</button>
           </form>
           <form id="register" name="regform" action="LoginController" method="post" onsubmit="return regValidate()">
           	 <p id="incorrect-register" class="te-al-ce hide">Login details invalid, register to continue!</p>
             <h1 class="te-al-ce"><img class="human" src="images/human.png"/> <br><br>REGISTER</h1>
             <input type="text" name="name" class="register" placeholder="Full Name">
             <input type="text" name="email" class="register" placeholder="Email Address">
             <input type="number" name="phone" class="register" placeholder="Phone Number">
             <input type="text" name="username" class="register" placeholder="Username">
             <input type="password" name="password" class="register" placeholder="Password">
             <input type="password" name="retry-password" class="register" placeholder="Confirm Password">
             <button type="submit" name="submit" class="register" value="register">Register</button>
             <button id="login-button" type="button" class="button" style="padding: 15px 85px;" > Already registered? LOGIN</button>
           </form>
        </div>
        
        <!--AGE CATEGORY-->
        <div >
            <ul id="age-group-list" class="age">
                <h2>Choose a category</h2>
            </ul>
        </div>
        
        
        <!--SUBSCRIPTION MODEL-->
        <div id="subscription-container"> 
        </div>
        
        
        <!-- SUBSCRIPTION DURATION-->
         <div>            
            <ul class="subscription-duration">
                <h2> Choose the subscription Duration</h2>
                <div class="border"></div>
                <div class="duration_list">
	                <li>
	                  <button type="button" data-val="3" class="duration_button"> 03</button>  
	                </li>
	                <li>
	                   <button type="button" data-val="6" class="duration_button"> 06</button>
	                </li>
	                <li>
	                   <button type="button" data-val="9" class="duration_button"> 09</button>
	                </li>
	                <li>
	                    <button type="button" data-val="12" class="duration_button">12</button>
	                </li>
                </div>
            </ul>
        </div>
        
       	<!--  Proceed to checkout -->
       	<div class="checkout">
			<a href="checkout" class="checkout_btn">Checkout</a>
       	</div>
       
       
       <!--JAVA SCRIPTS -->
        <script type="text/javascript" src="js/index.js"></script>
    </body>
</html>
