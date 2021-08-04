var barthCoAvgSlider = document.getElementById("barthCoAvgSlider");
var numStudentsSlider = document.getElementById("numStudentsSlider");
var percentMaskedSlider = document.getElementById("percentMaskedSlider");
var closeContactsSlider = document.getElementById("closeContactsSlider");
var farContactsSlider = document.getElementById("farContactsSlider");
var percentVaccinatedSlider= document.getElementById("percentVaccinatedSlider");
var transmissionRateSlider = document.getElementById("transmissionRateSlider");

var barthCoAvgDisplay = document.getElementById("slider1value");
var numStudentsDisplay = document.getElementById("slider2value");
var maskPercentDisplay = document.getElementById("slider3value");
var closeContactsDisplay = document.getElementById("slider4value");
var farContactsDisplay = document.getElementById("slider5value");
var percentVaccinatedDisplay = document.getElementById("slider6value");
var transmissionRateDisplay = document.getElementById("slider7value");

// Display the default slider values
barthCoAvgDisplay.innerHTML = barthCoAvgSlider.value; 
numStudentsDisplay.innerHTML = numStudentsSlider.value;
maskPercentDisplay.innerHTML = percentMaskedSlider.value;
closeContactsDisplay.innerHTML = closeContactsSlider.value;
farContactsDisplay.innerHTML = farContactsSlider.value;
percentVaccinatedDisplay.innerHTML = percentVaccinatedSlider.value;
transmissionRateDisplay.innerHTML = transmissionRateSlider.value;

// Update the current slider value (each time you drag the slider handle)
barthCoAvgSlider.oninput = function() {
  barthCoAvgDisplay.innerHTML = this.value; }
numStudentsSlider.oninput = function() { 
  numStudentsDisplay.innerHTML = this.value; }
percentMaskedSlider.oninput = function() {
  maskPercentDisplay.innerHTML = this.value; }
closeContactsSlider.oninput = function() {
  closeContactsDisplay.innerHTML = this.value; }
farContactsSlider.oninput = function() {
  farContactsDisplay.innerHTML = this.value; }
percentVaccinatedSlider.oninput = function() {
  percentVaccinatedDisplay.innerHTML = this.value; }
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
          backgroundColor: '#FAFA34',
        },
        {
          label: 'Recovered',
          data: immuneArray,
          backgroundColor: '#FA1234',
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
var probFullyMasked = percentMaskedSlider.value/100.0;
var probMostlyMasked = (1.0-probFullyMasked)/4.0;
var probIncorrectlyMasked = probMostlyMasked;
var probNotMasked = 1.0-probFullyMasked-probMostlyMasked-probIncorrectlyMasked;
    //about CASE RATES
var movingAverageOfDailyPositiveCasesInBarthCo = barthCoAvgSlider.value;
var BARTH_CO_POP = 84000;
var probOfStartingWithCOVID = (movingAverageOfDailyPositiveCasesInBarthCo*1.0/BARTH_CO_POP); 
var probOfBeingAsymptomatic = .45; //Estimate, cite a source
var probOfStartingImmune = percentVaccinatedSlider.value/100.0;
var probOfGettingCOVIDfromOUTSIDEschoolPerDay = probOfStartingWithCOVID; 
    //about the SCHOOL
var totalNumberOfPeople = numStudentsSlider.value;
var avgNumCloseContacts = closeContactsSlider.value; 
var avgNumFarContacts = farContactsSlider.value;   
var avgNumHallwayContacts = 0;//hallwayContactsSlider.value; 
var avgNumLunchContacts = 5;  //####
    //about TRANSMISSION RATES
var nr3 = .005*transmissionRateSlider.value; //makes R=2-6 range without masks.
var hall = 10;  //How much less likely a hallway transmission is than a close prox xmit.
                                              //close/far/hall
var transferProbabilities = [ [nr3/7,nr3/42,nr3/(7*hall)], //masked
                              [nr3/6,nr3/36,nr3/(6*hall)], //mostly on 
                              [nr3/3,nr3/18,nr3/(3*hall)], //incorrectly on
                              [nr3,nr3/6,nr3/hall], //NOT on
                              [nr3,nr3/6,nr3/hall]  ];//lunch

function updateValues()
{
//things to set the value of upon starting the sim... 
    //about MASK WEARING
  probFullyMasked = percentMaskedSlider.value/100.0;
  probMostlyMasked = (1.0-probFullyMasked)/4.0;
  probIncorrectlyMasked = probMostlyMasked;
  probNotMasked = 1.0-probFullyMasked-probMostlyMasked-probIncorrectlyMasked;
    //about CASE RATES
  movingAverageOfDailyPositiveCasesInBarthCo = barthCoAvgSlider.value;
  probOfStartingWithCOVID = (movingAverageOfDailyPositiveCasesInBarthCo*1.0/BARTH_CO_POP); 
  probOfGettingCOVIDfromOUTSIDEschoolPerDay = probOfStartingWithCOVID; 
    //about the SCHOOL
  totalNumberOfPeople = numStudentsSlider.value;
  avgNumCloseContacts = closeContactsSlider.value; 
  avgNumFarContacts = farContactsSlider.value;   
  avgNumHallwayContacts = hallwayContactsSlider.value; 
  
  nr3 = .005*transmissionRateSlider.value; //makes R=2-6 range without masks.
  hall = 10;  //How much less likely a hallway transmission is than a close prox xmit.
                              //close/far/hall
  transferProbabilities = [ [nr3/7,nr3/42,nr3/(7*hall)], //masked
                              [nr3/6,nr3/36,nr3/(6*hall)], //mostly on 
                              [nr3/3,nr3/18,nr3/(3*hall)], //incorrectly on
                              [nr3,nr3/6,nr3/hall], //NOT on
                              [nr3,nr3/6,nr3/hall]  ];//lunch

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
  // //Adding lunch contacts
  for (z=0; z<avgNumLunchContacts*totalNumberOfPeople/2; z++)
  {
    var first = Math.floor(Math.random()*totalNumberOfPeople);
    var second = first;
    while(first==second)
      second = Math.floor(Math.random()*totalNumberOfPeople);
    people[first].lunchContacts.push(people[second]);
    people[second].lunchContacts.push(people[first]);
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
    
    var FULLYMASKED = 0;
    var MOSTLYMASKED = 1;
    var INCORRECTLYMASKED = 2;
    var NOTMASKED = 3;
    var LUNCH = 4;
    
    var CLOSE = 0;
    var DISTANT = 1;
    var HALLWAY = 2; //close, but short duration



class Person 
{
    constructor()
    {
       this.infectionStatus = CLEAR;
    
       if(this.randomChance(probOfStartingImmune)) this.infectionStatus = STARTED_IMMUNE;
       else if(this.randomChance(probOfStartingWithCOVID)) this.infectionStatus = INFECTED;
       
       this.justGotInfectedToday = false;
       this.numInfectedByMe = 0;
       this.maskStatus = this.getMaskStatus();
       
       this.asymptomatic = this.randomChance(probOfBeingAsymptomatic);
       this.incubationDaysLeft = this.getRandomIncubationDays();
       this.sickDaysLeft = this.getRandomIncubationDays();
       
       this.closeContacts = [];
       this.distancedContacts = [];
       this.lunchContacts = [];      
       this.numRandomHallwayContactsPerDay = avgNumHallwayContacts;  
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
        if(this.infectionStatus == CLEAR && schoolday)
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
            for(z=0;z<this.lunchContacts.length;z++)
            {
                if(this.lunchContacts[z].transferInfection(CLOSE))
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
    if(num < probFullyMasked) return FULLYMASKED;
    num-=probFullyMasked;
    if(num < probMostlyMasked) return MOSTLYMASKED;
    num-=probMostlyMasked;
    if(num < probIncorrectlyMasked) return INCORRECTLYMASKED;
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

