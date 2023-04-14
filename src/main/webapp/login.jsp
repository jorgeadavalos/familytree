<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/jsp"
	  xmlns:h="http://java.sun.com/jsf/html" 
      xmlns:f="http://java.sun.com/jsf/core" 
	  xmlns:c="http://java.sun.com/jsp/jstl/core"
      xmlns:ui="http://java.sun.com/jsf/facelets" >
<head>
		<link rel="stylesheet" href="includes/css/scrollNav.css" type="text/css"></link>
		<link rel="stylesheet" href="includes/css/frames.css" type="text/css"></link>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script type="text/javascript" src="includes/js/mainPage.js"></script>
		<script type="text/javascript" src="includes/js/globalFunctions.js"></script>
		<script type="text/javascript" src="includes/js/restAjax.js"></script>
</head>  
  <body>
	<h:form id="login">
	<div id="headerframe">
	  <div style="position: fixed;right:0px;padding-right:100px;">
	  <h:panelGroup id="profilePanel" rendered="#{firstPage.isloggedin()}">
		<ui:include src="profile.jsp"/>
	  </h:panelGroup>
	  </div>
	  <h:panelGroup id="login" rendered="#{firstPage.isloggedout()}">
		  <h4 id="infoMessage">#{firstPage.infomsg}</h4>
		<h:panelGrid columns="2" cellpadding="1">
		  <h:panelGrid columns="4" cellpadding="1">
			<h:outputLabel for="email" value="email:" /> 
			<h:outputText value="*"/>
			<h:inputText id="email" value="#{firstPage.email}" size="35"  required="#{true}"/>
			<h:message for="email" errorClass="error" showSummary="#{true}" showDetail="#{false}" />
			
			<h:outputLabel for="psw" value="Password:" /> 
			<h:outputText value="*"/>
			<h:inputSecret id="psw" value="#{firstPage.psw}" required="#{true}"/>
			<h:message for="psw" errorClass="error" showSummary="#{true}" showDetail="#{false}" />
			
			<h:outputLabel for="vpsw" value="Verify Password:" /> 
			<h:outputText value="*"/>
			<h:inputSecret id="vpsw"  required="#{true}"/>
			<h:message for="vpsw" errorClass="error" showSummary="#{true}" showDetail="#{false}" />

			<h:outputLabel for="firstname" value="First name:" /> 
			<h:outputText value=""/>
			<h:inputText id="firstname" value="#{firstPage.firstname}" size="35"  required="#{true}"/>
			<h:message for="firstname" errorClass="error" showSummary="#{true}" showDetail="#{false}" />

			<h:outputLabel for="lastname" value="Last name:" /> 
			<h:outputText value=""/>
			<h:inputText id="lastname" value="#{firstPage.lastname}" size="35"  required="#{true}"/>
			<h:message for="lastname" errorClass="error" showSummary="#{true}" showDetail="#{false}" />
		  </h:panelGrid>
		  <h:panelGrid columns="1" cellpadding="10">
		    <div>
		     <img src="includes/images/siloutte.png" alt="load your photo" height="62"></img>
			 <br/><a href="javascript:uploadFilesPrimer('loadFiles.jsp','email')">Upload photo</a> 
			</div>
		  </h:panelGrid>
		</h:panelGrid>
		  <h5>Fields tagged with * are required fields</h5>		 
		  <h:commandButton styleClass='loginbutton' value="login" actionListener="#{firstPage.login}" action="#{firstPage.loginAction}"/>
	  </h:panelGroup>
	</div>
	<input type="hidden" value="login" id="formname" name="formname"/>
	</h:form>
  </body>
</html> 
