document.getElementById("language").addEventListener("onchange", languageChange(this), false);

function languageChange(e) {
  const en = ["네이버", "LONGMAN"];
  const ja = ["네이버", "goo 辞書"];
  const ko = ["네이버"];
  const sp = ["네이버", "google"];
  let target = document.getElementById("dictionary"); 

  let d = "";
  if(e.value == "en") {
    d = en;
  } else if(e.value =="ja") {
    d = ja;
  } else if(e.value == "ko") {
    d = ko;
  } else if(e.value == "sp") {
    d = sp;
  }

  target.options.length = 0;

  for (x in d) {
    let opt = documnet.createElement("option");
    opt.value = d[x];
    opt.innerHTML = d[x];
    target.appendChild(opt);
  }
}