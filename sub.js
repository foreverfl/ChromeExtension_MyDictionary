chrome.storage.sync.get(function (data) {
    let temp = data.entry_jp_goo;

    console.log(temp);
    document.getElementById("entry").innerHTML = temp;  
})