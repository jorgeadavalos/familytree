ajaxObjs = {};
function ajaxObj(name) {
	this.ajaxURL     	= name;
	this.ajaxDone    	= false;
	this.ajaxError   	= false;
	this.ajaxFunc    	= null;
	this.ajaxReqHeaders	= {};
	this.body;
	this.ajaxmsg;
}
function ajaxRequest(obj,method) {
	var pageRequest;
	if (window.XMLHttpRequest) pageRequest = new XMLHttpRequest();
	else if (window.ActiveXObject)  pageRequest = new ActiveXObject("Microsfot.XMLHTTP"); 
		 else
			return;
	
	var readyStateChange = function() {
		if (pageRequest.readyState == 4 ) {
			if (pageRequest.status != 200) obj.ajaxError = true;
			serverGetData(pageRequest.responseText,obj);
		}
	};
	pageRequest.onreadystatechange = readyStateChange;
	
	obj.ajaxDone  = false;
	let random = Math.random().toString(36).substring(7);
	let tagSeparator = '&'
	
	if (obj.ajaxURL.indexOf('?') == -1) tagSeparator = '?';
	obj.ajaxURL += tagSeparator+"random="+random;
	pageRequest.open(method,obj.ajaxURL,true);
	setHeaders(obj,pageRequest);
	pageRequest.send(obj.body);
}
function serverGetData(msg,obj) {
	obj.ajaxDone  = true;
	obj.ajaxmsg = msg;
	if (obj.ajaxFunc != null) obj.ajaxFunc(obj);
}
function setHeaders(obj,req) {
	req.setRequestHeader("Content-Type", "application/json");
	keys = Object.keys(obj.ajaxReqHeaders);
	for (var i=0;i<keys.length;i++) {
		req.setRequestHeader(keys[i],obj.ajaxReqHeaders[keys[i]]);
	}
}