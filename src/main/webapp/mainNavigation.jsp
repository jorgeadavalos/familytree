	<div id="navigationframe"> 
	  <nav>
	    <a href="#" class="nav-toggle">
			<img class="nav-toggle" onclick="return fadeOut()" src="includes/images/bt_prev.gif" id="idFadeOut"/>
			<img class="nav-toggle" onclick="return fadeIn()" src="includes/images/bt_next.gif" id="idFadeIn" />
		</a>
		<ul>
		  <li><a id="loginAct" class='showit' href="javascript:loginReq()">Login</a></li>
		  <li><a id="logoutAct" class='dontshowit' href="javascript:logoutReq()"/>Logout</a></li>
		  
		  <li><a href="javascript:openPage('stepsToBuildFamily.jsp')"> Create family root </a></li>
		  <li><a class="expand" href="javascript:openPage('stepsToAddUsers.jsp')">&#160;&#160;&#160;&#160;Add family member(s) </a></li>
		  <li><a class="expand" href="javascript:openPage('addFamilyAdmin.jsp')">&#160;&#160;&#160;&#160;Add coordinator</a></li>
		  <li><a href="javascript:openPage('bldLandingPage.jsp')"> Create landing page </a></li> 
		  <li><a href="javascript:resetOpenPage('viewFamily.jsp')"> View your family Tree </a></li>
		  <li><a href="javascript:resetOpenPage('selectFamily.jsp')">select family via email </a></li>
		  <li>&#160;</li>
		  <li>
		    <div class="dropbtn" >
				<div id="plusImg1"><img height="12" width="12" src="includes/images/plus.png" onclick="expand('familyGroup',1)"/> Create shopping List</div>
				<div id="minusImg1" style="display:none"><img height="12" width="12" src="includes/images/minus.png" onclick="expand('familyGroup',1)"/> Create shopping List</div>
			  <div id="familyGroup" class="groups">
				  <a class="expand" href="javascript:openPage('addFamily.jsp')">create Root</a>
				  <a class="expand" href="javascript:openPage('addEmails.jsp')">Add emails</a>
				  <a class="expand" href="javascript:openPage('loadFiles.jsp')">add shop list from a file</a>
			  </div>
		    </div>
		  </li>
		  <li>
		    <div class="dropbtn" >
				<div id="plusImg2"><img height="12" width="12" src="includes/images/plus.png" onclick="expand('adminGroup',2)"/> Administrator's functions</div>
				<div id="minusImg2" style="display:none"><img height="12" width="12" src="includes/images/minus.png" onclick="expand('adminGroup',2)"/> Administrator's functions</div>
			  <div id="adminGroup" class="groups">
				  <a class="expand" href="javascript:openPage('addItems.jsp')">Add family member(s)</a>
				  <a class="expand" href="javascript:openPage('deleteItems.jsp')">Delete family member(s)</a>
				  <a class="expand" href="javascript:openPage('updateItems.jsp')">Update family member(s)</a>
			  </div>
		    </div>
		  </li> 
		</ul>
	  </nav>
	</div>
