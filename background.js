// injection
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js']
  });
});


// information of words
chrome.storage.sync.get(function (data) {
  let url_ja_goo_search = data.site;

  // searching for the entry page(outer fetch function)
  fetch(url_ja_goo_search)
    .then(function (response) { // When the page is loaded convert it to text.
      return response.text()
    })
    .then(function (html) { // Initialize the DOM parser.
      const parser_01 = new DOMParser();  // Parse the text.
      const doc = parser_01.parseFromString(html, "text/html");
      let dictionary_link = doc.querySelector('.yuRUbf > a').toString();

      // searching for the entry word(inner fetch function)
      fetch(dictionary_link)
        .then(function (response) {
          return response.text()
        })
        .then(function (html) { 
          const parser_02 = new DOMParser(); 
          const doc = parser_02.parseFromString(html, "text/html");

          const entry = doc.querySelector('.basic_title').textContent.trim();
         
          const entry_final = entry.split(" ");

          console.log(entry_final[0]); // entry

          // chrome.storage.sync.set({ // saving in the chrome strorage as key/value.
          //   entry_jp_goo: entry_final[0]
          // })

          // const explanation = doc.querySelectorAll('p.text');
          // for (let i = 0; i < 3; i++) {
          //   const line = explanation[i].textContent.trim();
          //   const definition = line.split('「');
          //   const definition_final = definition[0];
          //   console.log(definition_final);

          //   if (definition[1] !== undefined) {
          //     const example_01 = definition[1].replace('」', '。');
          //     console.log(example_01);
          //   }

          //   if (definition[2] !== undefined) {
          //     const example_02 = definition[2].replace('」', '。');
          //     console.log(example_02);
          //   }
          // }

        })
        .catch(function (err) {
          console.log('Failed to fetch page: ', err);
        });

    })
    .catch(function (err) {
      console.log('Failed to fetch page: ', err);
    });

});