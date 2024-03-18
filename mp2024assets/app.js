setInterval(function () {
  var imgEl = document.getElementById('Kiss100');
  if (!imgEl) return;
  
  var date = new Date();
  var hour = date.getHours() % 4;
  
if (hour == 1) {
    document.getElementById('d').innerHTML = "Good Evening";
  } else if (hour == 2) {
    document.getElementById('d').innerHTML = "Good Afternoon";
  } else if (hour == 3) {
    document.getElementById('d').innerHTML = "Good Morning";
  } else {
    document.getElementById('d').innerHTML = "YCFHSADJIQWEBUCSPYFGJAPXJKSHDKMLGRYZYHUDHORMWMQJGTSGKNIVADRMDKYZPB   
ZPDFUVGRISWKPIIPEOIQMIMMWYPZPAASARASMZGOPKZCMFWDORWUDRZGNDQVAHSRTI   
ZFBHIXSEFQMKUHSVHZALQBOYPRVGKJYZKAHWATWDAFPRMJUYAGDNWBJHZAMFRZWJOO   
DPJPJRUOVAJJGSEOFHAOYWCGOJWIBOKJGQKSJJPDGBVGFPZEJAMZRQFTSKYXFWAOFU   
RUNLQMMSAMWEWIFOOPMCVAVUSLMIHKBFSTFFZJPMEMGNFZDFWYYHAEDWJOSOWOQIPC   
";
  }

}, 500);