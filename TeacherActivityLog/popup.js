

document.getElementById("getDataButton").addEventListener("click", getData);
//chrome.runtime.onMessage.addListener(onMessage);

function getData(){
	getStudentName();

	getLogTable();
	
}


var student;
function getStudentName(){
	chrome.tabs.query({active: true}, function(tabs) {
	  chrome.tabs.executeScript(null, {
	    code: 'document.querySelector("._19etdzks span").textContent'
	  }, function(results){
		  student=results;
		  document.querySelector("#studentName").innerHTML = "<p>Student: " + student + "</p>";
		});
	});
}

function getLogTable(){
	chrome.tabs.query({active: true}, function(tabs) {
		chrome.tabs.executeScript(null, {
	  	file :'parseLog.js'
	  }, function(results){
		  
		  
		  
		  /*
		  
			*/
		});
	});
}

function downloadFile(options) {
    if(!options.url) {
        var blob = new Blob([ options.content ], {type : "text/csv;charset=UTF-8"});
        options.url = window.URL.createObjectURL(blob);
    }
    chrome.downloads.download({
        url: options.url,
        filename: options.filename
    })
}


function message(result){
	console.log("new message!");
	console.log(result);
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
  	console.log(request.count);
  	document.querySelector("#rowCount").innerHTML = "Number of Rows:" + request.count;

  	//document.querySelector("#rawData").innerHTML = request.result;
  	var filename=student + "-activityLog.csv";
  	console.log(filename);
  	if (request.done){
  		downloadFile({
		  filename: filename,
		  content: request.result
		});
	}
  });
// Download file with custom content


// => {
//        const lastErr = chrome.runtime.lastError;
//        if (lastErr) console.log('tab: ' + tab.id + ' lastError: ' + JSON.stringify(lastErr));
//    });