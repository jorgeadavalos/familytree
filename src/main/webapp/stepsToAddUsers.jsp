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
    <script type="text/javascript" src="includes/js/snippets.js"></script>	
</head>
<body onload="snippets()"> 
	<form id="stepsToAddUsers">
	  <div class="snippets" title="mainNavigation.jsp"/>
	  <div id="contentframe">
	  <h4 id="infoMessage" style="infoMessage"><h:outputText value="!{familyTreeBean.infomsg}" escape="false"/></h4>
	  <h3>!{familyTreeBean.verifyFamily}</h3>
	  <h3>!{familyTreeBean.prevStepMsg}</h3>
	  <h3>&#160;</h3>
	  <ul><b>There are a few ways to add family members to your family tree</b>
	  	<li style="margin-left: 40px"><a href="!{familyTreeBean.url}">To enter data for a new member click here</a></li>
	  </ul>
	  <ul><b>To have your relatives enter the data themselves</b>
	  	<li style="margin-left: 40px">populate the box bellow with their emails and click send.</li>
	  	<li style="margin-left: 40px">If you have a file with your family emails.<a class='menuButton' href="loadFiles.xhtml">here</a></li>
	  	<li style="margin-left: 40px">If your contacts are in an email provider select from the dropdown
		<h:selectOneMenu id="oauthList" value="!{oAuth2Bean.provider}" valueChangeListener="!{oAuth2Bean.bldProvider}"
			 immediate="true"  onchange="this.form.submit()">
				<f:selectItem itemLabel="Select Oauth" itemValue="" />
				<f:selectItems value="!{oAuth2Bean.oauth2List}" />
		</h:selectOneMenu>
		and click<a class='menuButton' href="!{oAuth2Bean.jettysignin}">here</a>
	  </li>
	  <br>&#160;</br>
	</ul>

	<h:panelGrid columns="3" cellpadding="1" >		
		<h:outputLabel for="emailList" value="email(s)" />
		<h:inputTextarea id="emailList" value="!{familyTreeBean.emailList}" cols="55" rows="5" >
		            <f:validator validatorId="emailValidator" />
		</h:inputTextarea>
		<h:message for="emailList" errorClass="error" showSummary="!{true}" showDetail="!{false}" />
	</h:panelGrid>
	
	<h:panelGroup>
     	<h:commandButton value="send" action="!{familyTreeBean.sendEmailAction}" style="margin-right:5px" />
    </h:panelGroup>
	<input type="hidden" value="stepsToAddUsers" id="formname" name="formname"/>
	</div>
  </form>
</body> 
</html> 
