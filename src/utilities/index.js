
export const deepObjectMerge = (FirstOBJ = {}, SecondOBJ) => {
	for (var key in SecondOBJ) {
		FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === "[object Object]" ?
			deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key];
	}
	return FirstOBJ;
}

export const getQueryString = (name) => {
	let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`)
	let hash = window.location.hash
	let search = hash.split('?')
	let r = search[1] && search[1].match(reg)
	if (r != null) return r[2]; return ''
}

export const queryString = (url, query) => {
	let str = []
	for (let key in query) {
		str.push(key + '=' + query[key])
	}
	let paramStr = str.join('&')
	return paramStr ? `${url}?${paramStr}` : url
}

export const $ = (id) => {
	return document.getElementById(id);
};

export const getCss = (o, key) => {
	return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
};


export const getStyle = (o, key) => {
	return Number(getCss(o, key).replace(/px/, ''));
}

export const mapToObject = (array, key) => {
	let obj = {};
	for (let index in array) {
		obj[array[index][key]] = array[index]
	}
	return obj;
}

export const canvasTextAutoLine = (str, ctx, canvasWidth, initX, initY, lineHeight) => {
	let lineWidth = 0;
	let lastSubStrIndex = 0;
	for (let i = 0; i < str.length; i++) {
		lineWidth += ctx.measureText(str[i]).width;
		if (lineWidth > canvasWidth - initX) {//减去initX,防止边界出现的问题
			ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
			initY += lineHeight;
			lineWidth = 0;
			lastSubStrIndex = i;
		}
		if (i === str.length - 1) {
			ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
		}
	}
}

export const getURLParamsString = (name) => {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
};

export const loadImageAsync = (url) => {
	return new Promise(function (resolve, reject) {
		const image = new Image();

		image.onload = function () {
			resolve(image);
		};

		image.onerror = function () {
			reject(new Error('Could not load image at ' + url));
		};

		image.src = url;
	});
}

export const getBase64Image = (img) => {
	let canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	let ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);
	let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
	let dataURL = canvas.toDataURL("image/" + ext);
	return dataURL;
};

export const insertAfter = (newElement,targetElement) => {

    var parent=targetElement.parentNode;    //获取父级元素节点

    if(parent.lastChild===targetElement){    //如果目标元素是父级元素的最后一个子元素
        parent.appendChild(newElement);
    }else{  //如果不是最后一个子元素，则调用insertBefore函数     
       parent.insertBefore(newElement,targetElement.nextSibling); 
    }
}