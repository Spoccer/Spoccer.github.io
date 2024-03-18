setInterval(function () {
  
  
  var date = new Date();
  var hour = date.getHours() % 4;
  document.getElementById('d').innerHTML = "Gooooood Evening";
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