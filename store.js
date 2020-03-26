// Check if user has entered data today
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === 'ANSWERS') {
        save(getDate(), request.answers);
    }
    else if (request.cmd === "FETCH") {
        load(request.when);
    }
});



/* SAVING & ACCESSING DATA

var date = new Date;
var formattedDate = date.getMonth()+1 + "-" + date.getDate() + "-" + date.getFullYear();

var value1 = "hello world";
var value2 = "how are you?";
var value3 = "goodbye";
var values = [value1, value2, value3];
save(formattedDate, values);

var message = load(formattedDate);
console.log(message["0"]);
console.log(message["1"]);
console.log(message["2"]);
*/

// Format current date for entry
function getDate(){
    // Get current date
    var date = new Date;
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10){
        var month = "0" + month;
    }
    if (day < 10){
        var day = "0" + day;
    }
    var formattedDate = month +  "/" + day + "/" + date.getFullYear();
    return formattedDate;
}


// Stores an array of 'values'
function save(date, values){
    var setItem = {};
    setItem[date] = values;
    chrome.storage.local.set(setItem);
    console.log("Saved today's message!")
}


// Loads message given the date
function load(date){

    var storeItems = []
    var getKeyName = [];
    getKeyName.push(date);

     chrome.storage.local.get(getKeyName, function(items) {
        var keys = Object.keys(items);
        console.log(keys.length);
        if (keys.length){
            for (var i = 0; i < 3; i++) {
                var key = keys[0];
                storeItems.push(items[key][i]);
            }
            console.log(storeItems["0"], storeItems["1"], storeItems["2"]);
            chrome.runtime.sendMessage({cmd : "ITEMS", items: [storeItems["0"], storeItems["1"], storeItems["2"]]})
        }
        else {
            chrome.runtime.sendMessage({ cmd: "NULL_LOAD"});
        }
    });
}

// PSEUDO CODE

/* 
  onload
    get current date (mm-dd-yy)
    search storage for a value of date
    if null:
        display text options
    else:
        don't display text options

  onclick save
    get current date
    for loop with i iterator (i=0 i<3)
        i) get textarea value of DOM element with id n (n = 0, 1, or 2)
        ii) store each key (date_n) where n is the nth question
            and value (the nth textarea value)
*/