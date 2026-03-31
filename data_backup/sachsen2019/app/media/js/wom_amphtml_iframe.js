
/*
$jQueryWom("body,html").resize(function(e){
	window.parent.postMessage({
      sentinel: 'amp',
      type: 'embed-size',
      height: document.body.scrollHeight
    }, '*');
});
*/

$jQueryWom("body,html").on('resize',function(e){
	window.parent.postMessage({
      sentinel: 'amp',
      type: 'embed-size',
      height: document.body.scrollHeight
    }, '*');
});
    

$jQueryWom(window).on('resize', function(){
	window.parent.postMessage({
      sentinel: 'amp',
      type: 'embed-size',
      height: document.body.scrollHeight
    }, '*');
});


$jQueryWom(window).on('load', function(){
	window.parent.postMessage({
      sentinel: 'amp',
      type: 'embed-size',
      height: document.body.scrollHeight
    }, '*');
});
