  // Listen for commands
  var answers;
// Await for user save
document.getElementById("save").addEventListener("click", function(){
    answers = [document.getElementById('1').value, document.getElementById("2").value, document.getElementById("3").value];
    chrome.runtime.sendMessage({ cmd: 'ANSWERS', answers: answers });
    console.log("Responded with " + answers); 
});


// Await search
document.getElementById("search").addEventListener("click", function(){
    var when = document.getElementById("when").value;
    if (when){
        chrome.runtime.sendMessage({ cmd: "FETCH", when: when });
    }
});

// Retrieve Items
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === 'ITEMS') {
        document.getElementById("past").innerHTML = '<span></span>';
        var items = request.items;
        var message = ["Something Im proud of! ", "A struggle I encountered: ", "Possible solution for this struggle: "];
        console.log("ITEMS: " + items);
        for (i=0;i<items.length;i++){
            document.getElementById("past").innerHTML += '<div id="question" class="row justify-content-center">\
                <label for="formGroupExampleInput">' + message[i] + '</label>\
                <p><br> ---></p>\
                <p>' + items[i] + '</p>\
            </div>';
        }
    }
    else if (request.cmd === "NULL_LOAD") {
        document.getElementById("past").innerHTML = '<div class="row justify-content-center"> Sorry! Nothing there yet. </div>';
    }
});

function hide() {
    document.getElementById("questions").innerHTML = '<div hidden style="padding: 25px;">\
    <div class="form-group">\
        <label for="formGroupExampleInput">Something Im proud of!</label>\
        <textarea type="text" class="form-control" id="1" placeholder="Here!"></textarea>\
    </div>\
    <div class="form-group">\
        <label for="formGroupExampleInput">A struggle I encountered:</label>\
        <textarea type="text" class="form-control" id="2" placeholder="Here!"></textarea>\
    </div>\
    <div class="form-group">\
        <label for="formGroupExampleInput">Possible solution for this struggle:</label>\
        <textarea type="text" class="form-control" id="3" placeholder="Here!"></textarea>\
    </div>\
    \
    \
    <!-- Save Button -->\
    <a id="save" style="color: white;" class="button6">Save</a>\
    </div>';
}

function display() {
    document.getElementById("questions").innerHTML = '<div style="padding: 25px;">\
    <div class="form-group">\
        <label for="formGroupExampleInput">Something Im proud of!</label>\
        <textarea type="text" class="form-control" id="1" placeholder="Here!"></textarea>\
    </div>\
    <div class="form-group">\
        <label for="formGroupExampleInput">A struggle I encountered:</label>\
        <textarea type="text" class="form-control" id="2" placeholder="Here!"></textarea>\
    </div>\
    <div class="form-group">\
        <label for="formGroupExampleInput">Possible solution for this struggle:</label>\
        <textarea type="text" class="form-control" id="3" placeholder="Here!"></textarea>\
    </div>\
    \
    \
    <!-- Save Button -->\
    <a id="save" style="color: white;" class="button6">Save</a>\
    </div>';
}