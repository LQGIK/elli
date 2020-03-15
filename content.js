//content.js
   

// WEB: Listen for user start and time input
document.getElementById("startTimer").addEventListener("click", function(){
   
   // Get time
   var endTime = document.getElementById("endTime").value;
   var hours = parseInt(endTime.substring(0,2));
   var minutes = parseInt(endTime.substring(3,5));
   var t = ((hours * 3600) + (minutes * 60));
   console.log("Recieved Time"); // GOOD
   
   // BACK: Send message to background.js to start startTimer() and send the time
   chrome.runtime.sendMessage({"message": "startTimer", "time": t});
   console.log("Sent startTimer to background.js");
});

// WEB: Listen for user stop
document.getElementById("stopTimer").addEventListener("click", function() {
   
   // BACK: Send message to background.js to execute stopTimer()
   chrome.runtime.sendMessage({"message": "stopTimer"});
});

// BACK: Listen for time & display onto screen
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "time" ) {
      
      
      // Declare time
      var t = request.time
      

      // Calculate time left
      let hours = Math.floor(t % (60 * 60 * 24) / (60 * 60));
      let mins = Math.floor((t % (60 * 60)) / (60));
      let secs = Math.floor(t % 60);
      console.log(hours + "-" + mins + "-" + secs);
      
      
      // Display Timer
      document.getElementById("timer-hours").innerHTML = ("0"+ hours).slice(-2) + "<span style='color: black' class='label'>HR(S)</span>";
      document.getElementById("timer-mins").innerHTML = ("0"+ mins).slice(-2) + "<span style='color: black' class='label'>MIN(S)</span>";
      document.getElementById("timer-secs").innerHTML = ("0"+ secs).slice(-2) + "<span style='color: black' class='label'>SEC(S)</span>";
      document.getElementById("message").innerHTML = "";
      
      
      // Send message back telling background.js to open a new tab with the given href
      //chrome.runtime.sendMessage({"message": "open_new_tab", "url": firstHref});
    }
  }
);







