<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Registration Process</title>
		<link rel="stylesheet" href="includes/css/style.css" type="text/css"></link>
		<link rel="stylesheet" href="includes/css/scrollNav.css" type="text/css"></link>
		<link rel="stylesheet" href="includes/css/frames.css" type="text/css"></link>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="includes/js/mainPage.js"></script>
		<script type="text/javascript" src="includes/js/globalFields.js"></script>
		<script type="text/javascript" src="includes/js/globalFunctions.js"></script>
		<script type="text/javascript" src="includes/js/restAjax.js"></script>
		<script type="text/javascript" src="includes/js/snippets.js"></script>
	</head>
	<body onload="snippets()">
	  <div class="snippets" title="mainNavigation.jsp"/>
	  <form id="register">
		<div id="headerframe">
		  <table>
			  <tr></tr>
			  <tr><th colspan="3"><h4  align="left">Register form:</h4></th></tr>
			  <tr><td>Email:</td><td>*</td><td><input id="email" value="!{familyTreeBean.email}" size="35" /></td></tr>
			  <tr><td>Password:</td><td>*</td><td><input type="password" id="psw" value="" size="35" /></td></tr>
			  <tr><td>Verify Password:</td><td>*</td><td><input type="password" id="vpsw" value="" size="35" /></td></tr>
			  <tr></tr>
			  <tr><td>First name</td><td>*</td><td><input id="firstname" value="!{familyTreeBean.family.firstname2}" size="35" /></td></tr>
			  <tr><td>Last name</td><td>*</td><td><input id="lastname" value="!{familyTreeBean.family.lastname2}" size="35" /></td></tr>
			  <tr></tr>
			  <tr></tr>
			  <tr><td colspan="3"><h4  align="left">* Required field</h4></td></tr>
			  <tr><td colspan="2"><button onclick="return restAddFamily()">Next</button></td></tr>
		  </table>
		  <panelGroup id="login" rendered="!{firstPage.isloggedout()}">
			  <h4 id="infoMessage">!{firstPage.infomsg}</h4>
			  <panelGrid columns="1" cellpadding="10">
				<div>
				 <canvas id="canvas" width="100" height="62"/>
				 <br/><a href="javascript:uploadFilesPrimer('loadFiles.jsp')">Upload photo</a> 
				</div>
			  </panelGrid>
			</panelGrid>
			  <h5 style="padding-bottom:10px;" >Fields tagged with * are required fields</h5>		 
			  <commandButton styleClass='loginbutton' value="register" actionListener="!{firstPage.register}" onclick="return verifyInput()"/>
		  </panelGroup>
		</div>
		<input type="hidden" value="register" id="formname" name="formname"/>
		<img style="display:none;" id="regPhoto" src="includes/images/siloutte.png" alt="load your photo" height="62"></img>
	  </form>
	</body>
</html>