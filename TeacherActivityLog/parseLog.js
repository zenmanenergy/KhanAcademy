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


parseInterval = setInterval(parsePage, 2000);


var result = "";
var count = 0;

function parsePage() {
	tbody = document.querySelector("tbody");
	for (var i = 0; i < tbody.rows.length; i++) {
		//console.log(i);
		result += document.querySelector("._19etdzks span").textContent;
		if (tbody.rows[i].cells[0].querySelector("._1fiy7l25")) {
			result += "	" + tbody.rows[i].cells[0].querySelector("._1fiy7l25").innerText;
		} else {
			result += "	" + "missing: title?";
		}
		if (tbody.rows[i].cells[0].querySelector("._vljmd1t path")) {
			var type = tbody.rows[i].cells[0].querySelector("._vljmd1t path").getAttribute("d");
			if (type.search("M7.5 6") === 0) {
				result += "	" + "Exercise";
			} else if (type.search("M6 5.87") === 0) {
				result += "	" + "Video";
			} else if (type.search("M5 3.53") === 0) {
				result += "	" + "Unit Test";
			} else if (type.search("M11") === 0) {
				result += "	" + "Article";
			} else if (type.search("M3") === 0) {
				result += "	" + "Project";
			}
		} else {
			result += "	" + "missing: type?";
		}
		//console.log("a");
		if (tbody.rows[i].cells[0].querySelector("._1s6kc37i")) {
			result += "	" + tbody.rows[i].cells[0].querySelector("._1s6kc37i").innerText;
		} else {
			result += "	" + "missing: subject";
		}

		//console.log("b");
		if (tbody.rows[i].cells[1].querySelector("._19thyh0v")) {
			result += "	" + tbody.rows[i].cells[1].querySelector("._19thyh0v").innerText.replace(" at", "");
		} else {
			result += "	" + "missing: date?";
		}
		//console.log("c");
		if (tbody.rows[i].cells[2].querySelector("._nnz187")) {
			result += "	" + tbody.rows[i].cells[2].querySelector("._nnz187").innerText;
		} else if (tbody.rows[i].cells[2].querySelector("._14hvi6g8")) {
			result += "	" + tbody.rows[i].cells[2].querySelector("._14hvi6g8").innerText;
		} else {
			result += "	" + "missing: level";

		}
		//console.log("d");
		if (tbody.rows[i].cells[3].querySelector("._nnz187")) {
			result += "	" + tbody.rows[i].cells[3].querySelector("._nnz187").innerText;
		} else if (tbody.rows[i].cells[3].querySelector("._8czlxtv")) {
			result += "	" + "improved";
		} else {
			result += "	" + "<B>MISSING</b>";
		}
		//console.log("e");
		if (tbody.rows[i].cells[4].querySelector("._nnz187")) {
			result += "	" + tbody.rows[i].cells[4].querySelector("._nnz187").innerText;
		} else {
			result += "	" + tbody.rows[i].cells[4].querySelector("._14hvi6g8").innerText;
		}
		if (tbody.rows[i].cells[5].querySelector("._14hvi6g8")) {
			result += "	" + tbody.rows[i].cells[5].querySelector("._14hvi6g8").innerText;
		} else {
			result += "	" + "missing: minutes";
		}
		result += "\n";
		//console.log("g");
		count++;
	}
	chrome.runtime.sendMessage({ count: count, result: result, done: 0 });
	var nextbutton = document.querySelectorAll("._1mav3co7");
	if (nextbutton.length == 2) {
		nextbutton[1].click();
	} else if (nextbutton.length == 1 && nextbutton[0].innerText == "Next") {
		nextbutton[0].click();

	} else {
		chrome.runtime.sendMessage({ count: count, result: result, done: 1 });
		clearInterval(parseInterval);
	}
}
//+ + "	"tbody.rows[i].cells[5].querySelector("._14hvi6g8").innerText+"\n";
//var result="";result+=tbody.rows[i].cells[0].querySelector("._1fiy7l25").innerText + "	"+ if(tbody.rows[i].cells[0].querySelector("._1s6kc37i")){tbody.rows[i].cells[0].querySelector("._1s6kc37i").innerText} + "~";};result;