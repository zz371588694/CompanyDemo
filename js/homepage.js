var common = {}

common.init = function(){
	var settingDialog =  new Dialog('personSetting',{pos:'center',title:'个人设置',resize:true,width:250,height:200,drag:true,modal:true});
	var btnSetting = document.querySelector('#setting');
	common.tool.addEvent(btnSetting,'click',function(){
		settingDialog.Open();
	})
}

//顶部下拉菜单
common.topDrop = function(){
	var oPerson = document.querySelector('#person');
	var oPersonMenu = document.querySelector('#person_menu');
	this.tool.addEvent(oPerson, 'mouseover', function() {
		oPersonMenu.style.display = 'block';
	})
	
	this.tool.addEvent(oPerson, 'mouseout', function() {
		oPersonMenu.style.display = 'none';
	})
}

//头部运动和下拉
common.HeadMenuDrop = function(start){
	var _this = this;
	var oHeaderBg = document.querySelector('#headerBg');
	var arrHeadLi = document.querySelectorAll('.header_Menu_Li');
	var arrHeaderChildMenu = document.querySelectorAll('.header_child_menu');
	for(var i = 1; i < arrHeadLi.length; i++) {
			_this.tool.addEvent(arrHeadLi[i], 'mouseover', function() {
				//将所有子菜单隐藏
				for(var j = 0;j<arrHeaderChildMenu.length;j++){
					arrHeaderChildMenu[j].style.display = 'none';
				}
				
				//运动效果
				var target = _this.tool.getOffset(this,'left');
				_this.flexMove(oHeaderBg, target,'left',null);
				var childDrop = this.querySelector('ul');
				
				if(childDrop){
					childDrop.style.display = 'block';
					_this.flexMove(childDrop,75,'top',null);
				}
			})
	
			_this.tool.addEvent(arrHeadLi[i], 'mouseout', function() {
				//回到原点
				var target = _this.tool.getOffset(arrHeadLi[start],'left');
				_this.flexMove(oHeaderBg,target,'left',null);
				var childDrop = this.querySelector('ul');
				if(childDrop){
					_this.flexMove(childDrop,40,'top',null);
				}
				for(var j = 0;j<arrHeaderChildMenu.length;j++){
					arrHeaderChildMenu[j].style.display = 'none';
				}
			})
		}
}

common.flexMove = function(moveEle, target,attr,callback){
	var _this = this;
		clearInterval(moveEle.timer);
		var speed = 0;
		
		//启动定时器运动
		moveEle.timer = setInterval(function() {
			//获取各元素当前位置
			var curPos = parseInt(_this.tool.getStyle(moveEle, attr));
			//方向改变和速度衰减
			speed += (target - curPos) / 10;
			speed = speed * 0.7;
			if(Math.abs(target - curPos) <= 1 && Math.abs(speed) <= 1) {
				speed = 0;
				curPos = target;
				clearInterval(moveEle.timer);
				if(callback){
					callback();
				}
			}
			moveEle.style[attr] = curPos + speed + 'px';
		}, 30)
}

common.HeadImgInit = function(){
		var oImgContainer = document.querySelector('#imgList');
		var arrHeaderImg = document.querySelectorAll('#imgList li');
		for(var i =1;i<arrHeaderImg.length;i++){
				arrHeaderImg[i].style.left = arrHeaderImg[i].offsetWidth * i+'px';
		}
}

common.bufferMove = function(){
	var _this = this;
	var moveEle = document.querySelector('#imgList');
	var arrImgList = moveEle.querySelectorAll('#imgList li');
	var arrOList = document.querySelectorAll('#headerMenuClick a');
	var width = arrImgList[0].offsetWidth;
	var index = 0;
	clearInterval(moveEle.move);
	moveEle.move = setInterval(move,3000);
	arrOList[0].setAttribute('class','active');
	
	//鼠标在图片上时，取消定时器
	for(var j = 0;j<arrImgList.length;j++){
		_this.tool.addEvent(arrImgList[j],'mouseover',function(){
			clearInterval(moveEle.move);
		})
		
		_this.tool.addEvent(arrImgList[j],'mouseout',function(){
			moveEle.move = setInterval(move,3000);
		})
	}
	
	//click事件
	for(var i = 0;i<arrOList.length;i++){
		_this.tool.addEvent(arrOList[i],'click',(function(i){
			return function(){
				clearInterval(moveEle.move);
				/*clearInterval(moveEle.bufferTimer);*/
				move(i-1);
				moveEle.move = setInterval(move,3000);
			}
		})(i))
	}
	
	function move(){
		if(arguments.length >0){
			index = arguments[0];
		}
		for(var i =0;i<arrOList.length;i++){
			arrOList[i].className = '';
		}
		
		clearInterval(moveEle.bufferTimer);
		if(index == arrImgList.length - 1){
			index = 0;
		}else{
			index++;
		}
		
		arrOList[index].setAttribute('class','active');
		moveEle.bufferTimer = setInterval(function(){
			var target = -width * index;
			var curPos = parseInt(_this.tool.getStyle(moveEle,'left'));
			var speed = (target - curPos)/10;
			speed = speed > 0? Math.ceil(speed):Math.floor(speed);
			if(Math.abs(speed) == 0){
				clearInterval(moveEle.bufferTimer);
			}
			moveEle.style.left= curPos +speed+ 'px';
	},30)
	}
	
}



common.tool = {}
common.tool.addEvent = function(obj,oper,fun){
	if(obj.addEventListener) { //标准
			obj.addEventListener(oper, fun, false);
		} else { //IE
			obj.attachEvent('on' + oper, function() {
				fun.call(obj);
			})
		}
}
common.tool.getOffset = function(obj, attr){
	var dis = 0;
		while(obj) {
			if(obj.nodeName.toUpperCase() == 'UL') {
				return dis;
			}
		attr = attr.substring(0,1).toUpperCase() + attr.substring(1,attr.length);
		dis += obj['offset'+attr]
		obj = obj.parentNode;
		}
}
common.tool.getStyle = function(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

window.onload = function() {
	
		common.init ();
	
		//绑定顶部下拉框事件
		common.topDrop();
	
		//Header菜單事件
		common.HeadMenuDrop(1);

		//初始化图片布局
		common.HeadImgInit();
		
		//
		common.bufferMove();
}

