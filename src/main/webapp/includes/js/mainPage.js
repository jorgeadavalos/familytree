function uploadFilesPrimer(url) {
		genPopUp = window.open(url,"primer","toolbar=no,location=no,scrollbars=yes,directories=no,status=no,menubar=no,resizable=yes,width=500,height=350");
		genPopUp.focus();
}
function verifyInput() {
	return checkRequiredFields();
}
function checkRequiredFields() {
	const form = document.getElementById("formname");
	const field1 = document.getElementById(form.value+":psw");
	const field2 = document.getElementById(form.value+":vpsw");
	const email = document.getElementById(form.value+":email");
	const firstname = document.getElementById(form.value+":firstname");
	const lastname = document.getElementById(form.value+":lastname");

	blinkerTID = setInterval('blinker("#")',500);
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
		return false;
	}
	if (value1 === value2) return true;
	
	findElement('infoMessage').innerText = "fields 'password' and 'verify password' must have the same value";
	return false;
}
function confirmEmail() {
	const value = getParameterByName("jsonitem");
	var page = "familytree/confirmEmail?jsonitem="+encodeURIComponent(value);
	var obj = new ajaxObj(page);
	obj.ajaxFunc = function(objResp) {
		var wrkJson = JSON.parse(objResp.ajaxmsg);
		alert(wrkJson.infomsg); 
		sessionStorage.setItem("register",objResp.ajaxmsg);
		openPage(wrkJson["html"]);
	}
	ajaxRequest(obj,"GET");
}
function openPage(pageName) {
	var genPopUp = window.open(pageName,"_parent");
 }
function loginService() {
	const value = getParameterByName("jsonitem");
	var page = "familytree/login/"+encodeURIComponent(value);
	var obj = new ajaxObj(page);
	obj.ajaxFunc = function(objResp) {
		var wrkJson = JSON.parse(objResp.ajaxmsg);
		var jsonitem = encodeURIComponent(objResp.ajaxmsg);
		localStorage.setItem("caller",objResp.ajaxmsg);
		openPage(wrkJson["html"]+"?caller="+jsonitem);
	}
	ajaxRequest(obj,"GET");
}
function RESTRegister() {
	var page = "familytree/register/";
	var obj = new ajaxObj(page);
	obj.ajaxFunc = function(objResp) {
		var wrkJson = JSON.parse(objResp.ajaxmsg);
		var jsonitem = encodeURIComponent(objResp.ajaxmsg);
		localStorage.setItem("caller",objResp.ajaxmsg);
		openPage(wrkJson["html"]+"?caller="+jsonitem);
	}
	ajaxRequest(obj,"GET");
}