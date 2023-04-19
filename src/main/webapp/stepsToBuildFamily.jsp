<!DOCTYPE html>
<html lang="en">
<head>
<title>stepsToBuildFamily</title>
    <link rel="stylesheet" href="includes/css/frames.css" type="text/css"></link>
    <link rel="stylesheet" href="includes/css/style.css" type="text/css"></link>
    <script type="text/javascript" src="includes/js/mainPage.js"></script>
    <script type="text/javascript" src="includes/js/restAjax.js"></script>
    <link rel="stylesheet" href="includes/css/scrollNav.css" type="text/css"></link>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="includes/js/globalFunctions.js"></script>	
    <script type="text/javascript" src="includes/js/globalFields.js"></script>	
    <script type="text/javascript" src="includes/js/snippets.js"></script>	
</head>
<body onload="snippets()"> 
	<form id="stepsToBuildFamily">
	  <div class="snippets" title="mainNavigation.jsp"/>
	  <div id="contentframe">
		<h3>Family Contact:</h3>
		
		<h4 id="infoMessage">
		  <label>!{familyTreeBean.infomsg}</label>
		  <label>!{emailBean.infomsg}</label>
		</h4>
		!{firstPage.resetToRegister()} <!--clear all the fields for a new registration -->
		Big families are great.  But keeping track of everyone and how to contact them can be <br/>
		complicated.  Need to send invitations to a family wedding?  How about emailing everyone  <br/>
		about a family reunion? Or just getting your first cousins together for lunch?   <br/>
		We will make it easy to compile an email with just the right addresses, create mailing labels, or  <br/>
		send a text to a single person or a group of relatives.  <br/> 
		Here's how: 
		<br/><br/><br/><br/>
		Start here:
		<br/><br/>
		<b>First we need to create your family tree, starting with the first ancestor couple<br/>
		you want to use.  Let's call this the root of the tree and their descendants are <br/>
		the people you want to be able to contact.</b>
		<br/><br/>
	    Click <a href="javascript:RESTRegister()">Register</a>
	</div>
	</form>
</body>
</html>