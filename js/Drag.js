function Drag(name){
    var _this = this;
    this.oDiv = document.querySelector('.'+name);
    this.disX = 0;
    this.disY = 0;
    this.oDiv.onmousedown = function(e){
        _this.down(e);
        return false;
        
    }
}

Drag.prototype.down = function(e){
    var _this = this;
    var e = e || event;
    this.disX = e.clientX - this.oDiv.offsetLeft;
    this.disY = e.clientY - this.oDiv.offsetTop;

    document.onmousemove = function(e){
        _this.move(e);
    }

    document.onmouseup = this.up;

}

Drag.prototype.move = function(e){
    var e = e || event;
    var left =  e.clientX - this.disX;
    var top = e.clientY - this.disY;
    
    //控制移动范围
    if(left < 0){
    	left = 0;
    }
    if(left > document.documentElement.clientWidth-this.oDiv.offsetWidth){
    	left = document.documentElement.clientWidth-this.oDiv.offsetWidth;
    }
    
     if(top < 0){
    	top = 0;
    }
    if(top > document.documentElement.clientHeight-this.oDiv.offsetHeight){
    	top = document.documentElement.clientHeight-this.oDiv.offsetHeight;
    }
    
    this.oDiv.style.left =left + 'px';
    this.oDiv.style.top = top + 'px';
}

Drag.prototype.up=function(e){
    document.onmousemove = document.onmouseup = null;
}

