function setsizeImgs(parm) {
	var wrkImg = findElement(parm);
	if (wrkImg == null) return;
	var nh = wrkImg.naturalHeight;
	var nw = wrkImg.naturalWidth;
	if (nw >= nh) {
		wrkImg.height = Math.round(200*(nh/nw));
		wrkImg.width = 200;
	} else  {
		wrkImg.width = Math.round(200*(nw/nh));
		wrkImg.height = 200;
	}
}
function resizeImgs() {
	setsizeImgs('img1');
	setsizeImgs('img2');
	setsizeImgs('img3');
}
function bldNode(msg) {
	if (ajaxError) {
		alert("must login/login using id with the correct priority-level (type)<br>if you are loggedin you must log-out");
		return;
	}
	var node = document.createTextNode(msg);
	var tempid = document.createElement("P"); 
	tempid.id = "tempid";
	tempid.appendChild(node);                                          // Append the text to <p>
	document.body.appendChild(tempid);
	tempid.style.visibility = "hidden";
}
function stripTags(parm) {
	msg = parm.replace("<html>","");
	msg = msg.replace("<body>","");
	msg = msg.replace("</body>","");
	msg = msg.replace("</html>","");
	msg = msg.trim();
	return msg;
}
function createBirthDate() {
	createYearDropdown();
	createMonthDropdown();
	createDayDropdown();
	return false;
}
function createYearDropdown() {
    var min = 1900,
    max = 2021,
    years = document.getElementById('yeardropdown');

    for (var i = max; i>min; i--){
       var opt = document.createElement('option');
 	   if (i == max) {
		   opt.value = "year";
		   opt.innerHTML = "year";
		   
	   } else {
		   opt.value = i;
		   opt.innerHTML = i;
	   }
       years.appendChild(opt);
    }
}
function createMonthDropdown() {
    var min = 0,
    max = 12,
	months = ["month","january","february","march","april","may","june","july","august","september","october","november","december"];
    years = document.getElementById('monthdropdown');

    for (var i = 0; i<=max; i++){
       var opt = document.createElement('option');
       opt.value = i;
       opt.innerHTML = months[i];
       years.appendChild(opt);
    }
}
function createDayDropdown() {
    var min = 1,
    max = 32,
    days = document.getElementById('daydropdown');

    for (var i = 0; i<max; i++){
       var opt = document.createElement('option');
	   if (i == 0) {
		   opt.value = "day";
		   opt.innerHTML = "day";
		   
	   } else {
		   opt.value = i;
		   opt.innerHTML = i;
	   }
       days.appendChild(opt);
    }
}
function loginTempid(){ 
	var obj = new ajaxObj('genTempId.jsp');
	obj.ajaxFunc = function(objResp) {
		var resp = document.createElement('div');
		resp.innerHTML = objResp.ajaxmsg.trim();
		const output = resp.innerText.replace(/^\s+|\s+$/g, '');
		if (output.length == 0) alert("ajax request return no output");
		openPage('addFamilyTree.jsp');
	}
	ajaxRequest(obj,"GET");
	return false;
}
function resetEmail() {
	var obj = new ajaxObj('ajaxs/ajaxResetEmail.jsp');
	obj.ajaxFunc = function(objResp) {
	}
	ajaxRequest(obj,"GET");
	return false;
}
document.onclick = function(ev) {
	if (blinkerTID != null) window.clearInterval(blinkerTID);
	blinkerTID = null;
}
function onloadAddFamilyTree() {
	snippets(verifyLogin);
}
function verifyLogin() {
	let login = getParameterByName('login');
	if  (!isLoggedin(login)) return false;
	let loginJson = JSON.parse(login);
	registerLoginToServer(loginJson);
}
function registerLoginToServer(jsonBody) {	
	var page = _SERVICE+"/loginRegister";
	var obj = new ajaxObj(page);
	obj.body = JSON.stringify(jsonBody);
	obj.ajaxFunc = function(objResp) {
		var x=0;
	}
	ajaxRequest(obj,"POST");
}
function isLoggedin(login) {
	var loginReq = document.getElementById("loginAct");
	var logoutReq = document.getElementById("logoutAct");
	loginReq.className = 'dontshowit';
	logoutReq.className  = 'showit';
	if (login == null) {
		loginReq.className = 'showit';
		logoutReq.className = 'dontshowit';
		const msg = "<br/><b>you must login to use service=</b>"+_SERVICE+"<br/><a href='javascript:loginService()'>Click here to login</a><br/>";
		setMsg(msg,'infoMessage');
		return false;
	}
	return true;
}
function serverResp(msg) {
	var wrkJson = JSON.parse(msg);
	if (!wrkJson["srvcompleted"]) {
		setMsg(wrkJson["infomsg"],"infoMessage");
		return false;
	}
//	let wrkstr = JSON.stringify(wrkJson["users"][0]);
//	wrkstr = encodeURIComponent(wrkstr);
	let url = wrkJson["html"];
	//+"?"+_SERVICE+"="+wrkstr;
	openPage(url);
	return false;
}

function restAddFamily() {
	let inputs = [];
	inputs["firstname1"] = document.getElementById("firstname1");
	inputs["lastname1"]  = document.getElementById("lastname1");
	inputs["firstname2"] = document.getElementById("firstname2");
	inputs["lastname2"]  = document.getElementById("lastname2");
	inputs["email"]      = document.getElementById("email");
	if (!checkInputs(inputs)) return false;
	if (!checkEmailFormat(inputs)) return false;
	
	let jsonBody = bldJson(inputs);
	var page = _SERVICE+"/add/familytree";
	var obj = new ajaxObj(page);
	obj.body = JSON.stringify(jsonBody);
	obj.ajaxFunc = function(objResp) {
		serverResp( objResp.ajaxmsg.trim());
	}
	ajaxRequest(obj,"POST");
	return false;
}
function checkEmailFormat(inputs) {
	let email = inputs["email"];
	const regex = /^[a-zA-Z].*\@.*\..*$/;
	if (!email.value.match(regex)) {
		findElement('infoMessage').innerText = "invalid email format "+email.value;
		return false;
	}
	return true;
}
function checkInputs(inputs) {
	for (index in inputs) {
		element = inputs[index];
		const value = element.value;
		if (value == null || value.length == 0) {
			element.focus();
			findElement('infoMessage').innerText ="It is a required field. You must enter a value";
			return false;
		} 
	}
	return true;
}
function bldJson(inputs) {
	json = {};
	for (index in inputs) {
		element = inputs[index];
		json[index] = element.value;
	}
	return json;
}
