function jsonItem() { 
	this.names = [];
	this.values = [];
}
function showNav(navName) {
	var el = document.getElementById("navigationframe");
	if (el == null) {
		if (navName == null) navName = "mainNavigation.jsp";
		var el2 = document.createElement("div"); 
		el2.id = "dynamicDIV";
		document.body.appendChild(el2);
		ajaxDestEl = el2;
		var obj = new ajaxObj(navName,el2);
		obj.ajaxFunc = function(objResp) {
			objResp.ajaxDestEl.innerHTML = objResp.ajaxmsg;
			fadeIn();			
		}
		ajaxRequest(obj,"GET");
	}
	$("nav").toggleClass("active-nav");
}
function fadeOut() {	
	if (document.getElementById('idFadeOut'))
		document.getElementById('idFadeOut').style.display = 'none';
	
	var el = document.getElementById("idFadeIn");
	el.style.display = 'block';
	el.style.left= "0px";
	$("nav").toggleClass("active-nav");
	return false;	
}
function fadeIn() {	
	if (document.getElementById('idFadeIn'))
		document.getElementById('idFadeIn').style.display = 'none';
	
	var el = document.getElementById("idFadeOut");
	el.style.display = 'block';
	el.style.left= "220px";
	$("nav").toggleClass("active-nav");
	return false;
}
function setEmailCookie(parm) {
	document.cookie = "email="+parm.value;
}
function expand(parm,ndx) {
	var el = document.getElementById(parm);
	var plusImg = document.getElementById('plusImg'+ndx);
	var minusImg = document.getElementById('minusImg'+ndx);
	if (el.style.display == "block" || el.style.display == "inherit" ) {
		el.style.display = "none";
		minusImg.style.display = "none";
		plusImg.style.display = "inherit";
	} else {
		el.style.display = "block"; 
		minusImg.style.display = "inherit";
		plusImg.style.display = "none";
	}
}
function resetOpenPage(pageName) {
	document.cookie = "email="+"";
	var obj = new ajaxObj("ajaxs/ajaxResetPage.jsp");
	obj.ajaxFunc = function(objResp) {
		openPage(pageName);
	}
	ajaxRequest(obj,"GET");
 }
function openPage(pageName) {
	var genPopUp = window.open(pageName,"_parent");
 }
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function setjsonitem() {
	var value = getParameterByName('jsonitem');
	var obj = JSON.parse(value);
	var fileDesc = document.getElementById("fileDesc");
	if (obj != null) fileDesc.innerText = obj.desc;
	var el = document.getElementById("jsonitem");
	if (el != null) el.value = value;
} 
function showModal(parm) {
	var modal = document.getElementById(parm);
    modal.style.display = "block";
}
function hideModal(parm) {
	var modal = document.getElementById(parm);
	modal.style.display = "none";
}
function bldJson(row,headers) {
	var jsonColumns = new jsonItem();
	for (var i=0;i<row.children.length-1;i++) {
		var value = row.children[i].innerText;
		if (value.length == 0) {
			value = row.children[i].children[0].value;		// there is an input field in the td 
		}
		jsonColumns.values.push(value);
		jsonColumns.names.push(headers.children[i].innerText);
	}
	return jsonColumns;
}
function deleteRow(column) {
	var row = getParent(column,'tr');
	var headers = getParent(row,'tbody').children[0];
	if (row == null || headers == null) return false;
	
	var jsonColumns = bldJson(row,headers);
	var obj = new ajaxObj("ajaxs/deleteRow.jsp?jsonitem="+encodeURIComponent(JSON.stringify(jsonColumns)));
	obj.ajaxFunc = function(objResp) {
		row.style.backgroundColor = '#CCC';
		column.disabled = true;
		location.reload(true);
		return false;
	}
	if (confirm("Deleting row equal "+jsonColumns.values+"\nDo you want to  continue?")) ajaxRequest(obj,"GET");
	return false;
}
function updateRow(column) {
	var row = getParent(column,'tr');
	var headers = getParent(row,'tbody').children[0];
	if (row == null || headers == null) return false;
	
	var jsonColumns = bldJson(row,headers);
	var obj = new ajaxObj("ajaxs/updateRow.jsp?jsonitem="+encodeURIComponent(JSON.stringify(jsonColumns)));
	obj.ajaxFunc = function(objResp) {
		if (fld != null) fld.innerHTML = obj.ajaxmsg;
		return false;
	}
	ajaxRequest(obj,"GET");
	return false;
}
function readonlyCells(tablename) {
	var table = findElement(tablename);
	if (table == null) return false;
	var tbody = table.children[0];
	if (tbody.localName != 'tbody') return false;
	
	var obj = new ajaxObj("ajaxs/colPKNames.jsp");
	obj.ajaxFunc = function(objResp) {
		var PKs = objResp.ajaxDestEl.innerText.replace(/\n/g, "").split(";");
		for (var i=0;i<PKs.length;i++) {
			if (PKs[i].replace(/\s+/g,"").length == 0) continue;
			for (var j=0;j<tbody.children[0].children.length;j++) {
				if (tbody.children[0].children[j].innerText.localeCompare(PKs[i]) != 0) continue;
				setColToReadOnly(tbody,j);
				break;
			}
		}
		return false;
	}
	ajaxRequest(obj,"GET");
	return false;
}
function setColToReadOnly(tbody,ndx) {
	for (var i2=0;i2<tbody.children.length;i2++) {
		var col = tbody.children[i2].children[ndx];
		if (col.children.length == 0) continue;
		if (!col.children[0].tagName == 'INPUT') continue;
		col.children[0].readOnly = true;
		col.children[0].disabled = true;
	}
}
function openChildPage(colvalue,colname,clazzname,menuEntryName,url,parentTbl) {
	var obj = new ajaxObj("ajaxs/resetInfomsg.jsp");
	obj.ajaxFunc = function(objResp) {
		url += "?colvalue="+colvalue+"&colname="+colname+"&menuEntryName="+menuEntryName+"&parentTbl="+parentTbl;
		window.open(url,"_parent");
	}
	ajaxRequest(obj,"GET");
 }
function getParent(element,tag) {
	while (element) {
		element = element.parentNode;
		if (element.tagName.toLowerCase() === tag) {
			return element;
		}
    }
    return undefined;
}
function verifyField(parm) {
	findElement('infoMessage').innerText = "";
	var fldRequired = findElement(parm);
	if (fldRequired == null) return false;
	var value = fldRequired.value.trim();
	fldRequired.value = value;
	if (value.length != 0) return true;
	
	findElement('infoMessage').innerText = "you must enter an email to add a photo";
	fldRequired.placeholder = "must enter "+parm;
	fldRequired.focus();

	return false;
}
function showMyModal(parm,elementID) {
	if (!verifyField(parm)) return false;
	
	var modal = document.getElementById(elementID);
    modal.style.display = "block";
	document.getElementById('modalButton').focus();
	return false;
}
function exitTask(parm) {
	if (parm !=null) {
		var modal = document.getElementById(parm);
		modal.style.display = "none";
	}
}
function bldLoginJson() { 
	var canvasdiv = document.getElementById('canvasdiv');
	if (canvasdiv != null) canvasdiv.style.display = 'block';
	var value = getParameterByName("email");
	var myJson = {};
	myJson["email"] = value;
	value = getParameterByName("psw");
	myJson["psw"] = value;
	var jsonitem = findElement('jsonitem');
	jsonitem.value = JSON.stringify(myJson);
	return true;
}
function bldJsonArray() {
	var alreadyBuilt = getParameterByName('jsonitem');
	if (alreadyBuilt != null) {
		var jsonitem = findElement('jsonitem');
		jsonitem.value = alreadyBuilt;
		return true;
	}		
	var jsonArray = new jsonItem();
    for (var i=0; i<arguments.length; i++) {
		var value = getParameterByName(arguments[i]);
		jsonArray.values.push(value);
		jsonArray.names.push(arguments[i]);
	}
	var jsonitem = findElement('jsonitem');
	jsonitem.value = JSON.stringify(jsonArray);
	return true;
}
function uploadFilesPrimer(url,infomsg) {
		genPopUp = window.open(url,"primer","toolbar=no,location=no,scrollbars=yes,directories=no,status=no,menubar=no,resizable=yes,width=500,height=350");
		genPopUp.focus();
}
function verifyInput() {
	return checkRequiredFields("psw","vpsw");
}
function uploadFilesPrimerOLD(url,infomsg) {
	if (!checkRequiredFields("psw","vpsw")) return;
		
	var email = findElement("email");
	var psw = findElement("psw");
	isUserRegistered(url,email,psw,infomsg);
}
function isUserRegistered(url,email,psw,infomsg) {
	var wrkObj = {};
	wrkObj.email = email.value;
	wrkObj.psw = psw.value;
	const myJson = JSON.stringify(wrkObj);
	const page = "REST/isUserAlreadyRegistered?jsonitem="+encodeURIComponent(myJson);

	var obj = new ajaxObj(page);
	obj.ajaxFunc = function(objResp) {
		var wrkJson = {};
		if (objResp.ajaxmsg.length >0) wrkJson = JSON.parse(objResp.ajaxmsg);
		if (!objResp.ajaxError) isRegisteredResponse(url,wrkJson,infomsg);
	}
	ajaxRequest(obj,"GET");
}
function isRegisteredResponse(url,wrkJson,infomsg) {
	var msg = findElement(infomsg);
	msg.innerText = wrkJson.infomsg;
//	if (!wrkJson.isregistered)  {
//		var email = findElement("email");
//		var psw = findElement("psw");
//		url += "?email="+email.value+"&psw="+psw.value;
//		genPopUp = window.open(url,"primer","toolbar=no,location=no,scrollbars=yes,directories=no,status=no,menubar=no,resizable=yes,width=500,height=350");
//		genPopUp.focus();
//	}
	if (!wrkJson.isregistered)  {
		var email = findElement("email");
		alert("an Email was sent to this account "+email.value+".\nPlease respond");
	}
}
function draw(photo) {
	var img 	= new Image();
	var canvas = document.getElementById('canvas');
	var canvasdiv = document.getElementById('canvasdiv');
	canvasdiv.style.display = 'none';
	if (photo.length == 0) return;
	
	canvasdiv.style.display = 'block';
	var ctx = canvas.getContext('2d');
	img.onload = function() {
		ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height); 
	};
	img.src = photo;
}
function displayImage(name,infomsg) {
	var value = getParameterByName(name);
	var myJson = {};
	myJson.email = value;
	var page = "REST/displayPhoto?jsonitem="+encodeURIComponent(JSON.stringify(myJson));
	var obj = new ajaxObj(page);
	obj.ajaxFunc = function(objResp) {
		var msg = findElement(infomsg);
		var wrkJson = JSON.parse(objResp.ajaxmsg);
		msg.innerText = wrkJson['infomsg'];
		var photo = wrkJson['photo'];
		if (photo != null) draw(photo);
		return false;
	}
	ajaxRequest(obj,"GET");
	return false;
}
function DisplayMenuEntry(entry) {
	var entryname = getParameterByName("menuEntryName");
	var el = findElement(entry);
	if (entryname == null || el == null) return;
	
	var obj = new ajaxObj("ajaxs/"+entryname+".jsp");
	obj.ajaxFunc = function(objResp) {
		if (!objResp.ajaxError) el.innerHTML = objResp.ajaxmsg;
		return false;
	}
	ajaxRequest(obj,"GET");
}
function exitWindow() {
	window.close();
}
function checkRequiredFields(psw,vPsw) {
	const form = document.getElementById("formname");
	const field1 = document.getElementById(form.value+":"+psw);
	const field2 = document.getElementById(form.value+":"+vPsw);
	const email = document.getElementById(form.value+":email");
	const firstname = document.getElementById(form.value+":firstname");
	const lastname = document.getElementById(form.value+":lastname");

	if (field1 == null || field2 == null || email == null || firstname == null || lastname == null ) {
		findElement('infoMessage').innerText = "some of the fields don't exist in the HTML document";
		return false;
	}
	if (firstname.value.trim().length == 0 || lastname.value.trim().length == 0 ) {
		findElement('infoMessage').innerText = "you must entert all required fields";
		return false;
	}
	const regex = /^.*\@.*\..+$/;
	if (!email.value.match(regex)) {
		findElement('infoMessage').innerText = "invalid email "+email.value;
		return false;
	}
	const value1 = field1.value;
	const value2 = field2.value;
	if (value1.length == 0 || value2.length == 0) {
		findElement('infoMessage').innerText = "Please enter required fields";
		blinkerTID = setInterval('blinker("#")',500);
		return false;
	}
	if (value1 === value2) return true;
	
	findElement('infoMessage').innerText = "fields 'password' and 'verify password' must have the same value";
	return false;
}
function restUploadFile(infomsg) {
	
	window.close();

	bldLoginJson();
	var jsonitem = findElement('jsonitem');
	var page = "REST/registerPhoto?jsonitem="+encodeURIComponent(jsonitem.value);
	var obj = new ajaxObj(page);
	obj.ajaxFunc = function(objResp) {
		var msg = findElement(infomsg);
		var wrkJson = JSON.parse(objResp.ajaxmsg);
		var c = opener.document.getElementById("canvas");
		if (c != null) {
			var ctx = c.getContext("2d");
			img.onload = function() {
				ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height); 
			};
			img.src = wrkJson["photo"];
		}
		localStorage.setItem("register",wrkJson);
		window.close();
	}
	ajaxRequest(obj,"POST");
	return true;
}
function confirmEmail() {
	const value = getParameterByName("jsonitem");
	var page = "REST/confirmEmail?jsonitem="+encodeURIComponent(value);
	var obj = new ajaxObj(page);
	obj.ajaxFunc = function(objResp) {
		var wrkJson = JSON.parse(objResp.ajaxmsg);
		localStorage.setItem("register",wrkJson);
		openPage(wrkJson["html"]);
	}
	ajaxRequest(obj,"GET");
}