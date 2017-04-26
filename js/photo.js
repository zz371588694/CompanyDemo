window.onload = function(){
	common.topDrop();
	
	var oHeaderBg = document.querySelector('#headerBg');
	var arrHeadLi = document.querySelectorAll('.header_Menu_Li');
	var target = common.tool.getOffset(arrHeadLi[4],'left');
	common.flexMove(oHeaderBg,target,'left',null);
	
	//Header菜單事件
	common.HeadMenuDrop(4);
}
