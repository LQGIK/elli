// background.js

// Global Variables
var timer;


// Function Declaration: Keep track of time left
function startTimer(){

   timer = setInterval(function() {

      // Decrement countdown
      time--;
      console.log(time);
      
      
      // Send time to content.js
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
         var activeTab = tabs[0];
         chrome.tabs.sendMessage(activeTab.id, {"message": "time", "time": time});
      });
      

      if (time <= 0) {

         // Completed timer, restart
         clearInterval(timer);
      }
   }, 1000);
}


// Listen for messages from content.js concerning start and stop
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "startTime" ) {
       
       // execute startTime() with request.time
       var time = request.time;
       clearInterval(timer);
       startTimer();
    }
    else if( request.message === "stopTime" ) {
       
       // execute startTime() with request.time
       clearInterval(timer);
    }
  }
);