var s = document.createElement('script');
s.src = chrome.extension.getURL('/static/js/nmail_checker.js');
(document.head || document.documentElement).appendChild(s);