
function doNavigate(name) {
	/*alert(name);*/
	/*document.all.hideShow.style.visibility = 'hidden'; */
	hideAll();
	document.getElementById(name).classList.remove('hide');
	document.getElementById(name).classList.add('show');
}

function hideAll() {
	var modules = document.getElementsByClassName('module');
	for (var i=0,len=modules.length; i<len; i++) {
		modules[i].classList.remove('show');
		modules[i].classList.add('hide');
	}
}
