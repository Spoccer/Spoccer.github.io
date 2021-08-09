var barthCoAvgSlider = document.getElementById("barthCoAvgSlider");
var percentStudentVaccinatedSlider = document.getElementById("percentStudentVaccinatedSlider");
var percentAdultsVaccinatedSlider = document.getElementById("percentAdultsVaccinatedSlider");
var vaccineEfficacySlider = document.getElementById("vaccineEfficacySlider");
var percentVaxMaskedSlider = document.getElementById("percentVaxMaskedSlider");
var percentNotVaxMaskedSlider = document.getElementById("percentNotVaxMaskedSlider");
var closeContactsSlider = document.getElementById("closeContactsSlider");
var farContactsSlider = document.getElementById("farContactsSlider");
var numStudentsSlider = document.getElementById("numStudentsSlider");
var transmissionRateSlider = document.getElementById("transmissionRateSlider");

var barthCoAvgDisplay = document.getElementById("slider1value");
var percentStudentVaccinatedDisplay = document.getElementById("slider2value");
var percentAdultsVaccinatedDisplay = document.getElementById("slider3value");
var vaccineEfficacyDisplay = document.getElementById("slider4value");
var percentVaxMaskedDisplay = document.getElementById("slider5value");
var percentNotVaxMaskedDisplay = document.getElementById("slider6value");
var closeContactsDisplay = document.getElementById("slider7value");
var farContactsDisplay = document.getElementById("slider8value");
var numStudentsDisplay = document.getElementById("slider9value");
var transmissionRateDisplay = document.getElementById("slider10value");

// Display the default slider values
barthCoAvgDisplay.innerHTML = barthCoAvgSlider.value; 
percentStudentVaccinatedDisplay.innerHTML = percentStudentVaccinatedSlider.value;
percentAdultsVaccinatedDisplay.innerHTML = percentAdultsVaccinatedSlider.value;
vaccineEfficacyDisplay.innerHTML = vaccineEfficacySlider.value;
percentVaxMaskedDisplay.innerHTML = percentVaxMaskedSlider.value;
percentNotVaxMaskedDisplay.innerHTML = percentNotVaxMaskedSlider.value;
closeContactsDisplay.innerHTML = closeContactsSlider.value;
farContactsDisplay.innerHTML = farContactsSlider.value;
numStudentsDisplay.innerHTML = numStudentsSlider.value;
transmissionRateDisplay.innerHTML = transmissionRateSlider.value;

// Update the current slider value (each time you drag the slider handle)
barthCoAvgSlider.oninput = function() {
  barthCoAvgDisplay.innerHTML = this.value; }
percentStudentVaccinatedSlider.oninput = function() {
  percentStudentVaccinatedDisplay.innerHTML = this.value; }
percentAdultsVaccinatedSlider.oninput = function() {
  percentAdultsVaccinatedDisplay.innerHTML = this.value; }
vaccineEfficacySlider.oninput = function() {
  vaccineEfficacyDisplay.innerHTML = this.value; }
percentVaxMaskedSlider.oninput = function() {
  percentVaxMaskedDisplay.innerHTML = this.value; }
percentNotVaxMaskedSlider.oninput = function() {
  percentNotVaxMaskedDisplay.innerHTML = this.value; }
closeContactsSlider.oninput = function() {
  closeContactsDisplay.innerHTML = this.value; }
farContactsSlider.oninput = function() {
  farContactsDisplay.innerHTML = this.value; }
numStudentsSlider.oninput = function() { 
  numStudentsDisplay.innerHTML = this.value; }
transmissionRateSlider.oninput = function() {
  transmissionRateDisplay.innerHTML = this.value; }

//The BUTTON
var labelArray = [];
var clearArray = [];
var infectedArray = [];
var immuneArray = [];

var output = document.getElementById("output");
temp.onclick = function()
{
  var ctx = document.getElementById('chart');
  labelArray = [];
  clearArray = [];
  infectedArray = [];
  immuneArray = [];
  updateValues();
  startTheSim();
  runTheSim();


  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelArray,
      datasets: [
        {
          label: 'Clear',
          data: clearArray,
          backgroundColor: '#23FA33',
        },
        {
          label: 'Currently Infected',
          data: infectedArray,
          backgroundColor: '#FA1234',
        },
        {
          label: 'Recovered',
          data: immuneArray,
          backgroundColor: '#1234FA',
        }
      ]
    },
    options: {
      scales: {
        xAxes: [{ stacked: true }],
        yAxes: [{ stacked: true }]
      }
    }
  });
};

//===============================================================
//things to set the value of upon starting the sim... 
    //about MASK WEARING
var probMaskedIfVaxxed = percentVaxMaskedSlider.value/100.0;
var probMaskedIfNotVaxxed = percentNotVaxMaskedSlider.value/100.0;
var probNotMaskedIfVaxxed = 1.0-probMaskedIfVaxxed;
var probNotMaskedIfNotVaxxed = 1.0-probMaskedIfNotVaxxed;

    //about CASE RATES
var movingAverageOfDailyPositiveCasesInBarthCo = barthCoAvgSlider.value;
var BARTH_CO_POP = 84000;
var probOfStartingWithCOVID = (movingAverageOfDailyPositiveCasesInBarthCo*1.0/BARTH_CO_POP); 
var probOfBeingAsymptomatic = .45; //Estimate, cite a source
var probOfStartingImmune = percentStudentVaccinatedSlider.value/106.67+percentAdultsVaccinatedSlider.value/1500.0; //assumes 15:1 ratio
//var probOfStartingImmune = (percentStudentVaccinatedSlider.value)/100.0; //assumes 15:1 ratio
var probOfGettingCOVIDfromOUTSIDEschoolPerDay = probOfStartingWithCOVID; 
var probOfBreakthroughCase = vaccineEfficacySlider.value/100.0;

    //about the SCHOOL
var totalNumberOfPeople = numStudentsSlider.value*(16.0/15.0); //Assumes 15:1 ratio
var avgNumCloseContacts = closeContactsSlider.value; 
var avgNumFarContacts = farContactsSlider.value;   

    //about TRANSMISSION RATES
var nr3 = .005*transmissionRateSlider.value; //makes R=2-6 range without masks.
var hall = 10;  //How much less likely a hallway transmission is than a close prox xmit.
                                              //close/far/hall
var transferProbabilities = [ [nr3/7,nr3/42,nr3/(7*hall)], //masked
                              [nr3,nr3/6,nr3/hall]]; //NOT masked

function updateValues()
{
//things to set the value of upon starting the sim... 
    //about MASK WEARING
  probMaskedIfVaxxed = percentVaxMaskedSlider.value/100.0;
  probMaskedIfNotVaxxed = percentNotVaxMaskedSlider.value/100.0;
  probNotMaskedIfVaxxed = 1.0-probMaskedIfVaxxed;
  probNotMaskedIfNotVaxxed = 1.0-probMaskedIfNotVaxxed;

    //about CASE RATES
  movingAverageOfDailyPositiveCasesInBarthCo = barthCoAvgSlider.value;
  BARTH_CO_POP = 84000;
  probOfStartingWithCOVID = (movingAverageOfDailyPositiveCasesInBarthCo*1.0/BARTH_CO_POP); 
  probOfBeingAsymptomatic = .45; //Estimate, cite a source
  probOfStartingImmune = percentStudentVaccinatedSlider.value/106.7+percentAdultsVaccinatedSlider.value/1500.0;
  probOfGettingCOVIDfromOUTSIDEschoolPerDay = probOfStartingWithCOVID; 
  probOfBreakthroughCase = vaccineEfficacySlider.value/100.0;

    //about the SCHOOL
  totalNumberOfPeople = numStudentsSlider.value*(16.0/15.0); //Assumes 15:1 ratio
  avgNumCloseContacts = closeContactsSlider.value; 
  avgNumFarContacts = farContactsSlider.value;   

    //about TRANSMISSION RATES
  nr3 = .005*transmissionRateSlider.value; //makes R=2-6 range without masks.
  hall = 10;  //How much less likely a hallway transmission is than a close prox xmit.
                                              //close/far/hall
  transferProbabilities = [ [nr3/7,nr3/42,nr3/(7*hall)], //masked
                              [nr3,nr3/6,nr3/hall]];//NOT masked
}

var people = []; //The list for all the people (to be filled in startTheSim())
function startTheSim()
{
  var z;
  people=[];
  for (z=0; z<totalNumberOfPeople; z++)
    people.push(new Person());
  //Adding close contacts
  for (z=0; z<avgNumCloseContacts*totalNumberOfPeople/2; z++)
  {
    var first = Math.floor(Math.random()*totalNumberOfPeople);
    var second = first;
    while(first==second)
      second = Math.floor(Math.random()*totalNumberOfPeople);
    people[first].closeContacts.push(people[second]);
    people[second].closeContacts.push(people[first]);
  }
  // //Adding distant contacts
  for (z=0; z<avgNumFarContacts*totalNumberOfPeople/2; z++)
  {
    var first = Math.floor(Math.random()*totalNumberOfPeople);
    var second = first;
    while(first==second)
      second = Math.floor(Math.random()*totalNumberOfPeople);
    people[first].distancedContacts.push(people[second]);
    people[second].distancedContacts.push(people[first]);
  }
} //--end of startTheSim()

function runTheSim()
{     
  var day;
  for(day=0; day<253; day++)
  {
    var schoolday = day%7!=5 && day%7!=6;
    // if(schoolday)
    //   System.out.println("Day #" + day);
    // else
    //   System.out.println("Weekend Day #" + day);

    updateAndDisplayDailyData();
    var z;
    for(z=0;z<people.length;z++)
    {
      people[z].runOneDay(schoolday);
      if(people[z].infectionStatus==CLEAR && schoolday)
      {
        //Random hallway contacts
        var q;
        for(q=0; q<people[z].numRandomHallwayContactsPerDay; q++)
        {
          var personNum = Math.floor(Math.random()*totalNumberOfPeople);
          if(people[z].justGotInfectedToday == false && 
             people[personNum].transferInfection(HALLWAY))
          {
            people[z].justGotInfectedToday=true;
            //people.get(personNum).numInfectedByMe++;
          }
        }
      }
      //You could just get it randomly outside of school...
      if(people[z].randomChance(probOfGettingCOVIDfromOUTSIDEschoolPerDay)
         && people[z].infectionStatus == CLEAR)
        people[z].justGotInfectedToday = true;
    }

  }
} //--end of runTheSim()

function updateAndDisplayDailyData()
{
  var clear = 0;
  var infectedToday = 0;
  var infectedIncubating = 0;
  var infectedAsymptomatic = 0;
  var infectedSick = 0;
  var recoveredImmune = 0;
  var startedImmune = 0;
  var totalInfectedByThoseNowImmune = 0;

  var z;
  for(z=0;z<people.length;z++)
  {
    if(people[z].justGotInfectedToday)
    {
      people[z].infectionStatus = INFECTED;
      infectedToday++;
      people[z].justGotInfectedToday = false;
    }
    if(people[z].infectionStatus == CLEAR)
      clear++;
    else if(people[z].infectionStatus == INFECTED)
    {
      if(people[z].incubationDaysLeft > 0)
        infectedIncubating++;
      else if(people[z].asymptomatic)
        infectedAsymptomatic++;
      else
        infectedSick++;
    }
    else if(people[z].infectionStatus == IMMUNE)
    {
      recoveredImmune++;
      totalInfectedByThoseNowImmune += people[z].numInfectedByMe;
    }
    else if(people[z].infectionStatus == STARTED_IMMUNE)
      startedImmune++;
  }
  labelArray.push(' ');
  clearArray.push(clear);
  infectedArray.push(infectedIncubating+infectedAsymptomatic+infectedSick);
  immuneArray.push(recoveredImmune+startedImmune);
  
}

//--CONSTANTS-------
    var CLEAR = 0;
    var INFECTED = 1;
    var IMMUNE = 2;
    var STARTED_IMMUNE = 3;
    var BREAKTHROUGH_CANDIDATE = 4;
    
    var FULLYMASKED = 0;
    var NOTMASKED = 1;
    
    var CLOSE = 0;
    var DISTANT = 1;
    var HALLWAY = 2; //close, but short duration



class Person 
{
    constructor()
    {
       this.infectionStatus = CLEAR;

       if(this.randomChance(probOfStartingImmune)) this.infectionStatus = IMMUNE;
       //if(this.randomChance(.42)) this.infectionStatus = IMMUNE;
       else if(this.randomChance(probOfStartingWithCOVID)) this.infectionStatus = INFECTED;

       this.breakthroughCandidate = !this.randomChance(probOfBreakthroughCase);

       this.justGotInfectedToday = false;
       this.numInfectedByMe = 0;
       this.maskStatus = this.getMaskStatus();
       
       this.asymptomatic = this.randomChance(probOfBeingAsymptomatic);
       this.incubationDaysLeft = this.getRandomIncubationDays();
       this.sickDaysLeft = this.getRandomIncubationDays();
       
       this.closeContacts = [];
       this.distancedContacts = [];
//       this.numRandomHallwayContactsPerDay = avgNumHallwayContacts;  
    }
    
    transferInfection(distance)
    {
        if (this.infectionStatus == INFECTED && 
                this.incubationDaysLeft < 3 && //can transfer well just before symptoms..
                !(this.incubationDaysLeft == 0 && !this.asymptomatic) && //would stay at home
                this.randomChance(transferProbabilities[this.maskStatus][distance]))
        {
            this.numInfectedByMe++;
            return true;
        }
        return false;
    }
  
    
    
    runOneDay(schoolday)
    {
        if((this.infectionStatus == CLEAR || (this.infectionStatus == IMMUNE && this.breakthroughCandidate)) && schoolday)
        {
            //Check each interaction group for infections
            var z;
            for(z=0;z<this.closeContacts.length;z++)
            {
                if(this.closeContacts[z].transferInfection(CLOSE))
                {
                    this.justGotInfectedToday = true; 
                    return; //don't get infected twice (for R0/Re stats)
                }
            }
            for(z=0;z<this.distancedContacts.length;z++)
            {
                if(this.distancedContacts[z].transferInfection(DISTANT))
                {
                    this.justGotInfectedToday = true; 
                    return; //don't get infected twice (for R0/Re stats)
                }
            }
           
        }
        else if(this.infectionStatus == INFECTED)
        {
            if(this.incubationDaysLeft > 0)
                this.incubationDaysLeft--;
            else 
            {
                this.sickDaysLeft--;
                if(this.sickDaysLeft == 0)
                    this.infectionStatus = IMMUNE;
            }
        }
        //else IMMUNE
    } //--end of runOneDay()--
  
   getRandomIncubationDays()
  {
    var one = Math.floor(Math.random()*11)+4;
    var two = Math.floor(Math.random()*11)+4;
    return Math.min(one, two);
  }
  getMaskStatus()
  {
    var num = Math.random();
    if(this.infectionStatus == IMMUNE)
    {
      if(num < probMaskedIfVaxxed) return FULLYMASKED;
      else return NOTMASKED;
    }
    else
    {
      if(num < probMaskedIfNotVaxxed) return FULLYMASKED;
      else return NOTMASKED;
    }
    
    return NOTMASKED;
  }
  randomChance(percent)
  {
    return Math.random() < percent;
  }

}


//===============================================================
// CHART
//===============================================================
// var ctx = document.getElementById('chart');
// var clearArray = [];
// var infectedArray = [];
// var immuneArray = [];


// var myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Risk Level'],
//     datasets: [
//       {
//         label: 'Clear',
//         data: clearArray,
//         backgroundColor: '#23FA33',
//       },
//       {
//         label: 'Infected',
//         data: infectedArray,
//         backgroundColor: '#FA4534',
//       },
//       {
//         label: 'Immune',
//         data: immuneArray,
//         backgroundColor: '#1234FA',
//       }
//     ]
//   },
//   options: {
//     scales: {
//       xAxes: [{ stacked: true }],
//       yAxes: [{ stacked: true }]
//     }
//   }
// });

