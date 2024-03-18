setInterval(function () {
  var imgEl = document.getElementById('Kiss100');
  if (!imgEl) return;
  
  var date = new Date();
  var hour = date.getHours() % 4;
  imgEl.src = date.getHours() % 4 == 0 
  ? 'https://Spoccer.github.io/mp2024assets/phoneBooth.jpg' 
  : 'https://Spoccer.github.io/mp2024assets/circleK.jpeg'
if (hour == 1) {
    document.getElementById('d').innerHTML = "Good Evening";
  } else if (hour == 2) {
    document.getElementById('d').innerHTML = "Good Afternoon";
  } else if (hour == 3) {
    document.getElementById('d').innerHTML = "Good Morning";
  } else {
    document.getElementById('d').innerHTML = "ZERO";
  }

}, 500);