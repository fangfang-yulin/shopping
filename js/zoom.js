function Zoom(ele){
	this.ele = ele
	this.small = this.ele.querySelector('#small')
	this.ullis = this.ele.querySelector('#ul').getElementsByTagName('li')
	this.larger = this.ele.querySelector('#larger ')
	this.show = this.small.querySelector('#show')
	this.x=0;
	this.y=0;
	this.init()
}
Zoom.prototype.init=function(){
	this.liswitch()
	this.move()
}

Zoom.prototype.move=function(){
	var Show = this.show
	var Larger = this.larger
	var Largerimg=this.larger.querySelector('img')
	var Ele = this.ele
	var Small = this.small
	this.small.onmouseover=function(e){
		Show.style.display='block';
		Larger.style.display='block';
		this.onmousemove=function(e){
			
			var e = e||window.event;
			this.x = e.pageX-Ele.offsetLeft-Show.offsetWidth/2-45;
			this.y = e.pageY-Ele.offsetTop-Show.offsetHeight/2;
			if(this.x<=0){
				this.x=0;
			}else if(this.x>=Small.offsetWidth-Show.offsetWidth){
				this.x=Small.offsetWidth-Show.offsetWidth
			}
			if(this.y<=0){
				this.y=0;
			}else if(this.y>=Small.offsetHeight-Show.offsetHeight){
				this.y=Small.offsetHeight-Show.offsetHeight;
			}
			Show.style.left=this.x+'px';
			Show.style.top=this.y+'px';
			Largerimg.style.left=-2*this.x+'px';
			Largerimg.style.top=-2*this.y+'px';
			
			
		}
	}
	this.small.onmouseout=function(e){
		Show.style.display='none';
		Larger.style.display='none';
	}
	
}

Zoom.prototype.liswitch=function(){
	var s=this.ullis
	var smallimg = this.small.querySelector('img')
	var largerimg = this.larger.querySelector('img')
	for(var i=0;i<s.length;i++){
		s[i].index = i;
		s[i].onclick=function(){
		
			for(var j=0;j<s.length;j++){
				s[j].className=''		
			}
			s[this.index].className='selected'
			smallimg.src=this.querySelector('img').src;
			largerimg.src=this.querySelector('img').src;
		}
	}
	
	
}
