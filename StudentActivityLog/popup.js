

document.getElementById("getDataButton").addEventListener("click", getData);
//chrome.runtime.onMessage.addListener(onMessage);

function getData(){

	document.querySelector("#rawData").innerHTML = "<br><span style='background-color: yellow;font-size:20px;'>Processing...<br>Don't click anything until this message goes away</span>";
	console.log("getdata");
	//getStudentName();

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

	 	if (request.done){
			var subjects=[];
			for (var i=0;i < request.rawData.length; i++){

				if (!subjects[request.rawData[i].subject]){
					subjects[request.rawData[i].subject]=parseInt(request.rawData[i].minutes);

				} else{
					subjects[request.rawData[i].subject]=subjects[request.rawData[i].subject] + parseInt(request.rawData[i].minutes);

				}
			}
			var table="<table class='table' width=70% border=0 cellpadding=0 cellspacing=0>"
			table += "<tr class=tablerow><td><b>Subject</b></td><td><b>Minutes</b></td></tr>";
			for (var i in subjects){
				table +="<tr class='tablerow'>";
				table +="<td>" + i + "</td>";

				table +="<td>" + subjects[i] + "</td>";
				table +="</tr>";

			}
			table +="</table>";

			document.querySelector("#rawData").innerHTML = table;
			}
  	// //document.querySelector("#rawData").innerHTML = request.result;
  	// var filename=student + "-activityLog.csv";
  	// console.log(filename);
  	// if (request.done){
  	// 	downloadFile({
		//   filename: filename,
		//   content: request.result
		// });
		//}
  });
// Download file with custom content


// => {
//        const lastErr = chrome.runtime.lastError;
//        if (lastErr) console.log('tab: ' + tab.id + ' lastError: ' + JSON.stringify(lastErr));
//    });
