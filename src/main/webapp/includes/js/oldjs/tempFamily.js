function resetAction(parm){
	var forms = document.forms;
	var loc = location.href;
	location.href = loc.replace(".jsp",".jsp")
	return false;
}
function loadPhotos(value,formid,name){
	if (value == "No") return true;
	url = url="loadPhotos.jsp";
	var nameVar = findSetId(formid,name);
	if (nameVar) url = url+"?"+name+"="+nameVar.value;
	showpopup(url, "popup", 700,465);
	return true;
}
function checkServerSync(msg,url) {
	var pageRequest = false;
	if      (window.XMLHttpRequest) pageRequest = new XMLHttpRequest();
	else if (window.ActiveXObject)  pageRequest = new ActiveXObject("Microsfot.XMLHTTP");
	else return msg;
	pageRequest.open('GET',url,false);
	pageRequest.send(null);
	var serverResp = serverGetData(pageRequest);
	if (serverResp.length == 0) 
		msg = "must login/login using id with the correct priority-level (type)<br>if you are loggedin you must logg-out";
	return msg;
}

function serverGetData(pageRequest) {
	if (pageRequest.readyState == 4) {
		if (pageRequest.status == 200) return pageRequest.responseText;
	}
	return "";
}
var CATTYPE="catType";
function setTypeAndMsg(formid,msg,checkUserPriority) {
	
	if (checkUserPriority) {
		var url = "isUserLoggedIn.jsp?TYPE="+checkUserPriority;
		msg = checkServerSync(msg,url);
	}
	//value is part of the URL.
	var nameVar = findSetId(formid,CATTYPE);
	if (nameVar) nameVar.readOnly = "true";
	var tbl = findSetId(formid,"infoMessage");
	if (msg.length > 0) bldInfoMsg(tbl,msg);
	var url = document.URL;
	var TAG= CATTYPE+"=";
	var ndx = url.indexOf(TAG);
	if (ndx == -1) return false;
	ndx += TAG.length;
	url = url.substring(ndx);
	ndx = url.indexOf("&");
	if (ndx != -1) url = url.substring(0,ndx);
	nameVar.value = url;
	var hiddenFld = document.getElementById(CATTYPE+"Hidden");
	if(hiddenFld) hiddenFld.value = url;

	return true;
}
function logout() {
	var url = "logout.jsp";
	checkServerSync("",url);	
	url = url="login.jsp";
	showpopup(url,"_parent");
}
function addCategory(value,typeVal){
	if (value == "No") return true;
	url = url="addCategory.jsp?"+CATTYPE+"="+typeVal;
	showpopup(url,"_parent");
	return true;
}
function addMaterial(value){
	if (value == "No") return true;
	url = url="addMaterial.jsp";
	showpopup(url,"_parent");
	return true;
}
function listProducts(value){
	if (value == "No") return true;
	url = url="ListProducts.jsp";
	showpopup(url,"_parent");
	return true;
}
function showpopup(url, name, width, height ) { 
 
	str  = ""; 
	str += "resizable=1,titlebar=0,menubar=0,"; 
	str += "toolbar=0,location=0,directories=0,status=1,"; 
	str += "scrollbars=0" + ","; 
	str += "width=" + width + ","; 
	str += "height=" + height + ","; 
	str += "top=150,"; 
	str += "left=150"; 
 
	window.open( url, name, str ); 
} 
function onLoadSetSubHeader(prodName,nam) {
	var url = document.URL;
	var ndx = url.indexOf(prodName);
	if (ndx == -1) return true;
	value = url.substring(ndx);
	var elements = document.getElementsByTagName('h2');
	if (elements) {
		for (var i = 0;i<elements.length;i++) {
			if (elements[i].id.indexOf(nam) != -1) {
				elements[i].innerHTML += value
			}
		}
	}
	return true;
}
var imgX;
var imgY;
var curimg;
function init() {
	if (window.Event) {
		document.captureEvents(Event.MOUSEOVER);
		try {
			document.captureEvents(Event.MOUSEOVER);
		} catch(err) {
			return;
		};
	}
	document.onmouseover = getXY;
}

function getXY(e) {
	imgX = (window.Event) ? e.pageX : event.clientX;
	imgY = (window.Event) ? e.pageY : event.clientY;
}
function mapdblclick(region,shaded) {
	var map = document.getElementById(shaded);
	if (map == null ) return;
	document.getElementById(shaded).style.opacity = 0.6;
	var imglist = document.getElementsByTagName("img");

	for (var i=0;i < imglist.length;i++) { 
		curimg = imglist[i].name;
		if (imglist[i].name == region) 	return openImgChoice(region);

	}
}
function mapMouseOut(shaded) {
	var map = document.getElementById(shaded);
	if (map == null ) return;
	document.getElementById(shaded).style.opacity = 1.0;
	document.getElementById('navChoice').style.visibility = "hidden";
}
function openImgChoice(region) {

	var el = document.getElementById('navChoice');
	if (el == null)
	{
		alert("no navs available");
		return false;
	}
	/* set the position */
	var cur, x, y;
	x = imgX-10; y = imgY - 10;
	el.style.left = x + "px";
	el.style.top  = y + "px";
	var strs = "Estado "+region+"<br/><img id=\"hideitx\" border=\"0\" src=\"images/maps/"+region+".png\" width=\"300\" height=\"200\" />";

	el.innerHTML = strs;
	el.style.visibility = "visible";
	return false;
}
function populate(parm,value,tag){
	document.getElementById(parm).value=tag+value;
}
function displayDocument(parm) {
	document.open();
	document.write("<iframe src='"+parm+"' name='myframe' width='10' height='10' frameborder='0' allowtransparency='true'></iframe>");
	document.close();
}
function enlarge(parm,formid) {
	var tableName = formid+":infoMessage";
	var table = findSetId(formid,"infoMessage");
	if (!table) return;

	var theImg = "<img src='"+parm.src+"'></img>";
	var ndx = table.rows.length-1;
	for (var i=ndx;i>=0;i--) {
		table.deleteRow(i);
	}
	var newRow = table.insertRow(0);
	var cell = newRow.insertCell(0);
	cell.colSpan = 4;
	cell.innerHTML="<th>Info</th><br/>"+theImg;
	
	newRow = table.insertRow(table.rows.length);
	cell = newRow.insertCell(0);
	cell.colSpan = 4;
	cell.innerHTML="<td>"+"<br>Click 'OK' to continue</td>";
	
	ndx = table.rows.length;
	newRow = table.insertRow(ndx);
	cell = newRow.insertCell(0);
	newRow.cells[0].innerHTML = "<input type='button' id='bckButton' onclick=\"hideInfoMsg('"+tableName+"')\" value='Ok' />";

	table.style.visibility = "visible";
	table.style.left = "450px";
	table.style.top  = "150px";
	return false;
}
function bldInfoMsg(table,msg) {
	if (!table) return;

	var ndx = table.rows.length-1;
	for (var i=ndx;i>=0;i--) {
		table.deleteRow(i);
	}
	var newRow = table.insertRow(0);
	var cell = newRow.insertCell(0);
	cell.colSpan = 4;
	cell.innerHTML="<th>Info</th>";
	
	newRow = table.insertRow(table.rows.length);
	cell = newRow.insertCell(0);
	cell.colSpan = 4;
	cell.innerHTML="<td>"+msg+" Click 'OK' to continue</td>";
	
	ndx = table.rows.length;
	newRow = table.insertRow(ndx);
	cell = newRow.insertCell(0);
	newRow.cells[0].innerHTML = "<input type='button' id='bckButton' onclick='hideInfoMsg()' value='Ok' />";

	table.style.visibility = "visible";
	table.style.left = "450px";
	table.style.top  = "150px"; 
	
}
function hideInfoMsg() {
	var table = document.getElementById("infoMessage");
	if (table == null) 	table = findSetId("","infoMessage");
	table.style.visibility = "hidden";
}
/*              Utility functions                    */

function addEvent(obj, evType, fn, propagate){
	if (obj.addEventListener){
		obj.addEventListener(evType, fn, (propagate==null)?true:propagate);
		return true;
	} else if (obj.attachEvent){
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	} else {
		return false;
	}
}
