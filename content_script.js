// iframe for dictionary
document.addEventListener('dblclick', showDic);


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


function showDic() {
  document.body.appendChild(iframe);
}

document.addEventListener('click', removeDic);

function removeDic() { // 'document.body.appendChild(iframe)' causes errors to occur.
  let iframes = document.querySelectorAll('iframe');
  for (let i = 0; i < iframes.length; i++) {
    iframes[i].parentNode.removeChild(iframes[i]);
  }
}

// selecting texts and saving
document.addEventListener('dblclick', GetSelectedText);

const copiedText = { property: 'tmp' };
function GetSelectedText() {
  if (window.getSelection) {
    let range = window.getSelection();
    copiedText.property = range.toString(); // a selected text
    
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
    let url_ja_goo_search = url_ja_goo + copiedText.property + '+goo';
    let url_ko_naver_search = '';
    let url_sp_naver_search = '';
    let url_sp_google_search = '';

    console.log(url_ja_goo_search);

  }
}




const temp = 'https://www.google.com/search?q=%E5%8F%AF%E6%84%9B%E3%81%8F%E3%81%A6+goo';
let dictionary_link = '';

// searching for the entry page
fetch(temp)
  .then(function (response) { // When the page is loaded convert it to text.
    return response.text()
  })
  .then(function (html) { // Initialize the DOM parser.
    const parser = new DOMParser();  // Parse the text.
    const doc = parser.parseFromString(html, "text/html");
    dictionary_link = doc.querySelector('.yuRUbf > a').toString();
  })
  .catch(function (err) {
    console.log('Failed to fetch page: ', err);
  });
  
  
fetch(dictionary_link) // dictionary sites after searched
  .then(function (response) { // When the page is loaded convert it to text.
    return response.text()
  })
  .then(function (html) { // Initialize the DOM parser.
    const parser = new DOMParser();  // Parse the text.
    const doc = parser.parseFromString(html, "text/html");

    const entry = doc.querySelector('h2.nolink').textContent.trim();
    const entry_final = entry.split(" ");

    console.log(entry_final[0]); // entry

    const explanation = doc.querySelectorAll('p.text');
    for (let i = 0; i < 3; i++) {
      const line = explanation[i].textContent.trim();
      const definition = line.split('「');
      const definition_final = definition[0];
      console.log(definition_final);

      if (definition[1] !== undefined) {
        const example_01 = definition[1].replace('」', '。');
        console.log(example_01);
      }

      if (definition[2] !== undefined) {
        const example_02 = definition[2].replace('」', '。');
        console.log(example_02);
      }
    }

  })
  .catch(function (err) {
    console.log('Failed to fetch page: ', err);
  });
