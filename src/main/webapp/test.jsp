<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns:f="http://java.sun.com/jsf/core" 
	  xmlns:h="http://java.sun.com/jsf/html" 
	  xmlns:ui="http://java.sun.com/jsf/facelets" 
	  xmlns:p="http://primefaces.org/ui"
	  xmlns="http://www.w3.org/1999/jsp">
	  
<h:head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>FileUpload</title>
    <script type="text/javascript" src="includes/js/restAjax.js"></script>
    <script type="text/javascript" src="includes/js/globalFunctions.js"></script>
</h:head> 
<body onload="setMsg('','infoMessage')">
	<h:form id="test" enctype="multipart/form-data">
	  <div id="contentframe">
		<h:outputText value='Enter first number'/>
        <h:inputText value='#{calculatorBean.x}'/>
        <h:outputText value='Enter second number'/>
        <h:inputText value='#{calculatorBean.y}'/>
        <h:commandButton action="#{calculatorBean.add}" value="Add"/>
	 </div>
	</h:form>
</body>
</html>
