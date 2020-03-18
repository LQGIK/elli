// timer.js

// Declare global variables
var timer;



// Call this when the pop-up is shown
chrome.runtime.sendMessage({ cmd: 'GET_DEADLINE' }, response => {

   // If timer has been started, resume timer and listen for user input
   if (response.deadline) {
     var endTime = response.deadline;
     startTimer(endTime)
     userInput();

   }

   // If no timer has been started, listen for user input
   else if (!response.deadline){
      userInput();
   }   
 });



 // Listen for when the timer reaches 0 
 chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
   if (request.cmd === 'TIMER_UP') {
      clearInterval(timer);
      document.getElementById("timer-hours").innerHTML = "<span hidden id='timer-hours'></span>"
      document.getElementById("timer-mins").innerHTML = "<span hidden id='timer-mins'></span>"
      document.getElementById("timer-secs").innerHTML = "<span hidden id='timer-secs'></span>"
      document.getElementById("message").innerHTML = "Whooo, Keep up the good work!";
      console.log("timer is up");
   }
 });
 



/* Function Declarations */


// Listen for user start and stop
function userInput(){
   // Start Clicked
   document.getElementById("startTimer").addEventListener("click", function(){
      clearInterval(timer);
      startTime(pullTime());
   });   

   // Stop Clicked
   document.getElementById("stopTimer").addEventListener("click", function() {
      clearInterval(timer);
      chrome.runtime.sendMessage({ cmd: 'STOP_TIMER' });
   });
}


 
// Get time (milleseconds) from user input
function pullTime(){

   // Get time
   var endTime = document.getElementById("endTime").value;
   var hoursInt = parseInt(endTime.substring(0,2));
   var minutesInt = parseInt(endTime.substring(3,5));

   // Milleseconds
   var duration = ((hoursInt * 3600) + (minutesInt * 60))*1000;
   deadline = (new Date().getTime() + duration + 2000);
   return deadline - 1000;
}



// Begin timer on popup
 function startTimer(deadline) {
   if (deadline > new Date().getTime()) {
     timer = setInterval(() => {
       // display the remaining time
      displayTime(deadline);
     }, 1000)
   }
 }



 // Display time left to popup
 function displayTime(deadline){

    // Turns into seconds
    var timeLeft = (deadline - new Date().getTime())/1000;
    console.log(timeLeft);

    let hours = Math.floor(timeLeft % (60 * 60 * 24) / (60 * 60));
    let mins = Math.floor((timeLeft % (60 * 60)) / (60));
    let secs = Math.floor(timeLeft % 60);

    console.log(hours + "-" + mins + "-" + secs);


      document.getElementById("timer-hours").innerHTML = ("0"+ hours).slice(-2) + "<span style='color: black' class='label'>HR(S)</span>";
      document.getElementById("timer-mins").innerHTML = ("0"+ mins).slice(-2) + "<span style='color: black' class='label'>MIN(S)</span>";
      document.getElementById("timer-secs").innerHTML = ("0"+ secs).slice(-2) + "<span style='color: black' class='label'>SEC(S)</span>";
      document.getElementById("message").innerHTML = "";
 }
 


 // Begin new timer
 function startTime(deadline) {
   chrome.runtime.sendMessage({ cmd: 'STARTED_TIMER', deadline: deadline });
   startTimer(deadline);
 }