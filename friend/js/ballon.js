//要使用面向对象的思维来开发
//定义一个气球对象
function Balloon(pic){
	//盒子
	this.div=document.createElement("div");
	
	//初始位置
	this.left = randomRange(0,1000);
	this.top = randomRange(0,600);
	//背景颜色
	if(pic == null){
		this.bg = randomColor();//0-255
		//半径 范围20~80
		this.r=Math.random()*60+40;
		//运行速度
		this.speedX = randomRange(-5,5);
		this.speedY = randomRange(-5,5);
	}else{
		this.bg = pic;
		this.r=80;
		//运行速度
		this.speedX = randomRange(-3,3);
		this.speedY = randomRange(-3,3);
	}
	
}
//绘制气球 原型概念
Balloon.prototype.drawBalloon = function(parent){
	this.parent = parent;
	var style = this.div.style;
	this.div.style.width = this.r * 2 + "px";
	this.div.style.height = this.r * 2 + "px";
	style.left = this.left + "px";
	style.top = this.top + "px";
	style.background = this.bg;
	parent.appendChild(this.div);
}
//让气球动起来
Balloon.prototype.run = function(){
	//获取父容器宽高
	var maxLeft = this.parent.offsetWidth - this.r * 2;
	var maxTop = this.parent.offsetHeight - this.r * 2;

	var ts = this;
	//定时器
	setInterval(function(){
		//获取左边移动的距离
		var left = ts.div.offsetLeft + ts.speedX;
		//获取上边移动的距离
		var top = ts.div.offsetTop + ts.speedY;

		//判断边界位置
		if(left <= 0){
			left = 0;
			ts.speedX *= -1;
		}

		if(top <= 0){
			top = 0;
			ts.speedY *= -1;
		}

		if(left >= maxLeft){
			left = maxLeft;
			ts.speedX *= -1;
		}

		if(top >= maxTop){
			top = maxTop;
			ts.speedY *= -1;
		}


		//开始移动
		ts.div.style.left = left + "px";
		ts.div.style.top = top + "px";
	},20);
}

//封装一个指定范围的随机函数
function randomRange(min,max){

	return Math.random()*(max-min)+min;
}

//封装随机颜色
function randomColor(){
	var r = randomRange(0,255);
	var g = randomRange(0,255);
	var b = randomRange(0,255);
	var a = randomRange(0,1);
	return "rgba("+r+","+g+","+b+","+a+")";
}