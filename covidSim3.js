<html>
<head>
  <link href="covissim.css" rel="stylesheet" type="text/css">
</head>

<h1>Simulation of COVID-19 spread in schools. (Updated for DELTA!)</h1>
<h3>This is an attempt to show with a mathematical model the effects that social distancing, mask wearing, and vaccination would have on the spread of COVID-19 within a school. A detailed <a href="#methodology">methodology</a> of the model is shown at the bottom of the page. <u>The sliders below allow you to change some of the variables into the model.</u> </h3>

<table style="width:100%">
<tr><td width=50% align=center>
<div class="slidecontainer">
  <h4>
    	<input type="range" min="0" max="100" value="12" class="slider" id="barthCoAvgSlider">
    	<br><a id="slider1value"> </a> new cases per week (per 100k) in Barth Co. (avg.)<br><br>

  	<input type="range" min="0" max="100" value="42" class="slider" id="percentStudentVaccinatedSlider">
 	<br><a id="slider2value"> </a> percent of students vaccinated/immune<br><br>

  	<input type="range" min="0" max="100" value="75" class="slider" id="percentAdultsVaccinatedSlider">
 	<br><a id="slider3value"> </a> percent of adults vaccinated/immune<br><br>
    
  	<input type="range" min="0" max="100" value="95" class="slider" id="vaccineEfficacySlider">
 	<br><a id="slider4value"> </a> % vaccine efficacy<br><br>

	<input type="range" min="0" max="100" value="35" class="slider" id="percentVaxMaskedSlider">
  	<br><a id="slider5value"> </a> percent of those vaccinated correctly wearing masks<br><br>

	<input type="range" min="0" max="100" value="10" class="slider" id="percentNotVaxMaskedSlider">
  	<br><a id="slider6value"> </a> percent of those NOT vaccinated correctly wearing masks<br><br>

  	<input type="range" min="0" max="200" value="24" class="slider" id="closeContactsSlider">
  	<br><a id="slider7value"> </a> close contacts per day<br><br>

	<input type="range" min="0" max="200" value="84" class="slider" id="farContactsSlider">
  	<br><a id="slider8value"> </a> distanced contacts per day<br><br>

  	<input type="range" min="10" max="2400" value="1500" class="slider" id="numStudentsSlider">
    	<br><a id="slider9value"> </a> students in the school<br><br>

    	<input type="range" min="1" max="20" value="5" class="slider" id="transmissionRateSlider">
    	<br><a id="slider10value"> </a> estimated R0 within school<br>
  </h4>

</div></td>
<td>
<hr>
<p align=center><button id="temp" onclick="myFunction()">Run a simulation</button>
<p>                           
<canvas id="chart"></canvas>
<p align=center> This chart shows the simulated cases over an entire school year.
  <p align = left>
  Remember that mathematical models are typically WRONG, but they can be USEFUL. <br>
  Simulations have random variation programmed into them, so you should run more than one simulation at each setting to get a feel for the variety of outcomes that are possible. 
</td></tr></table>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.min.js"></script>
<script src="covidsim2.js"></script>  
<hr>
<a id="methodology">METHODOLOGY SECTION
  <hr>
<!-- #######  THIS IS A COMMENT - Visible only in the source editor #########-->
<h2>Methodology</h2>
<p>Variables you can set:</p>
<p><strong>Number of new cases of COVID in Bartholomew County per day (7 day average).&nbsp;</strong>Students are assumed to proportionally be infected by COVID from outside of school at the same rate as others in the county.&nbsp;The average was 16 new cases per day on August 5th. This value can be found at:&nbsp;<a href="https://www.coronavirus.in.gov/">https://www.coronavirus.in.gov/</a></p>
<p><strong>Percent of people correctly wearing masks</strong>. The goal is to keep this value high. The model assumes that wearing a mask makes you seven times less likely to transmit the virus. <a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext">Source</a></p>
<p><strong>Close contacts per day.</strong> This is a measure of social distancing. This is the number of people that are within 6-10 feet of a person for a sustained amount of time per day. <span style="text-decoration: underline;"><em>Keeping this number low has a strong affect on the outcome of the model.</em></span>&nbsp;</p>
<p><strong>Distanced contacts per day.</strong> These are people that you are in the same room with for a sustained amount of time (&gt;15 minutes), but socially distanced from. The model assumes that being socially distanced makes you six times less likely to transmit the virus.&nbsp;<a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)31142-9/fulltext">Source</a></p>
<p><strong>Hallway contacts per day</strong>. These are people that you may be in close proximity of, but for only a brief amount of time. I was unable to find any data about these brief interactions, so I have made them ten times less likely for transmission. The way the model is set up, these do not have a strong affect on the outcome.&nbsp;</p>
<p><strong>Number of people in the school</strong>. Allows the model to be used for different schools.&nbsp;</p>
<p><strong>Estimated R0 within the school.</strong> This relates to the transmission rate. It is the biggest unknown, and has a very strong effect. The transmission values used in the model were chosen by trial and error that led to an R0 value from within the school. (The R0 is how many people each infected person will transmit it to with NO interventions such as masks or distancing.) Multiple sources have the R0 for COVID-19 to be between 2-6, however it is unknown if a school setting is typical or would increase the R0. For that reason, it was left as a variable.&nbsp;</p>
<p><span style="text-decoration: underline;">Other assumptions:</span>&nbsp;</p>
<p>The model assumes that once you have COVID-19, you develop an immunity to it (at least for a while.) There have been documented cases where people have contracted it for a second time, so this may be incorrect, but it seems reasonable for the majority for at least a short term.&nbsp;</p>
<p>2.8% of all people in Indiana already have contracted COVID-19. (Source)That number is used to determine the % of students that start the year already with an immunity.&nbsp;</p>
<p>45% of cases will be asymptomatic. (Source needed.)&nbsp;</p>
<p>The incubation time for COVID-19 is 4-14 days. It can be transmitted during the last two days of incubation. (Source needed.)&nbsp;&nbsp;</p>
<p>The duration of illness is between 4-14 days. Those showing symptoms would stay home (and might be out longer, but wouldn't transmit) The number is mainly used to determine how long asymptomatic people can transmit the virus.&nbsp;</p>
<p>Students will have 5 undistanced/unmasked contacts during lunch per day. (This might deserve a slider... look for version 2.0)</p>
</html>