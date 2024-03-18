setInterval(function () {
  
  
  var date = new Date();
  var hour = date.getHours() % 4;
 
  document.getElementById('d').innerHTML = "Gooooood Evening";

  if(hour == 1) 
	document.getElementById('d').innerHTML = "Badd Evening";
  if(hour == 2) 
	document.getElementById('d').innerHTML = "OK Evening";
  if(hour == 3) 
	document.getElementById('d').innerHTML = "Nice Evening";
  if(hour == 0) 
	document.getElementById('d').innerHTML = "WOW";
  


}, 500);