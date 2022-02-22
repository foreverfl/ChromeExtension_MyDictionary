chrome.storage.sync.get(function (data) {
    let entry = data.entry;
    let hurigana = data.hurigana;
    let definition_01 = data.definition_01;
    let definition_02 = data.definition_02;
    let definition_03 = data.definition_03;
    let example_01_01 = data.example_01_01;
    let example_01_02 = data.example_01_02;
    let example_02_01 = data.example_02_01;
    let example_02_02 = data.example_02_02;
    let example_03_01 = data.example_03_01;
    let example_03_02 = data.example_03_02;

    document.getElementById("entry").innerHTML = entry + '\n' + hurigana + '\n' + definition_01;


})