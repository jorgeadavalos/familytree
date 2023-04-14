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
function restAddFamily() {
}