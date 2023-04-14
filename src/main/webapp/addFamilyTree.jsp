<!DOCTYPE html>
<html lang="en">
<head>
<title>AddFamilyTree</title> 
    <link rel="stylesheet" href="includes/css/style.css" type="text/css"></link>
    <script type="text/javascript" src="includes/js/familyTree.js"></script>
    <script type="text/javascript" src="includes/js/tempFamily.js"></script>
    <script type="text/javascript" src="includes/js/restAjax.js"></script>
    <link rel="stylesheet" href="includes/css/scrollNav.css" type="text/css"></link>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="includes/js/globalFields.js"></script>
    <script type="text/javascript" src="includes/js/globalFunctions.js"></script>	
    <script type="text/javascript" src="includes/js/snippets.js"></script>	
</head>
<body onload="onloadAddFamilyTree()"> 
	<form id="addFamily">
	  <div class="snippets" title="mainNavigation.jsp"/>
	  <div id="contentframe" class="content center">
		<h2>To add a new family tree</h2>
			<b>&#160;OK.  Think about where you want the family tree root to be - who are the
			&#160;people who started the family.</b>	<u>It should go back only as far as needed to include the 
			&#160;people you want to be able to contact.</u>	  It could be your parents, or your grandparents.... or 
			&#160;maybe even your great grandparents.	(It's great if you know the names of all your relatives 
			&#160;since your great-great grandparents.  But, let's face it, you can't really contact those who are no 
			&#160;longer here via email or conventional cell phones!)
			&#160;<br/><br/><b>Now, put in the names of that first couple.</b>	  We will use a combination of their last 
			&#160;names to be the name of your family and all the people you want to be able to contact will 
			&#160;share that family name. 
		<br/>
		
		<h4 id="infoMessage">!{familyTreeBean.infomsg}</h4>
		
		<table>
		  <tr></tr>
		  <tr><th colspan="3"><h4  align="left">Begin with the names of the first couple:</h4></th></tr>
		  <tr></tr>
		  <tr><td><h4  align="left">Ancestor 1:</h4></td></tr>
		  <tr><td>First name</td><td>*</td><td><input id="firstname1" value="!{familyTreeBean.family.firstname1}" size="35" /></td></tr>
		  <tr><td>Last name</td><td>*</td><td><input id="lastname1" value="!{familyTreeBean.family.lastname1}" size="35" /></td></tr>
		  <tr></tr>
		  <tr></tr>
		  <tr><td><h4  align="left">Ancestor 2:</h4></td></tr>
		  <tr><td>First name</td><td>*</td><td><input id="firstname2" value="!{familyTreeBean.family.firstname2}" size="35" /></td></tr>
		  <tr><td>Last name</td><td>*</td><td><input id="lastname2" value="!{familyTreeBean.family.lastname2}" size="35" /></td></tr>
		  <tr></tr>
		  <tr></tr>
		  <tr><td>Your email</td><td>*</td><td><input id="email" value="!{familyTreeBean.family.email}" size="35" /></td></tr>
		  <tr></tr>
		  <tr><td colspan="3"><h4  align="left">* Required field</h4></td></tr>
		  <tr><td colspan="2"><button onclick="return restAddFamily()">Next</button></td></tr>
		</table>
          	<!--h:commandButton value="next" actionListener="!{familyTreeBean.addFamily}"  
			action="!{familyTreeBean.addFamilyAction}" style="margin-right:5px" /-->
	  </div>
	</form>
</body>
</html>