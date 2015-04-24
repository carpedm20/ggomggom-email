var gmail;

function refresh(f) {
  if( (/in/.test(document.readyState)) || (undefined === Gmail) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

var main = function(){
  gmail = new Gmail();

  gmail.observe.on('compose', function(compose, type) {
    var new_tab = function() {
      code = "var form = document.createElement('form');form.setAttribute('method', 'post');form.setAttribute('target', '_blank');form.setAttribute('id', 'ggomggom');form.setAttribute('action', 'http://speller.cs.pusan.ac.kr/PnuSpellerISAPI_201503/lib/check.asp');var params = {text1: `CHANGE`};for(var key in params) {var hiddenField = document.createElement('input');hiddenField.setAttribute('type', 'hidden');hiddenField.setAttribute('name', key);hiddenField.setAttribute('value', params[key]);form.appendChild(hiddenField);} form.submit();";
      fakePostCode = code.replace(/(\n|\t)/gm,'').replace("CHANGE", convertHtmlToText(compose.body()));
      eval(fakePostCode);
    };
    gmail.tools.add_compose_button(compose, '맞춤법 검사', new_tab, 'T-I-atl T-I-Zf-aw2 T-I-KE');
  });
};

refresh(main);

function convertHtmlToText(inputText) {
  var returnText = "" + inputText;

  //-- remove BR tags and replace them with line break

  returnText=returnText.replace(/<\/div>/gi, "\n");
  returnText=returnText.replace(/<br>/gi, "\n");
  returnText=returnText.replace(/<br\s\/>/gi, "\n");
  returnText=returnText.replace(/<br\/>/gi, "\n");

  //-- remove P and A tags but preserve what's inside of them
  returnText=returnText.replace(/<\/p>/gi, "\n");
  returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2");

  //-- remove all inside SCRIPT and STYLE tags
  returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText=returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g,'');

  //-- get rid of html-encoded characters:
  returnText=returnText.replace(/&nbsp;/gi," ");
  returnText=returnText.replace(/&amp;/gi,"&");
  returnText=returnText.replace(/&quot;/gi,'"');
  returnText=returnText.replace(/&lt;/gi,'<');
  returnText=returnText.replace(/&gt;/gi,'>');

  //-- return
  return returnText;
}