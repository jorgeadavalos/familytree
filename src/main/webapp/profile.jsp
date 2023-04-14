<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/jsp"
	  xmlns:h="http://java.sun.com/jsf/html" 
      xmlns:f="http://java.sun.com/jsf/core" 
	  xmlns:c="http://java.sun.com/jsp/jstl/core"
      xmlns:ui="http://java.sun.com/jsf/facelets" >
<head>
		<link rel="stylesheet" href="includes/css/scrollNav.css" type="text/css"></link>
		<link rel="stylesheet" href="includes/css/style.css" type="text/css"></link>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="includes/js/familyTree.js"></script>
		<script type="text/javascript" src="includes/js/globalFunctions.js"></script>
		<script type="text/javascript" src="includes/js/restAjax.js"></script>
</head>  
  <body>
	<h:form id="profile">
	<div id="headerframe">
	  <h4>Enjoy and contribute</h4>
	  <h:panelGrid columns="2" cellpadding="1">
		<h:panelGrid columns="2" border="2">
			<h:outputLabel for="email" value="email:" /> 
			<h:inputText readonly="true" id="email" style="padding-left:5px;padding-right:20px;" value="#{firstPage.email}"/>
			<h:outputLabel value="firstname:" /> 
			<h:outputText style="padding-left:5px;padding-right:20px;" value="#{firstPage.userDB.user.firstname}"/>
			<h:outputLabel value="Last name:" /> 
			<h:outputText style="padding-left:5px;padding-right:20px;" value="#{firstPage.userDB.user.lastname}"/>
	    </h:panelGrid>
		<h:panelGrid columns="1" cellpadding="10">
		  <h:panelGroup id="login1" rendered="#{firstPage.hasNoPhoto()}">
		    <div>
		       <img src="includes/images/siloutte.png" alt="load your photo" height="62"></img>
			   <br/><a href="javascript:uploadFilesPrimer('loadFiles.jsp')">Upload photo</a> 
			</div>
		  </h:panelGroup>
		  <h:panelGroup id="login2" rendered="#{firstPage.hasPhoto()}">
		    <div>
			  <img id="loginPhoto" src="#{firstPage.getPhoto()}" height="62"/>
			</div>
		  </h:panelGroup>
		</h:panelGrid>
	  </h:panelGrid>
	  <h:commandButton style="position: relative;" value="logout" actionListener="#{firstPage.logout}" action="#{firstPage.loginAction}"  rendered="#{firstPage.isloggedin()}"/>
	</div>
	</h:form>
  </body>
</html> 
