var parseInterval;
// setTimeout(function() {
//     document.querySelector("._1vufyj7w button").click();
//     setTimeout(function() {
//         document.querySelectorAll("._1pf9vde4")[document.querySelectorAll("._1pf9vde4").length - 1].click();
//         setTimeout(function() {
//             document.querySelectorAll("._1ch6oaj5 DayPickerInput")[0].click();
//             document.querySelectorAll("._168j0p10 input")[0].value = "October 13, 2019";

//             setTimeout(function() {
//                 document.querySelectorAll("._1ch6oaj5 DayPickerInput")[1].click();
//                 document.querySelectorAll("._168j0p10 input")[1].value = "November 23, 2019";
//                 setTimeout(function() {
//                     document.querySelector("._ax7u0n7 button").click();
//                     setTimeout(function() {
//                         //parseInterval = setInterval(parsePage, 2000);
//                     }, 1000);
//                 }, 1000);
//             }, 1000);
//         }, 1000);
//     }, 1000);
// }, 1000);


parseInterval = setInterval(parsePage, 3000);

var result = "";
var count = 0;
var rawData =[];
var data;
function parsePage() {
	tbody = document.querySelector("tbody");


	for (var i = 0; i < tbody.rows.length; i++) {
		data={};
		//tbody.rows[i].style.backgroundColor = "yellow";
		//result += document.querySelector("._19etdzks span").textContent;
		if (tbody.rows[i].cells[0].querySelector("._1fiy7l25")) {
			 	data.activity=tbody.rows[i].cells[0].querySelector("._1fiy7l25").innerText;
		} else {
			data.activity= "missing: title?";
		}
		result += "	" + data.activity;
		if (tbody.rows[i].cells[0].querySelector("._vljmd1t path")) {
			var type = tbody.rows[i].cells[0].querySelector("._vljmd1t path").getAttribute("d");
			if (type.search("M7.5 6") === 0) {
				data.type="Exercise";
			} else if (type.search("M6 5.87") === 0) {
				data.type="Video";
			} else if (type.search("M5 3.53") === 0) {
				data.type="Unit Test";
			} else if (type.search("M11") === 0) {
				data.type="Article";
			} else if (type.search("M3") === 0) {
				data.type="Project";
			} else{
				data.type="Unknown";
			}

		} else {
			data.type="missing: type?";
		}
		result += "	" + data.type;
		//console.log("a");
		if (tbody.rows[i].cells[0].querySelector("._1s6kc37i")) {
			data.subject=tbody.rows[i].cells[0].querySelector("._1s6kc37i").innerText;
		} else {
			data.subject="missing: subject";
		}
		result += "	" + data.subject;
		//console.log("b");
		if (tbody.rows[i].cells[1].querySelector("._19thyh0v")) {
			data.dateString=tbody.rows[i].cells[1].querySelector("._19thyh0v").innerText.replace(" at", "");
			data.date=new Date(data.dateString);
		} else {
			data.dateString="missing: date?";
		}
		result += "	" + data.dateString;
		//console.log("c");
		if (tbody.rows[i].cells[2].querySelector("._nnz187")) {
			data.level = tbody.rows[i].cells[2].querySelector("._nnz187").innerText;
		} else if (tbody.rows[i].cells[2].querySelector("._14hvi6g8")) {
			data.level = tbody.rows[i].cells[2].querySelector("._14hvi6g8").innerText;
		} else {
			data.level = "missing: level";
		}
		result += "	" + data.level;

		//console.log("d");
		if (tbody.rows[i].cells[3].querySelector("._nnz187")) {
			data.change= tbody.rows[i].cells[3].querySelector("._nnz187").innerText;
		} else if (tbody.rows[i].cells[3].querySelector("._8czlxtv")) {
			data.change= "improved";
		} else {
			data.change="<B>MISSING</b>";
		}
		result += "	" + data.change;

		//console.log("e");
		if (tbody.rows[i].cells[4].querySelector("._nnz187")) {
			data.correct=tbody.rows[i].cells[4].querySelector("._nnz187").innerText;

		} else {
			data.correct=tbody.rows[i].cells[4].querySelector("._14hvi6g8").innerText;

		}
		result += "	" + data.correct;

		if (tbody.rows[i].cells[5].querySelector("._14hvi6g8")) {
			data.minutes=parseInt(tbody.rows[i].cells[5].querySelector("._14hvi6g8").innerText);
			if (data.minutes===0){
				data.minutes=1;
			}
		} else {
			data.minutes=-1;
		}

		result += "	" + data.minutes;
		result += "\n";
		//console.log("g");
		rawData[count]=data;
		count++;

	}
	chrome.runtime.sendMessage({ count: count, result: result, done: 0 });
	var nextbutton = document.querySelectorAll("._1mav3co7");
	if (nextbutton.length == 2) {
		nextbutton[1].click();
	} else if (nextbutton.length == 1 && nextbutton[0].innerText == "Next") {
		nextbutton[0].click();

	} else {

			chrome.runtime.sendMessage({ count: count, result: result, rawData:rawData,done: 1 });
			clearInterval(parseInterval);
	}
}
//+ + "	"tbody.rows[i].cells[5].querySelector("._14hvi6g8").innerText+"\n";
//var result="";result+=tbody.rows[i].cells[0].querySelector("._1fiy7l25").innerText + "	"+ if(tbody.rows[i].cells[0].querySelector("._1s6kc37i")){tbody.rows[i].cells[0].querySelector("._1s6kc37i").innerText} + "~";};result;
