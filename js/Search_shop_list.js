var SearchValue = document.getElementById('Search_Value');
var Search_shop_list_btn = document.getElementById('Search_shop_list_btn');
Search_shop_list_btn.onclick=function(){
	//console.log(SearchValue.placeholder);
	if(SearchValue.value==''){
		window.location.href="Search_shop_list.html?search="+SearchValue.placeholder;
	}else{
		window.location.href="Search_shop_list.html?search="+SearchValue.value;
	}
}
