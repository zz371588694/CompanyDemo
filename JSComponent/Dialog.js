function Dialog(id,setting){
    this.id = id,
    this.dialog = null;
    this.dialogBg = null;
    this.dialogConetent = null;
    this.setting = {
        pos:'center',
        modal:false,
        title:'Dialog',
        width:'400',
        height:'300',
        resize:false,
        drag:false,
        open:false
    }

    this.Init(setting);
}

//初始化
Dialog.prototype.Init = function(setting){
    for(var attr in setting){
        this.setting[attr] = setting[attr];
    }

    if(!this.DialogList[this.id]){
        this.CreateWindow();
    }

    
}

Dialog.prototype.DialogList = {}

//创建窗体
Dialog.prototype.CreateWindow = function(){
    this.dialogConetent = document.querySelector('#'+this.id);
    if(this.dialogConetent){
        this.dialog = document.createElement('div');
        this.dialog.className = 'dialog';
        this.dialogConetent.style.display = 'none';
     
        //设置弹窗的内容
        var dialogInner = '';
        dialogInner += '<div class="dialog_title">';
        dialogInner += '<span>'+this.setting.title+'</span>';
        dialogInner += ' <a id="closeDialog" href="javascript:;" class="close"></a>';
        dialogInner +='</div>';
        dialogInner +=' <div class="content">';
        dialogInner += this.dialogConetent.innerHTML;
        dialogInner += '</div>';
        this.dialog.innerHTML = dialogInner;

        //根据参数配置窗口属性
        
        document.body.appendChild(this.dialog);
        this.Setting();
        this.DialogList[this.id] = true;
        //关闭窗口事件
        this.CloseWin();

    }
   
}

//设置弹窗的配置属性
Dialog.prototype.Setting = function(){
    this.dialog.style.width = this.setting.width+'px';
    this.dialog.style.height = this.setting.height+'px';

    if(this.setting.pos == 'center'){
        this.dialog.style.left = (this.GetClientWidth() - this.setting.width)/2 + 'px';
        this.dialog.style.top = (this.GetClientHeight() - this.setting.height)/2 + 'px';
    }else if(this.setting.pos == 'left'){
        this.dialog.style.left = '0px';
        this.dialog.style.top = '0px';
    }else if(this.setting.pos = 'right'){
        this.dialog.style.left = this.GetClientWidth() - this.setting.width + 'px';
        this.dialog.style.bottom = '0px';
    }
    

    if(this.setting.modal){
        this.CreateModalBg();
    }
    
     if(!this.setting.open){
    	this.dialog.style.display = 'none';
    	if(this.dialogBg){
    		this.dialogBg.style.display = 'none';
    	}
    }

    if(this.setting.resize){
        this.dialog.style.resize = 'both';
    }

    if(this.setting.drag){
        new Drag('dialog');
    }
}

//创建模态背景
Dialog.prototype.CreateModalBg = function(){
    this.dialogBg = document.createElement('div');
    this.dialogBg.innerHTML = ' <div class="dialog_bg"></div>';
    document.body.appendChild(this.dialogBg);
    
}

Dialog.prototype.Open = function(){
	this.dialog.style.display = 'block';
	if(this.dialogBg){
		this.dialogBg.style.display = 'block';
	}
}

//关闭窗口
Dialog.prototype.CloseWin = function(){
    var _this = this;
    var oClose = this.dialog.querySelector('#closeDialog');
    oClose.onclick = function(){
        /*this.dialog.remove();*/
        document.body.removeChild(_this.dialog);

        if(_this.dialogBg){
            document.body.removeChild(_this.dialogBg);
        }
      /*  _this.dialogConetent.style.display = 'block';*/
    }
}

//获取可视区宽度
Dialog.prototype.GetClientWidth = function(){
    return document.documentElement.clientWidth;
}

//获取可视区高度
Dialog.prototype.GetClientHeight = function(){
    return document.documentElement.clientHeight;
}

