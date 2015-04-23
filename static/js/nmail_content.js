var j = document.createElement('script');
j.src = chrome.extension.getURL('/static/js/jquery-1.11.2.min.js');
(document.head || document.documentElement).appendChild(j);

var s = document.createElement('script');
s.src = chrome.extension.getURL('/static/js/nmail_checker.js');
(document.head || document.documentElement).appendChild(s);