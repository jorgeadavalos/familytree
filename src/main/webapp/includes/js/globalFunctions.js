//const beanPrefix = "!{";
//const beanSuffix = "}";
let img 	= new Image();
function jsonPhotoTemplate(name) { 
	this.name=name;
	this.desc="";
}
function showNav() {
	fadeOut();
	fadeIn();
	$("nav").toggleClass("active-nav");
}
function fadeOut() {	
	const idFadeOut = document.getElementById('idFadeOut');
	if (idFadeOut)
		idFadeOut.style.display = 'none';
	
	var el = document.getElementById("idFadeIn");
	el.style.display = 'block';
	el.style.left= "0px";
	$("nav").toggleClass("active-nav");
	return false;	
}
function fadeIn() {
	const idFadeIn = document.getElementById('idFadeIn');
	if (idFadeIn)
		idFadeIn.style.display = 'none';
	
	var el = document.getElementById("idFadeOut");
	if (el != null) {
		el.style.display = 'block';
		el.style.left= "0px";
		$("nav").toggleClass("active-nav");
	}
	return false;
}
function findElement(nam) {
	var namVar = document.getElementById(nam);
	if (namVar) return namVar;
	for (var i=0,len=document.forms.length;i<len;i++) {
		namVar = document.getElementById(document.forms[i].id+":"+nam);
		if (namVar) return namVar;
	}
	var elements = document.getElementsByTagName('*');
	if (elements) {
		for (var i = 0;i<elements.length;i++) {
			if (elements[i].id.indexOf(nam) != -1) {
				return elements[i];
			}
		}
	}
	return null;
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
function landingPageImg(parm,ndx) {
	var labelText = parm.parentNode.innerText.replace(/^\s+|\s+$/g, '');
	var name = "";
	if (ndx == 1) name = "immediateFamily";
	else if (ndx == 2) name = "extendedFamily";
	else if (ndx == 3) name = "thinkingPerson";
	else return false;
	
	var obj = new ajaxObj("ajaxs/ajaxResetInfomsg.jsp");
	obj.ajaxFunc = function(objResp) {
		var jsonNode = new jsonPhotoTemplate(name);
		jsonNode.desc = labelText;
		openPage("loadPhotos.jsp?jsonitem="+encodeURIComponent(JSON.stringify(jsonNode)));
	}
	ajaxRequest(obj,"GET");
	return false;
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
blinkerTID	=  null;
fld 		= null;
function blinker(app) {
	if (fld == null) {
		if (blinkerTID != null) window.clearInterval(blinkerTID);
		blinkerTID = null;
		return;
	}
    fld.style.color = fld.style.color == "red" ? "blue" : "red";
}
window.addEventListener('dblclick', function(){
		if (blinkerTID != null) window.clearInterval(blinkerTID);
		blinkerTID = null;
})
function setMsg(msg,fldName) {
	fld = findElement(fldName); 
	if (fld == null) return false;
	fld.innerHTML = msg;
	blinkerTID = setInterval('blinker("#")',500);
	const wrkEle = document.getElementById("loadFiles");
	if (wrkEle != null) wrkEle.action = location.href;
	loadCanvas();
	return false;
}
function showModal(parm) {
	var modal = document.getElementById(parm);
    modal.style.display = "block";
}
function hideModal(parm) {
	var modal = document.getElementById(parm);
	modal.style.display = "none";
}
function loadCanvas() {
	var c = document.getElementById("canvas");
	if (c == null) return;
	var ctx = c.getContext("2d");
	var siluate = document.getElementById("regPhoto");
	if (siluate == null) return;
	
	img.onload = function() {
		ctx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height); 
	};
	img.src = siluate.src;
}
function loginService() {
	const value = getParameterByName("jsonitem");
	var page = _RESTBASELOGIN+"/login/"+encodeURIComponent(value);
	var obj = new ajaxObj(page);
	obj.ajaxFunc = function(objResp) {
		var wrkJson = JSON.parse(objResp.ajaxmsg);
		var jsonitem = encodeURIComponent(objResp.ajaxmsg);
		localStorage.setItem("caller",objResp.ajaxmsg);
		openPage(wrkJson["html"]+"?caller="+jsonitem);
	}
	ajaxRequest(obj,"GET");
}
/*function snippets() {
	const includes = document.getElementsByClassName("snippets");
	const len = includes.length;
	if (len == 0) collectBeanTags();
	for (var i=0;i<len;i++) {
		const ele = includes[i];
		const ndx = i;
		var obj = new ajaxObj(ele.title);
		obj.ajaxFunc = function(objResp) {
			ele.insertAdjacentHTML("afterbegin",objResp.ajaxmsg);
			if (ndx == len-1) {
				collectBeanTags();
			}
		}
		ajaxRequest(obj,"GET");
	}
}
function collectBeanTags() {
	fadeIn();
	let beans = {};
	beans = collectBeanNames(document.body,beans);
	let len = Object.keys(beans).length;
//	if (len > 0) getBeansFromServer(beans);
	if (len > 0) getBeansFromCallee(beans);
}
function collectBeanNames(parent,beans) {
	const children = parent.childNodes;
	const len = children.length;
	for (let i=0;i<len;i++) {
		if (children[i].childNodes.length > 0) collectBeanNames(children[i],beans);
		var beanName = getBeanName(children[i]);
		if (beanName != null) beans[beanName] = beanName;
	}
	return beans;
}
function collectBeanFields(parent,fields) { //fields is an array
	const children = parent.childNodes;
	const len = children.length;
	for (let i=0;i<len;i++) {
		if (children[i].childNodes.length > 0) collectBeanFields(children[i],fields);
		var node = children[i];
		let text = getNodeText(node);
		if (text == null) continue;
		
		fields.push(node);
	}
	return fields;
}
function getNodeText(node) {
	let text = node.innerText;
	if (text == null || text.indexOf(beanPrefix) == -1) {
		text = node.value;
		if (typeof text != 'number')
			if (text == null || text.indexOf(beanPrefix) == -1) text = node.nodeValue;
		if (text == null || typeof text == 'number' || text.indexOf(beanPrefix) == -1) return null;
	}
	return text;
}
function setNodeText(node,value,pattern,readonly) {
	if (typeof value == 'object' && value != null) return; 
	if (readonly) node.readOnly = true;
	if (value == null) value = "";
	let text = node.innerText;
	if (text != null && text.indexOf(pattern) != -1) node.innerText		= text.replace(pattern,value); 
	text = node.value;
	if (typeof text != 'number' && text != null && text.indexOf(pattern) != -1) node.value = text.replace(pattern,value); 
	text = node.nodeValue;
	if (text != null && text.indexOf(pattern) != -1) node.nodeValue		= text.replace(pattern,value); 
	text = node.textContent;
	if (text != null && text.indexOf(pattern) != -1) node.textContent	= text.replace(pattern,value); 
}
function getBeanName(node) {
	let text = getNodeText(node);
	if (text == null) return text;
	const wrkArray = text.split(beanPrefix);
	for (var j=0;j<wrkArray.length;j++) {
		var ndx = wrkArray[j].indexOf(beanSuffix);
		if (ndx == -1) continue;
		var beanName = wrkArray[j].substring(0,ndx);
		var ndx = beanName.indexOf(".");
		beanName = beanName.substr(0,ndx);
	}
	return beanName;
}
function getBeansFromCallee(beans) {
	var beanReq = _RESTBASELOGIN+"/beans/"+encodeURIComponent(JSON.stringify(beans));
	var obj = new ajaxObj(beanReq);
	obj.ajaxFunc = function(objResp) {
		var serverJson = JSON.parse(objResp.ajaxmsg);
		populateFromServerJson(serverJson);
	}
	ajaxRequest(obj,"GET");
}
*//*function getBeansFromServer(beans) {
	var beanReq = _RESTBASELOGIN+"/geans/"+encodeURIComponent(JSON.stringify(beans));
	var obj = new ajaxObj(beanReq);
	obj.ajaxFunc = function(objResp) {
		var serverJson = JSON.parse(objResp.ajaxmsg);
		populateFromServerJson(serverJson);
	}
	ajaxRequest(obj,"GET");
}
function populateFromServerJson(serverJson) {
	let fields = [];
	fields = collectBeanFields(document.body,fields);
	const beanJsonArray = serverJson["beans"];
	for (let element of fields) {
		var pattern = getNodeText(element);
		if (pattern == null) continue;
		
		var items = pattern.replace(beanPrefix,"").replace(beanSuffix,"").split(".");
		for (var j=0,jlen=beanJsonArray.length;j<jlen;j++) {
			var beanJson = beanJsonArray[j];
			const readonly = beanJson["readonly"];
			for (var k=1,klen=items.length;k<klen;k++) {
				beanJson = beanJson[items[k]];
				if (beanJson == null) break;
			}
			setNodeText(element,beanJson,pattern,readonly);
		}
	}
}
function chosen(parm) {
	alert(parm.value);	
}*/