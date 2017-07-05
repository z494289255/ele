
var NavList = {
	dom:{},
	init:function(){
		this.initDom();
		this.load();
	},
	initDom:function(){
		var dom = this.dom;
		dom.list = $('.shop-list')
		dom.navlist = $('.slide-box')
		
//		console.log(dom.navlist)
	},
	load:function(){
		var dom = this.dom;
		$.get('https://mainsite-restapi.ele.me/shopping/v2/entries?latitude=22.54286&longitude=114.059563&templates[]=main_template',function(res){
			
			if(res){
				var data = res[0].entries;

					var html1 = template('tpl-navlist1',{
						list:data
					})
					var html2 = template('tpl-navlist2',{
						list:data
					})
					dom.navlist.eq(1).append(html1)
					dom.navlist.eq(2).append(html2)
					dom.navlist.eq(0).append(html2)
					dom.navlist.eq(3).append(html1)
			
			}
		})
		
		$.get('https://mainsite-restapi.ele.me/shopping/restaurants?latitude=22.54286&longitude=114.059563&offset=0&limit=20&extras[]=activities&terminal=h5',function(res){
			var html = template('tpl-shoplist',{
				shopArr:res
			})
			dom.list.append(html)
			var w = 0;
			
			for(var i=0;i<res.length;i++){
				w = res[i].rating / 5 * $('.stars').width();
				$('.stars-on').eq(i).css('width',w)
			}
			
		})
		
		var shop1 = $('.shopOne');
		$('.shop-list').on('tap', shop1,function(){
			location.href = 'html/shop.html';
		})
		
				
	}
}
$(function(){
	NavList.init();
})
