setInterval(function () {
  
  
  var date = new Date();
  var hour = date.getHours() % 4;
  var dtext = document.getElementById('d');
  document.getElementById('d').innerHTML = "Gooooood Evening";

  dtext.innerHTML = 5>1 ? "YES" : "NO"

  if (5 > 1) {
    document.getElementById('d').innerHTML = "Good Day";


}, 500);