<!DOCTYPE html>
<html lang="en"">
<head>
<title>!{bundle.selectFamily}</title>
    <link rel="stylesheet" href="includes/css/scrollNav.css" type="text/css"></link>
    <link rel="stylesheet" href="includes/css/style.css" type="text/css"></link>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="includes/js/familyTree.js"></script>
    <script type="text/javascript" src="includes/js/globalFunctions.js"></script>
    <script type="text/javascript" src="includes/js/restAjax.js"></script>
</head>
<body onload="snippets()"> 
	<form id="selectFamily" styleClass="menuCol noborder">
	  <div class="snippets" title="mainNavigation.jsp"/>
	  <div id="contentframe" class="content center">  
	  <h2>Email Access to family tree</h2>

	  <h4 id="infoMessage">!{emailBean.infomsg}" !{tempIdRequestBean.infomsg}</h4>
	  <table>
		  <tr></tr>
		  <tr><td>Your Email</td><td>*</td><td><input id="email" value="!{emailBean.email}" size="35" /></td></tr>
		  <tr><td>Families</td><td>&nbsp;</td><td>
		  	<select name="family" id="families" value="!{emailBean.familyId}" onChange="return chosen(this)">
		  	  <option value="Select a family">Select a family</Option>
		  	  <option value="family1">family1v</Option>
		  	  <option value="family2">family2v</Option>
		  	</select>
		  </td></tr>
		  <tr></tr>
		  <tr></tr>
		  <tr><td><h4  align="left">Ancestor 2:</h4></td></tr>
		  <tr><td>First name</td><td>*</td><td><input id="firstname1" value="!{familyTreeBean.family.firstname2}" size="35" /></td></tr>
		  <tr><td>Last name</td><td>*</td><td><input id="lastname1" value="!{familyTreeBean.family.lastname2}" size="35" /></td></tr>
		  <tr></tr>
		  <tr></tr>
		  <tr><td>Your email</td><td>*</td><td><input id="lastname1" value="!{familyTreeBean.family.email}" size="35" /></td></tr>
		  <tr></tr>
		  <tr><td colspan="3"><h4  align="left">* Required field</h4></td></tr>
		  <tr><td colspan="2"><button onclick="return restAddFamily()">Next</button></td></tr>
	  </table>
	<!--h:panelGrid columns="4" cellpadding="1" >
          	<h:commandButton value="Select family" action="!{emailBean.navNewFamily}" style="margin-right:5px;" />
        </h:panelGroup>
	</h:panelGrid-->
	</div>
	</form>
</body>
</html>