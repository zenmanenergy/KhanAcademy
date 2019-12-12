# KhanAcademy Activity log Data Scaper v1.0

This tool is a temporary fix until the developers at KhanAcademy.org are able to spend the time to upgrade the activity log. My hope is that at some point this tool will not be needed any longer. This tool is a proof of concept, so PLEASE forgive me if it has bugs. If you are a programmer and interested in helping to upgrade this code, fork this repository and edit it.

# Why does this exist?
When grading students I struggle to gain insight into how much they worked in a given grading cycle, what they are working on and what they are struggling with. All of that data exists, but I find the teacher user interface requires too many clicks. In my last grading cycle my students had 3020 records of data in their combined activity logs. To view all of this data requires... no joke... 302 mouse clicks! Also, all of the subjects for a single student are combined together. It simply took too long to do anything with the data in its current form.

To solve this issue I decided the best solution was to get the activity log into a spreadsheet at which point I can manipulate the data to my heart's content. There is a csv file available for download in the settings page, but it only includes information on assignments. It does not give me a full view of the students' activity. 

# How does it work?
This tool is a Google Chrome Extension. It works by reading the HTML of the page, searching through the document object model and extracting the raw data saving it into a big array. It will automatically click the 'next' button until it gets to the end of the log. Once it is finished it will create a CSV file which you can download and import into any spreadsheet.

# How do I use it?
First you have to install it in your Chrome browser (it ONLY works in Google Chrome!) Once installed in the browser you will see a button, with a little magic wand on it, in the browser to the right of the address bar. Go to the teacher dashboard, choose a class and a student, choose the start/end date then press the magic wand. 

# Can I download a whole class all at once?
Not yet. Right now it requires pressing the button one student at a time. I agree this is a major annoyance! But I struggled to get it to automatically select the dates. If anyone wants to help fix that problem, let's brainstorm. I'll explain what I know so far and maybe you can pick up where I left off! 

# Is there anything dangerous in these files?
Nope. It's all open source, have a look for yourself!
