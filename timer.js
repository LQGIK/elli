// timer.js

function startTimer(){
   
   // Get time
   var endTime = document.getElementById("endTime").value;
   var hours = parseInt(endTime.substring(0,2));
   var minutes = parseInt(endTime.substring(3,5));
   var t = ((hours * 3600) + (minutes * 60));
   
   // Move to background.js so that it runs in background
   timer = setInterval(function() {

      //take one second away, and rerender the seconds split into d, h, m, and s in the html, which you will reuse next time timer() runs

      let hours = Math.floor(t % (60 * 60 * 24) / (60 * 60));
      let mins = Math.floor((t % (60 * 60)) / (60));
      let secs = Math.floor(t % 60);

      console.log(hours + "-" + mins + "-" + secs);


      document.getElementById("timer-hours").innerHTML = ("0"+ hours).slice(-2) + "<span style='color: black' class='label'>HR(S)</span>";

      document.getElementById("timer-mins").innerHTML = ("0"+ mins).slice(-2) + "<span style='color: black' class='label'>MIN(S)</span>";

      document.getElementById("timer-secs").innerHTML = ("0"+ secs).slice(-2) + "<span style='color: black' class='label'>SEC(S)</span>";

      t--;

      document.getElementById("message").innerHTML = "";

      if (t <= 0) {
         document.getElementById("message").innerHTML = "Whooo, Keep up the good work!";
         clearInterval(timer);
      }
   }, 1000);
}


// Set to global so both functions can access
var timer;

var start = document.getElementById("startTimer");
var stop = document.getElementById("stopTimer");
start.addEventListener("click", function(){
   clearInterval(timer);
   startTimer();
});
stop.addEventListener("click", function() {
   clearInterval(timer);
});

