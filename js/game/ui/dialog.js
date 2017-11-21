function Dialog(msg, titleMsg, x, y) {
	// container div
	console.log("creating dialog");
	let dialog = document.createElement("div");
	if (x !== undefined && y !== undefined) {
		dialog.style.top = y + "px";
		dialog.style.left = x + "px";
	} else {
		dialog.style.top = "100px";
		dialog.style.left = "100px";
	}

	dialog.setAttribute('class', 'dialog');

	let content = document.createElement("div");
	content.setAttribute('class', 'dialog-content');
	content.innerHTML = msg;

	let buttons = document.createElement("div");
	buttons.setAttribute('class', 'dialog-buttons');

	let okButton = document.createElement("button");
	okButton.innerHTML = "OK";
	okButton.addEventListener("click", function () {
		document.body.removeChild(dialog);
	});

	buttons.appendChild(okButton);
	content.appendChild(buttons);

	let title = document.createElement("div");
	let titleP = document.createElement("p");
	title.setAttribute('class', 'dialog-title-bar');
	title.appendChild(titleP)
	if (titleMsg !== undefined) {
		titleP.innerHTML = titleMsg;
	} else {
		titleP.innerHTML = "Read Me";
	}

	dialog.appendChild(title);
	dialog.appendChild(content);

	document.body.appendChild(dialog);

	title.addEventListener('mousedown', (event) => {
		let wTop = document.documentElement.scrollTop || document.body.scrollTop;
		let wLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		let mx = event.clientX - wLeft - dialog.style.left.replace("px", "");
		let my = event.clientY - wTop - dialog.style.top.replace("px", "");
		let moveMouseHandler = function (event) {
			let x = event.clientX - wLeft - mx;
			let y = event.clientY - wTop - my;
			dialog.style.left = x + "px";
			dialog.style.top = y + "px";
			document.addEventListener('mouseup', mouseUpHandler);
		};
		document.addEventListener('mousemove', moveMouseHandler);
		let mouseUpHandler = function () {
			document.removeEventListener('mousemove', moveMouseHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		};
	});
}