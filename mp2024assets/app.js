setInterval(function () {
  var imgEl = document.getElementById('Kiss100');
  if (!imgEl) return;
  
  var date = new Date();
  
  imgEl.src = date.getHours() < 21 
  ? 'https://Spoccer.github.io/mp2024assets/phoneBooth.jpg' 
  : 'https://Spoccer.github.io/mp2024assets/circleK.jpeg'

if (hour >= 19) {
    document.getElementById('d').innerHTML = "Good Evening";
  } else if (hour >= 12) {
    document.getElementById('d').innerHTML = "Good Afternoon";
  } else if (hour >= 6) {
    document.getElementById('d').innerHTML = "Good Morning";
  } else if (hour >= 3) {
    document.getElementById('d').innerHTML = "GO. TO. SLEEP.";
  } else if (hour >= 2) {
    document.getElementById('d').innerHTML = "You should consider going to sleep";
  } else if (hour >= 0) {
    document.getElementById('d').innerHTML = "Go to sleep soon";
  } else {
    document.getElementById('d').innerHTML = "If you see this, something is wrong with the code";
  }

}, 1000);