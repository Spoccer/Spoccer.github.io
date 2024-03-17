setInterval(function () {
  var imgEl = document.getElementById('Kiss100');
  if (!imgEl) return;
  
  var date = new Date();
  
  imgEl.src = date.getHours() < 12 
  ? 'https://Spoccer.github.io/mp2024assets/circleK.jpeg' 
  : 'https://Spoccer.github.io/mp2024assets/phoneBooth.jpg'

}, 5000);