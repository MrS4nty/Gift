/***********获取设备屏幕***********/
var viewSize = (function () {
	var pageWidth = window.innerWidth;
	var pageHeight = window.innerHeight;
	if (typeof pageWidth != 'number') {
		if (document.compatMode == 'CSS1Compat') {
			pageHeight = document.documentElement.clientHeight;
			pageWidth = document.documentElement.clientWidth;
		} else {
			pageWidth = document.body.clientWidth;
			pageHeight = document.body.clientHeight;
		}
	}
	if (pageWidth >= pageHeight) {
		pageWidth = pageHeight * 9 / 16;
	}
	pageWidth = pageWidth > 414 ? 414 : pageWidth;
	pageHeight = pageHeight > 736 ? 736 : pageHeight;
	return {
		width: pageWidth,
		height: pageHeight
	};
})();

/**********获取兼容各浏览器的API**********/
(function () {
	var lastTime = 0;
	var prefixes = 'moz webkit ms o'.split(' ');
	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame;
	var prefix;
	for (var i = 0; i < prefixes.length; i++) {
		if (requestAnimationFrame && cancelAnimationFrame) {
			break;
		}
		prefix = prefixes[i];
		requestAnimationFrame = requestAnimationFrame || window[prefix + 'requestAnimationFrame'];
		cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'cancelAnimationFrame'];
	}
	if (!requestAnimationFrame || !cancelAnimationFrame) {
		requestAnimationFrame = function (callback) {
			var currTime = new Date.getTime();
			var callTime = Math.max(0, 16 - (currTime - lastTime));
			var timer = window.setTimeout(function () {
				callback(currTime + callTime);
			}, callTime);
			lastTime = currTime + callTime;
			return timer;
		};
		cancelAnimationFrame = function (timer) {
			window.clearTimeout(timer);
		}
	}
	window.requestAnimationFrame = requestAnimationFrame;
	window.cancelAnimationFrame = cancelAnimationFrame;
})();

/**********global**********/
var canvas = document.getElementById('my-canvas'),
	startBtn = document.getElementById('restart'),
	crc = canvas.getContext('2d'),
	img = new Image(),
	k = viewSize.height / 600,
	canClick,
	gameover,
	canCount,
	playing,
	timer,
	ground,
	bird,
	score,
	pies;

/**********init**********/
img.src = './img/sprite.png';
img.onload = start;
canvas.width = viewSize.width;
canvas.height = viewSize.height;
init();
function init() {
	canClick = true;
	gameover = false;
	canCount = true;
	playing = false;
	pies = [];
	startBtn.style.display = 'none';
	ground = new Ground();
	bird = new Bird();
	score = new Score();
	createPie();
}

function clear() {
	ground = null;
	bird = null;
	for (var i = 0; i < pies.length; i++) {
		pies[i] = null;
	}
	pies = [];
}

function start() {
	check();
	if (gameover) {
		crc.drawImage(img, 170, 990, 300, 90, Math.ceil(viewSize.width * 0.5 - k * 277 * 0.5), Math.ceil(200 / 800 * viewSize.height), 277 * k, 75 * k);
		crc.drawImage(img, 550, 1005, 160, 90, Math.ceil((viewSize.width - 160 * k) * 0.5), Math.ceil(400 / 800 * viewSize.height), 160 * k, 90 * k);
		startBtn.style.display = 'block';
		startBtn.style.width = 160 * k + 'px';
		startBtn.style.height = 90 * k + 'px';
		startBtn.style.left = Math.ceil((viewSize.width - 160 * k) * 0.5) + 'px';
		startBtn.style.top = Math.ceil(400 / 800 * viewSize.height) + 'px';
		cancelAnimationFrame(timer);
		clear();
	} else {
		crc.clearRect(0, 0, viewSize.width, viewSize.height);
		crc.drawImage(img, 0, 0, 800, 600, 0, 0, Math.ceil(k * 800), viewSize.height);
		if (playing) {
			bird.draw();
			if (pies[0].canX <= -pies[0].canW && pies.length == 4) {
				pies[0] = null;
				pies[1] = null;
				pies.shift();
				pies.shift();
				canCount = true;
			}
			if (pies[0].canX <= 0.5 * (viewSize.width - pies[0].canW) && pies.length == 2) {
				createPie();
			}
			for (var i = 0, len = pies.length; i < len; i++) {
				pies[i].draw();
			}
		} else {
			crc.drawImage(img, 170, 900, 300, 90, Math.ceil((viewSize.width - 277 * k) * 0.5), Math.ceil(200 / 800 * viewSize.height), 277 * k, 75 * k);
			crc.drawImage(img, 170, 1150, 230, 150, Math.ceil((viewSize.width - 200 * k) * 0.5), Math.ceil(400 / 800 * viewSize.height), 200 * k, 150 * k);
		}
		score.draw();
		ground.draw();
		timer = requestAnimationFrame(start);
	}
}


/***********画分数***********/
function Score() {
	this.imgX = 900;
	this.imgY = 400;
	this.imgW = 36;
	this.imgH = 54;
	this.canW = Math.ceil(36 * k);
	this.canH = Math.ceil(54 * k);
	this.canY = Math.ceil(50 / 800 * viewSize.height);
	this.canX = Math.ceil(viewSize.width / 2 - this.canW / 2);
	this.score = 0;
}
Score.prototype.draw = function () {
	var aScore = ('' + this.score).split('');
	var len = aScore.length;
	this.canX = 0.5 * (viewSize.width - (this.canW + 10) * len + 10);
	for (var i = 0; i <= len; i++) {
		var num = parseInt(aScore[i]);
		var imgX, imgY;
		if (num < 5) {
			imgX = this.imgX + num * 40;
			imgY = 400;
		} else {
			imgX = this.imgX + (num - 5) * 40;
			imgY = 460;
		}
		var canX = this.canX + (this.canW + 2) * i;
		crc.drawImage(img, imgX, imgY, this.imgW, this.imgH, canX, this.canY, this.canW, this.canH);
	}
};

/***********画地板***********/
function Ground() {
	this.imgX = 0;
	this.imgY = 600;
	this.imgW = 600;
	this.imgH = 112;
	this.canW = Math.ceil(800 * k);
	this.canH = Math.ceil(112 * k);
	this.canX = 0;
	this.canY = viewSize.height - this.canH;
}

Ground.prototype.draw = function () {
	if (this.imgX > 24) {
		this.imgX = 0;
	}
	crc.drawImage(img, this.imgX, this.imgY, this.imgW, this.imgH, this.canX, this.canY, this.canW, this.canH);
	this.imgX += 2;
};


/***********画小鸟***********/
function Bird() {
	this.imgX = [170, 222, 275];
	this.imgY = [750, 750, 750];
	this.imgW = [34, 34, 34];
	this.imgH = [24, 24, 24];
	var canX = Math.ceil(110 / 450 * viewSize.width);
	var canY = Math.ceil(380 / 800 * viewSize.height);
	var canW = Math.ceil(34 * k);
	var canH = Math.ceil(24 * k);
	this.canX = [canX, canX, canX];
	this.canY = [canY, canY, canY];
	this.canW = [canW, canW, canW];
	this.canH = [canH, canH, canH];
	this.index = 0;
	this.count = 0;
	this.step = 1;
	this.t = 0;
	this.y = [canY, canY, canY];
}

Bird.prototype.draw = function () {
	var index = this.index;
	this.count++;
	if (this.count == 6) {
		this.index += this.step;
		this.count = 0;
	}
	if ((this.index == 2 && this.step == 1) ||
		(this.index == 0 && this.step == -1)) {
		this.step = -this.step;
	}

	var c = 0.7 * 60;
	var mingY = -85 * viewSize.height / 800;
	var a = -mingY * 3 / (c * c);
	var dy = a * this.t * (this.t - c);

	if (this.y[0] + dy < 0) {
		canClick = false;
	} else {
		canClick = true;
	}
	for (var i = 0; i < 3; i++) {
		this.canY[i] = this.y[i] + Math.ceil(dy);
	}
	this.t++;
	crc.drawImage(img, this.imgX[index], this.imgY[index], this.imgW[index], this.imgH[index], this.canX[index], this.canY[index], this.canW[index], this.canH[index]);
};

/***********画水管***********/
function Pie() {
	this.imgY = 751;
	this.imgW = 52;
	this.imgH = 420;
	this.canX = Math.ceil(viewSize.width) + 2;
	this.canW = Math.ceil(80 / 450 * viewSize.width);
	this.canH = Math.ceil(this.canW * 420 / 52);
}

function drawPie() {
	var speed = k * 2;
	this.canX -= speed;
	crc.drawImage(img, this.imgX, this.imgY, this.imgW, this.imgH, this.canX, this.canY, this.canW, this.canH);
}

//上水管类
function UpPie(top) {
	Pie.call(this);
	this.imgX = 70;
	this.canY = top - this.canH;
	this.draw = drawPie;
}
UpPie.prototype = new Pie();

//下水管类
function DownPie(top) {
	Pie.call(this);
	this.imgX = 0;
	this.canY = top + Math.ceil(150 / 800 * viewSize.height);
	this.draw = drawPie;
}
DownPie.prototype = new Pie();

function createPie() {
	var minTop = Math.ceil(90 / 800 * viewSize.height);
	var maxTop = Math.ceil(390 / 800 * viewSize.height);
	var top = minTop + Math.ceil(Math.random() * (maxTop - minTop));
	pies.push(new UpPie(top));
	pies.push(new DownPie(top));
}

/***********Check函数,检查碰撞还是得分***********/
function check() {
	if (ground.canY - bird.canY[0] - bird.canH[0] <= 0) {
		gameover = true;
		return;
	}
	function isOverLay(rect1, rect2) {
		var flag = true;
		if (rect1.top > rect2.bottom || rect1.bottom < rect2.top || rect1.right < rect2.left || rect1.left > rect2.right) {
			flag = false;
		}
		return flag;
	}
	var birdRect = {
		top: bird.canY[0],
		bottom: bird.canY[0] + bird.canH[0],
		left: bird.canX[0],
		right: bird.canX[0] + bird.canW[0]
	};
	for (var i = 0; i < pies.length; i++) {
		var r = pies[i];
		var pieRect = {
			top: r.canY,
			bottom: r.canY + r.canH,
			left: r.canX,
			right: r.canX + r.canW
		};
		if (isOverLay(pieRect, birdRect)) {
			gameover = true;
			return;
		}
	}
	if (bird.canX[0] > pies[0].canX + pies[0].canW && canCount) {
		canCount = false;
		score.score++;
	}
}

/***********点击***********/
document.ontouchstart = document.onmousedown = function (evt) {
	if (gameover) {
		return;
	}
	if (playing) {
		if (canClick) {
			for (var i = 0; i < 3; i++) {
				bird.y[i] = bird.canY[i];
			}
			bird.t = 0;
		} else {
			return;
		}
	} else {
		playing = true;
	}
	var evt = evt || window.event;
	if (evt.preventDefault) {
		evt.preventDefault();
	} else {
		evt.returnValue = false;
	}
};
/***********点击restart***********/
startBtn.ontouchstart = startBtn.onmousedown = function (evt) {
	var evt = evt || window.event;
	if (evt.stopPropagation) {
		evt.stopPropagation();
	} else {
		evt.cancelable = false;
	}
	init();
	console.log('in');
	timer = requestAnimationFrame(start);
};
