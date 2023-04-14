var familyNodes	= {};
var root;
var ParentSep 	= "%";
var separator 	= "%";
var memberSep 	= ",";
var leaf		= 'BUTTON';

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
function calcDiagonal(p1x, p1y, p2x, p2y) {
	p3x = p1x;
	p3y = p2y;
	dx = p2x-p3x;
	dy = p3y-p1y;
	hyp = (dx*dx)+(dy*dy);
	hyp = Math.sqrt(hyp);  
	return hyp;
}
function totalCellsInRow(el,ndx) {
	total = 0;
	for (var i = ndx+1;i<el.length;i++) {   	//skip the row class
		if (el[i].id.indexOf("row") == -1) {
			total += 1;
			continue;
		}
		return total;
	}
	return total;
}
function familyNode() {
	id=""; 
	name="";
	children="";
	X="0.0";
	Y="0.0";
	height="0.0";
	width="0.0";
	visited=false;
	bltChildren=false;
}
function getRelationships() {
	var rel1 = document.getElementById('relationships');
	if (rel1 == null || rel1 == undefined) return "";
	var rel = document.getElementById('relationships').innerText;
	if (rel.trim().length == 0) rel = document.getElementById('relationships').value;
	if (rel == undefined) return "";
	return rel.trim();
}
function addFamilyNode(name,children) {
	var obj = new familyNode();
	if (familyNodes.hasOwnProperty(name)) {
		obj = familyNodes[name];
	}
	obj.name = name;
	obj.children = children;
	obj.visited = false;
	obj.bltChildren = false;
	familyNodes[name] = obj;
}
function bldFamilyNode() {
	var rel = getRelationships();
	var ancestors = rel.split(ParentSep);
	for (var i=0;i<ancestors.length;i++) {
		if (ancestors[i].trim().length == 0) continue;
		wrkArray = ancestors[i].split("=");
		if (typeof root === 'undefined') root = wrkArray[0];
		addFamilyNode(wrkArray[0],wrkArray[1])

		childArray = wrkArray[1].split(",");
		for (var j=0;j<childArray.length;j++) {
			addFamilyNode(childArray[j],"");
		}
	}
}
function reBldDisplayText() {
	var elements = document.getElementsByTagName(leaf);
	for (var i = 0;i<elements.length;i++) {
		if (elements[i].className.indexOf("box") == -1) continue;
		if (elements[i].innerText.indexOf(";")   == -1) continue; 
		var names = elements[i].innerText.split(";");
		var name = names[1]+" "+names[2];
		elements[i].innerText = name;
	}
}
function populateDIVs(id,className,value) {
		var el = document.createElement(leaf);
		el.id = id;
		el.className=className;
		el.innerText = value;
//		document.body.appendChild(el);
		document.getElementById('treeroot').appendChild(el);
}
function bldFringe(name,flag) {
		var obj = familyNodes[name];
		if (flag) {
			populateDIVs("rowP","tree-cell","");
			populateDIVs("rowP","tree-cell","");
		}
		if (!obj.visited) {
			populateDIVs("","box",name);
			populateDIVs("rowP"+"A","tree-cell","");
			populateDIVs("rowP"+"B","tree-cell","");
		}
		obj.visited = true;
		obj.bltChildren = true;
		
		var childArray = obj.children.split(",");
		for (var j=0;j<childArray.length;j++) {
			if (childArray[j].length == 0) continue;
			populateDIVs("","box",childArray[j]);
			familyNodes[childArray[j]].visited = true;
		}
}
function bldDIVs() {
	populateDIVs("rowP","tree-cell","");
	populateDIVs("rowP","tree-cell","");
	var rel = getRelationships();
	var ancestors = rel.split(ParentSep);
	for (var i=0;i<ancestors.length;i++) {
		if (ancestors[i].trim().length == 0) continue;
		wrkArray = ancestors[i].split("=");
		if (!familyNodes[wrkArray[0]].bltChildren)
			bldFringe(wrkArray[0],true);
		
		var flag = true;
		var childArray = wrkArray[1].split(",");
		for (var j=0;j<childArray.length;j++) {
			if (familyNodes[childArray[j]].children.length > 0) {
				bldFringe(childArray[j],flag);
				flag = false;
			}
		}
	}
}
function updateRelationships() {
	var rel = getRelationships();
	ancestors = rel.split(ParentSep);
	for (var i=0;i<ancestors.length;i++) {
		if (ancestors[i].length == 0) continue;
		wrkArray = ancestors[i].split("=");
		if (!familyNodes.hasOwnProperty(wrkArray[0])) {
			console.log("duplicate node with key="+wrkArray[0]);
			continue;
		}
		familyNodes[wrkArray[0]].children = wrkArray[1];     //[0]=parent name [1]=list of children
		
		childArray = wrkArray[1].split(",");
		var connectBox = document.createElement("div");
		connectBox.id ="connectBox";
		document.body.appendChild(connectBox);
		for (var j=0;j<childArray.length;j++) {
			if (childArray[j].trim().length == 0) continue;
			if (!familyNodes.hasOwnProperty(wrkArray[0])) {
				console.log("children have no parent node="+wrkArray[0]+" "+wrkArray[1]);
				continue;
			}
			connectBox.appendChild(bldLine(wrkArray[0],childArray[j]));
		}
	}
}
function updtFamilyNode(el) {
	if (el.innerText.length == 0) return;
	
	var obj = new familyNode();
	obj.id		= el.id;
	obj.name	= el.innerText;
	obj.X		= el.offsetLeft;
	obj.Y		= el.offsetTop;
	obj.height	= el.clientHeight;
	obj.width	= el.clientWidth;
	familyNodes[el.innerText] = obj;
}
function bldTree() {
	if (getRelationships().length == 0) return;
	
	removeElement('treeroot');
	bldFamilyNode();
	bldDIVs();
	var el;
	var elements = document.getElementById('treeroot').childNodes;
	rowCtr = 0;
	cellCtr = 0;
	cells = 0;
	if (!elements) return;
	for (var i = 0;i<elements.length;i++) {
		if (elements[i].id == undefined) continue;
		if (elements[i].id.indexOf("row") != -1) {
			cells = totalCellsInRow(elements,i);
			rowCtr += 1;
			cellCtr = 0;
			continue;
		} 
		el = elements[i];
		w = window.innerWidth/2 - ((el.clientWidth+2)*cells/2);
		el.style.position = 'absolute';
		el.style.left = w +cellCtr*(el.clientWidth+2);
		el.style.top = rowCtr*30;
		cellCtr += 1; 
		updtFamilyNode(el);
	}
	updateRelationships();
	reBldDisplayText();
	return false;
}
function bldLine(parent,child) {
	var el = document.createElement("SPAN");
	el.style.zIndex="-1";
	el.id = parent+child;
	var objP = familyNodes[parent];
	var objC = familyNodes[child];
	slope=angle(objP.X+objP.width/2,objP.Y+objP.height,objC.X+objC.width/2,objC.Y);
	diagonal = calcDiagonal(objP.X+objP.width/2,objP.Y+objP.height,objC.X+objC.width/2,objC.Y);
	slope += "deg";
	el.style.content = "";
	el.style.position = "absolute";
	el.style.borderBottom = "2px solid black";
	el.style.width = diagonal;
	wrkstr =  "rotate("+slope+")";
	el.style.transform = wrkstr;
	el.style.transformOrigin =  "0 0";
	el.style.left = objP.X+objP.width/2;
	el.style.top = objP.Y+objP.height;
	return el;
}
ajaxMailId = null;
emailList = null;
function ajaxEmailsAccess(parm) {
	ajaxDone  = false;
	var url = "ajaxs/ajaxGetEmailAddress.jsp?parm="+parm;
	ajaxServerReq(url);
	ajaxMailId = setInterval('ajaxMail()',500);
}
function ajaxEmailBodyAccess() {
	ajaxDone  = false;
	var url = "ajaxs/ajaxGetEmailBody.jsp";
	ajaxServerReq(url);
	ajaxMailId = setInterval('ajaxMailBody()',500);
}
function ajaxMail() {
	if (!ajaxDone) return;
	clearInterval(ajaxMailId);
	window.open( "mailto:"+ajaxmsg, "_parent" ); 
} 
function ajaxMailBody() {
	if (!ajaxDone) return;
	clearInterval(ajaxMailId);
	window.open( "mailto:"+emailList+"&body="+ajaxmsg, "_parent" ); 
}
function sendit() {
	var wrkChecked = document.getElementById("checkboxes");
	var checkedList = "";
	for (var i=0;i<wrkChecked.children.length;i++) {
		if(wrkChecked.children[i].childNodes[0].checked) checkedList += wrkChecked.children[i].childNodes[0].name + ",";
	} 
	var url = "ajaxs/ajaxGetEmailAddress.jsp?parm="+checkedList;
	var obj = new ajaxObj(url);
	obj.ajaxFunc = function(objResp) {
		var el2 = document.createElement("div");
		el2.innerHTML = objResp.ajaxmsg;
		window.open( "mailto:"+el2.innerText, "_parent" ); 
	}
	ajaxRequest(obj);
}
function bldEmail() {
	var wrkChecked = document.getElementById("checkboxes");
	emailList = "";
	for (var i=0;i<wrkChecked.children.length;i++) {
		if(wrkChecked.children[i].childNodes[0].checked) {
			var value = wrkChecked.children[i].childNodes[0].name;
			var names = value.split(" ");
			emailList += names[2] + ",";
		}
	} 
	ajaxEmailBodyAccess();
}
function getNameArray( parm) {
	var list = document.getElementById("contacts").value;
	var nameArray = list.split(separator);
	if (parm.trim().length == 0) {
		bldMultipleSelect(list,"Contacts");
		return null;
	}
	return nameArray;
}
function includeEmails(parm,nameArray) {
	var newList = "";
	var includes = parm.trim().split(" ");
	for (var i=0;i<nameArray.length;i++) {
		if (nameArray[i].length == 0) continue;
		var found = false;
		for (var j=0;j<includes.length;j++) {
			if (nameArray[i].indexOf(includes[j]) == -1) continue;
			found = true;
			j = includes.length;
		}
		if (found) newList += nameArray[i]+separator;
	}
	return newList;
}
function excludeEmails(parm,nameArray) {	
	var excludes = parm.trim().split(" ");
	var newList = ""
	for (var i=0;i<nameArray.length;i++) {
		if (nameArray[i].length == 0) continue;
		var found = false;
		for (var j=0;j<excludes.length;j++) {
			if (nameArray[i].indexOf(excludes[j]) == -1) continue;
			found = true;
			j = excludes.length;
		}
		if (!found) newList += nameArray[i]+separator;
	}
	return newList;
}
function refresh() {
	var formid = document.getElementById("formname").value;
	var el = findElement("exclude");
	var list = document.getElementById("contacts").value;
	var nameArray = list.split(separator);
	if (el.value.trim().length == 0) {
		bldMultipleSelect(list,"Contacts");
		return false;
	}
	var newList = excludeEmails(el.value,nameArray);
	el = findElement("include");
	if (el.value.trim().length != 0) {
		newList += includeEmails(el.value,nameArray);
	}
	bldMultipleSelect(newList,"contacts");
	return false;
}
function removeElement(id) {
	var myNode = document.getElementById(id);
	if (myNode == null) return;
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}
	var button1 = document.getElementById("button1");
	if ( button1 != null) document.body.removeChild(button1);
}
function removedynElements() {
	removeElement("selectList");
	removeElement("checkboxes");
}
function bldMultipleSelect(parm,title) {
	removedynElements();
	var div0 = document.getElementById("selectList");

	if (div0 == null)  {
		div0 = document.createElement("div"); 
		div0.className="multiselect fontsize";
		div0.style.overflow = "auto";
		div0.id = "selectList";
		document.body.appendChild(div0);
	}
	div0.style.fontWeight = "bold";
	div0.innerText = "selected "+title;

	var div3 = document.createElement("div");
	div3.id = "checkboxes";
	div3.style.whiteSpace = "nowrap";

	var nameArray = parm.split(separator);
	for (var i=0;i<nameArray.length;i++) {
		if (nameArray[i].length == 0) continue;
		var checkbox = document.createElement("input"); 
		checkbox.type="checkbox";
		checkbox.name= nameArray[i];
		checkbox.defaultChecked = "true";
		checkbox.id = "id"+i;
		var label = document.createElement('label')
		label.htmlFor = "id"+i;
		label.style.display = "block";
		var ndx = nameArray[i].indexOf(";");
		var name = nameArray[i];
		if (ndx != -1) name = nameArray[i].substring(ndx+1);
		label.appendChild(checkbox);
		label.appendChild(document.createTextNode(name));
		div3.appendChild(label);
	}
	div0.appendChild(div3);
}
function parentMembers(parm) {
	var el1 = document.getElementById('parentMembers');
	if (el1 == null) return parm+separator;
	var parents = el1.innerText.split(ParentSep);
	for (var i=0;i<parents.length;i++) {
		var wrk = parents[i].split("=");
		if (parm.trim() == wrk[0].trim()) {
			return wrk[1].replace(new RegExp(memberSep, 'g'), separator)+separator; 			
		}
	}
	return parm+separator;
}
function bldCousins(X,Y) {
	var primos = "";
	Object.keys(familyNodes).forEach(function (key) { 
		var obj = familyNodes[key];
		if (Y > obj.Y && Y < obj.Y+obj.height) {
			primos += parentMembers(obj.name);
		}
	})
	bldMultipleSelect(primos,"cousins");
}
function cousins(X,Y) {
	Object.keys(familyNodes).forEach(function (key) { 
		var obj = familyNodes[key];
		if (obj == null) return;
		if (Y > obj.Y && Y < obj.Y+obj.height && 
			X > obj.X && X < obj.X+obj.width) {
			bldCousins(X,Y);
			bldSendButton();
			return;
		}
	})
}
function bldSubTree(obj) {
	memberList += parentMembers(obj.name);
	if (obj.children == undefined) return;
	var childArray = obj.children.split(memberSep);
	for (var i=0;i<childArray.length;i++) {
		if (childArray[i].trim().length == 0) continue;
		obj = familyNodes[childArray[i]];
		bldSubTree(obj)
	}
}
var memberList = "";
function subTree(X,Y) {
	memberList = "";
	Object.keys(familyNodes).forEach(function (key) { 
		var obj = familyNodes[key];
		if (Y > obj.Y && Y < obj.Y+obj.height && 
			X > obj.X && X < obj.X+obj.width) {
			bldSubTree(obj);
			bldMultipleSelect(memberList,"subTree");
			bldSendButton();
			return;
		}
	})
}
function bldSendButton() {
	button1 	= document.createElement("div");
	button1.id	= "button1";
	button1.innerHTML = "<input type='button' onclick='sendit()' value='send' />";
	document.body.appendChild(button1);
	fadeOut();
}
document.onclick = function(ev) {
	if (blinkerTID != null) window.clearInterval(blinkerTID);
	blinkerTID = null;

	if (ev.originalTarget.tagName == "BUTTON")
		ev.preventDefault();
	var command = document.getElementById('cmd');
	
	var cmd= command.options[command.selectedIndex].text;
	switch (cmd) {
		case "cousins":
			cousins(ev.clientX,ev.clientY);
			break;
		case "subTree":
			subTree(ev.clientX,ev.clientY);
			break;
		default: 
		   return;
	}
}
