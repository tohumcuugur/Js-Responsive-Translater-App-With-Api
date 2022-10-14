const fromLang = document.querySelector("#from-lang");
const toLang = document.querySelector("#to-lang");
const btnTranslate = document.querySelector("#btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const exchange = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons")

for(let lang in languages){
    // console.log(lang , languages[lang]);
    let option = `
        <option value="${lang}">${languages[lang]}</option>
    `
    fromLang.insertAdjacentHTML("beforeend", option);
    toLang.insertAdjacentHTML("beforeend", option);

    fromLang.value ="tr-TR";
    toLang.value ="en-GB";

}

btnTranslate.addEventListener("click", () => {
    let text = fromText.value;
    // console.log(text);
    let from = fromLang.value;
    let to = toLang.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${from}|${to}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            toText.value = data.responseData.translatedText;
        })
});

exchange.addEventListener("click", () => {
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLang.value;
    fromLang.value = toLang.value;
    toLang.value = lang;
});

for(let icon of icons){
    icon.addEventListener("click", (element) => {
        if(element.target.classList.contains("fa-copy")){
            if(element.target.id == "from"){
                // console.log("copy from");
                navigator.clipboard.writeText(fromText.value);
            }else{
                // console.log("copy to");
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;
            if(element.target.id == "from"){
                // console.log("volume to");
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = fromLang.value
            }else{
                // console.log("volume form")
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = toLang.value
            }
            speechSynthesis.speak(utterance)
        }
    });
}



 