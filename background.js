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
      let parser_01 = new DOMParser();  // Parse the text.
      let doc = parser_01.parseFromString(html, "text/html");
      let dictionary_link = doc.querySelector('.yuRUbf > a').toString();

      // searching for the entry word(inner fetch function)
      fetch(dictionary_link)
        .then(function (response) {
          return response.text()
        })
        .then(function (html) {
          let parser_02 = new DOMParser();
          doc = parser_02.parseFromString(html, "text/html");

          // variables to save information of a word
          let entry, hurigana;
          let definition = new Array(3);
          let example = [[,], [,], [,]];

          // entry of a word
          let entry_pre_01 = doc.querySelector('.basic_title').textContent.trim();
          let entry_pre_02 = entry_pre_01.split(" ");
          let entry_with_hurigana = entry_pre_02[0];
          let entry_with_hurigana_arr = entry_with_hurigana.split(/（|）/);
          entry = entry_with_hurigana_arr[0];
          hurigana = entry_with_hurigana_arr[1];

          // console.log(entry)
          // console.log(hurigana);

          // definition of a word
          const explanation = doc.querySelectorAll('.meaning > li > p.text');

          for (let i = 0; i < 3; i++) {
            if (explanation[i] !== undefined) { // processing exception
              let definition_and_example = explanation[i].textContent.trim();
              let definition_and_example_arr = definition_and_example.split(/「|」/);
              definition[i] = definition_and_example_arr[0];

              // console.log(definition[i]);

              // examples of a word
              if (definition_and_example_arr[1] !== undefined) { // processing exception
                example[i][0] = definition_and_example_arr[1];

                // console.log(example[i][0]);
              }

              if (definition_and_example_arr[3] !== undefined) { // processing exception
                example[i][1] = definition_and_example_arr[3];
                // console.log(example[i][1]);
              }
            }
          }

          chrome.storage.sync.set({ // saving in the chrome strorage as key/value.
            entry: entry,
            hurigana: hurigana,
            definition_01: definition[0],
            definition_02: definition[1],
            definition_03: definition[2],
            example_01_01: example[0][0],
            example_01_02: example[0][1],
            example_02_01: example[1][0],
            example_02_02: example[1][1],
            example_03_01: example[2][0],
            example_03_02: example[2][1]
          })


        })
        .catch(function (err) {
          console.log('Failed to fetch page: ', err);
        });

    })
    .catch(function (err) {
      console.log('Failed to fetch page: ', err);
    });

});