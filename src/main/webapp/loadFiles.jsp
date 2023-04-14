<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/jsp"
	  xmlns:h="http://java.sun.com/jsf/html" 
      xmlns:f="http://java.sun.com/jsf/core" 
	  xmlns:p="http://primefaces.org/ui"
      xmlns:ui="http://java.sun.com/jsf/facelets" >
<h:head>
    <link rel="stylesheet" href="includes/css/frames.css" type="text/css"></link>
    <link rel="stylesheet" href="includes/css/modal.css" type="text/css"></link>
    <script type="text/javascript" src="includes/js/mainPage.js"></script>
    <script type="text/javascript" src="includes/js/globalFunctions.js"></script>	
    <script type="text/javascript" src="includes/js/restAjax.js"></script>
    <script type="text/javascript" src="includes/js/familyTree.js"></script>
</h:head>  
  <body onload="setMsg('','infoMessage')"> 
	<h:form id="loadFiles" styleClass="menuCol noborder" enctype="multipart/form-data">
	  <h3>Upload any file to the server</h3>
	  <h4 style="padding-left: 10px;">1. first click 'Choose' to select the file</h4>
	  <h4 style="padding-left: 10px;">2. next click 'Upload' to send file to server </h4>		
	  <h4 id="infoMessage">#{loadFilesBean.infomsg}</h4>
		
		<h:panelGrid columns="1">
	        <h:panelGroup>
				<p:fileUpload value="#{loadFilesBean.uploadedFile}" mode="simple" skinSimple="true" multiple="true" /><br />			
				<p:commandButton value="Upload" ajax="false" action="#{loadFilesBean.registerUserPhoto}"/>
            </h:panelGroup>
		</h:panelGrid>
		<div  style="padding-left: 5px;padding-top: 25px;">
			<button onclick="return displayImage('email','infoMessage')">
			Click here to display image.</button>
		</div>
		<div id="canvasdiv" style="display:none;"><canvas id="canvas" width="400px" height="300px"/></div>
		<button type="button" onclick="self.close()"><b>Done</b></button>
	  <input type="hidden" id="email" name="email"/> 
	  <input type="hidden" id="jsonitem" name="jsonitem"/> 
	</h:form>
  </body>
</html> 
