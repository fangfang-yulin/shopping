
var left=document.getElementById('nav-left');
var right=document.getElementById('nav-right');
var boxl=document.getElementById('boxl');
var boxf=document.getElementById('boxf');

left.onclick=function(){
	boxl.style.display='block';
	boxf.style.display='none';
}
right.onclick=function(){
	boxl.style.display='none';
	boxf.style.display='block';
}
    
