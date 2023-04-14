function fadeOut(element) {
	if (element == null) return;
	
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
			if (document.getElementById('fadeIn'))
				document.getElementById('fadeIn').style.display = 'block';
			if (document.getElementById('fadeOut'))
				document.getElementById('fadeOut').style.display = 'none';
        }
        element.style.opacity = op;
        op -= op * 0.1;
    }, 50);
	return false;
}
function fadeIn(element) {
	if (element == null) return;
	
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
 			if (document.getElementById('fadeIn'))
				document.getElementById('fadeIn').style.display = 'none';
			if (document.getElementById('fadeOut'))
				document.getElementById('fadeOut').style.display = 'block';
        }
        element.style.opacity = op;
        op += op * 0.1;
    }, 10);
	return false;
}
function findSetId(formid,nam) {
	var namVar = document.getElementById(nam);
	if (namVar) return namVar;
	namVar = document.getElementById(formid+":"+nam);
	if (namVar) return namVar;
	
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
