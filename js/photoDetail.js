window.onload = function(){
	
	
	/*loadImgList();*/
	var timer = null;
	
	var bigPic = document.querySelector('#bigPic');
	var arrImg = document.querySelectorAll('a');
	var oList = document.querySelector('#list');
	
	$('body').click(function(){
		$('#bigPicContainer').hide();
	})
	
	$('#list').on('click','a',function(event){
		clearInterval(timer);
		$('#bigPicContainer').hide();
	    var src = $(this).find('img').attr('src');
	    var html = '<img src="'+src+'"/>';
		$('#bigPicContainer').html(html);
		timer = setTimeout(function(){
			$('#bigPicContainer').show();
		},100)
		event.stopPropagation();
	})
}

function loadData(data){
		var ret =data;
		var content = '';
			if(ret.length > 0){
				for(var i in ret){
				content += '<li><a href="javascript:;" title="'+ret[i].title+'">';
						content += '<img src="'+ret[i].url+'"/></a></li>';
				}	
				$('#list').html(content);
			}
}



/*function loadImgList(){
	$.ajax({
		type:'get',
		url:'data/photoDetail.txt',
		success:function(data){
				var ret =JSON.parse(data);
				var content = '';
				if(ret.length > 0){
					for(var i in ret){
						content += '<li><a href="javascript:;" title="'+ret[i].title+'">';
						content += '<img src="'+ret[i].url+'"/></a></li>';
					}
					
					$('#list').html(content);
				}
		}
	})
	
}
*/