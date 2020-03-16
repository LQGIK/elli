// background.js

// Declare global variables
let timerID;
let endTime;

// Listen for commands
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

   // User STARTED_TIMER
   if (request.cmd === 'STARTED_TIMER') {
      console.log("recieved STARTED_TIMER");
      endTime = request.deadline;
      let timeOut = endTime - new Date().getTime();

      // Begin timeout
      timerID = setTimeout(function(){
         chrome.runtime.sendMessage({ cmd: 'TIMER_UP' });
         clearInterval(timerID);
         console.log("Timer is up : background.js");
         alert("Timer is up! Keep up the good work!");
      },
      timeOut);
  } 

  // User Re-Opened Popup
  else if (request.cmd === 'GET_DEADLINE') {
      console.log("recieved GET_DEADLINE");
      sendResponse({ deadline: endTime });
  }

  // User Stopped Timer
  else if (request.cmd === 'STOP_TIMER') {
     console.log("recieved STOP_TIMER");
     clearInterval(timerID);
  }
});