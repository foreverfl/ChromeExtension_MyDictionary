// iframe for dictionary
let iframe = document.createElement('iframe');
iframe.style.height = "200px";
iframe.style.width = "400px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "10px"; // right margin
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "none";
iframe.style.boxShadow = "4px 5px 10px gray;"
iframe.id = 'dictionary';
iframe.src = chrome.runtime.getURL("dictionary.html");
iframe.scrolling = "no";

// showring iframe
document.addEventListener('dblclick', showDic);

function showDic() {
  document.body.appendChild(iframe);
}

// processing texts
document.addEventListener('dblclick', GetSelectedText);

function GetSelectedText() {
  if (window.getSelection) {
    let range = window.getSelection();
    let copiedText = range.toString(); // a selected text

    // basic query for search
    let url_en_naver = '';
    let url_en_longman = '';
    let url_ja_naver = '';
    let url_ja_goo = 'https://www.google.com/search?q=';
    let url_ko_naver = '';
    let url_sp_naver = '';
    let url_sp_google = '';

    // query for search
    let url_en_naver_search = '';
    let url_en_longman_search = '';
    let url_ja_naver_search = '';
    let url_ja_goo_search = url_ja_goo + copiedText.trim() + '+goo';
    let url_ko_naver_search = '';
    let url_sp_naver_search = '';
    let url_sp_google_search = '';


    chrome.storage.sync.set({ // saving in the chrome strorage as key/value.
      site: url_ja_goo_search,
      test: 'test value'
    })

  }
}

// removing iframe
document.addEventListener('click', removeDic);

function removeDic() { // 'document.body.appendChild(iframe)' causes errors to occur.
  let iframes = document.querySelectorAll('iframe');
  for (let i = 0; i < iframes.length; i++) {
    iframes[i].parentNode.removeChild(iframes[i]);
  }
  
}
