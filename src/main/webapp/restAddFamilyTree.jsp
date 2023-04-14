<!DOCTYPE html>
<html lang="en"
    xmlns="http://www.w3.org/1999/jsp"
    xmlns:f="http://xmlns.jcp.org/jsf/core"
    xmlns:h="http://xmlns.jcp.org/jsf/html"
    xmlns:ui="http://xmlns.jcp.org/jsf/facelets">
<f:view>
	<f:metadata>
        <f:viewParam name="id" value="!{requestBean.tempUser.id}" />
	</f:metadata>

<head>
<title>!{bundle.addFamily}</title>
    <link rel="stylesheet" href="includes/css/style.css" type="text/css"></link>
    <script type="text/javascript" src="includes/js/browsers.js"></script>
    <script type="text/javascript" src="includes/js/familyTree.js"></script>
    <script type="text/javascript" src="includes/js/tempFamily.js"></script>
    <script type="text/javascript" src="includes/js/restAjax.js"></script>
    <link rel="stylesheet" href="includes/css/scrollNav.css" type="text/css"></link>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="includes/js/globalFunctions.js"></script>	
</head>
<body onload="showNav('mainNavigation.jsp');populateJson()"> 
	<h:form id="addFamily">
	<ui:include src="mainNavigation.jsp" />
	<div id="contentframe" class="content center">
		<h2>To add a new family tree</h2>
		<b>&#160;OK.  Think about where you want the family tree root to be – who are the 
			&#160;people who started the family.</b>	<u>It should go back only as far as needed to include the 
			&#160;people you want to be able to contact.</u>	  It could be your parents, or your grandparents.... or 
			&#160;maybe even your great grandparents.	(It’s great if you know the names of all your relatives 
			&#160;since your great-great grandparents.  But, let’s face it, you can’t really contact those who are no 
			&#160;longer here via email or conventional cell phones!)
			&#160;<br/><br/><b>Now, put in the names of that first couple.</b>	  We will use a combination of their last 
			&#160;names to be the name of your family and all the people you want to be able to contact will 
			&#160;share that family name. 
		<br/>
		
		<h4 id="infoMessage"><h:outputText value="!{familyTreeBean.infomsg}" escape="false"/></h4>
		
	<h:panelGrid columns="1" cellpadding="0" >
			<h4>Begin with the names of the first couple:</h4>
	<h:panelGrid columns="4" cellpadding="1" >
		<f:facet name="header">
			<div align="left"><h:outputText value="Ancestor 1:"/></div>
		</f:facet>
		<h:outputLabel for="firstname1" value="First name" />
		<h:outputText value=""/>
		<h:inputText id="firstname1" value="!{familyTreeBean.family.firstname1}" size="35" />
		<h:message for="firstname1" errorClass="error" showSummary="!{true}" showDetail="!{false}" />

		<h:outputLabel for="lastname1" value="Last name" />
		<h:outputText value="*"/>
		<h:inputText id="lastname1" value="!{familyTreeBean.family.lastname1}" size="35" required="!{true}"/>
		<h:message for="lastname1" errorClass="error" showSummary="!{true}" showDetail="!{false}" />

	</h:panelGrid>
	<br/>
	<h:panelGrid columns="4" cellpadding="1" >
		<f:facet name="header">
			<div align="left"><h:outputText value="Ancestor 2:"/></div>
		</f:facet>
		<h:outputLabel for="firstname2" value="First name" />
		<h:outputText value=""/>
		<h:inputText id="firstname2" value="!{familyTreeBean.family.firstname2}" size="35" />
		<h:message for="firstname2" errorClass="error" showSummary="!{true}" showDetail="!{false}" />

		<h:outputLabel for="lastname2" value="Last name" />
		<h:outputText value="*"/>
		<h:inputText id="lastname2" value="!{familyTreeBean.family.lastname2}" size="35" required="!{true}" />
		<h:message for="lastname2" errorClass="error" showSummary="!{true}" showDetail="!{false}" />
	</h:panelGrid>
	<br/>
	<h:panelGrid columns="4" cellpadding="1" >
		<h:outputLabel for="email" value="Your email" />
		<h:outputText value="*"/>
		<h:inputText id="email" value="!{familyTreeBean.family.email}" size="35"  required="!{true}"/>
		<h:message for="email" errorClass="error" showSummary="!{true}" showDetail="!{false}" />
	</h:panelGrid>
	<h:panelGrid columns="4" cellpadding="1">
		* <b>Required field</b>
	</h:panelGrid>
	</h:panelGrid>
	<h:panelGrid>
		<h:panelGroup>
          	<h:commandButton value="next" actionListener="!{familyTreeBean.addFamily}"  action="!{familyTreeBean.addFamilyAction}" style="margin-right:5px" />
        </h:panelGroup>
	</h:panelGrid>
	<input type="hidden" value="addFamily" id="formname" name="formname"/>
	</div>
	</h:form>
	<ui:debug rendered="!{initParam['javax.faces.PROJECT_STAGE'] eq 'Development'}" hotkey="D" />
</body>
</f:view>
</html>