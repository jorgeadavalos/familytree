<!DOCTYPE html>
<html>
<head>
	<title>stepsToBuildFamily</title>
    <link rel="stylesheet" href="includes/css/style.css" type="text/css"></link>
    <link rel="stylesheet" href="includes/css/frames.css" type="text/css"></link>
    <link rel="stylesheet" href="includes/css/scrollNav.css" type="text/css"></link>
    <link href="includes/css/coverPage.css" type="text/css" rel="stylesheet" ></link>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="includes/js/globalFields.js"></script>
    <script type="text/javascript" src="includes/js/globalFunctions.js"></script>	
    <script type="text/javascript" src="includes/js/mainPage.js"></script>
    <script type="text/javascript" src="includes/js/restAjax.js"></script>	
    <script type="text/javascript" src="includes/js/snippets.js"></script>	
    <script type="text/javascript" src="includes/js/familyTree.js"></script>	
</head>
  <body onload="snippets();bldTree()"> 
    <form id="viewFamilyTree">
		<div id="navigationframe" class="content">
		  <div class="snippets" title="mainNavigation.jsp"/>
		</div>
		<div id="contentframe" class="center">
			<h4 id="infoMessage" style="infoMessage">#{viewFamilyTreeBean.infomsg}</h4>
			<h4 >family tree for email #{viewFamilyTreeBean.email}</h4>
		    <button value="refresh" action="#{viewFamilyTreeBean.viewFamilyAction}" style="margin-right:5px" />
		  	<span id="treeroot">
		  	</span>
			<h:outputText value="#{viewFamilyTreeBean.treeGraph}" escape="false"/>
			<h:outputText value="#{viewFamilyTreeBean.tree.parentMembers}" escape="false"/>
			<input type="hidden" value="viewFamilyTree" id="formname" name="formname"/>
		</div>
  </h:form>	
</body>
</html>