const button = document.getElementById("translatePage");


// When the button is clicked, inject translate into current page
let pageLanguage = 'en',
  translateLanguage = 'de',
  languages = pageLanguage + translateLanguage;
button.addEventListener("click", async (diff) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: translate, // execute function to transalte 
    args: [languages]
  });
});

// The body of this function will be execuetd as a content script inside the current page
function translate(lang) {
  const pageLang = lang[0] + lang[1],
    translateLang = lang[2] + lang[3];
  const pTags = document.querySelectorAll('p');

  pTags.forEach((tag) => {
    wrappingWords(tag);
  });

  function wrappingWords(currTag) {
    const wordsArr = currTag.innerText.split(' ')
    //const numOfWordsToChange = Math.floor(wordsArr.length / difficulty); // Depricated functionality
    //const indexes = generateIndexes(numOfWordsToChange, wordsArr.length); // Depricated functionality

    currTag.innerText = '';
    wordsArr.forEach((word, ind) => {
      if (true) {
        const aTag = document.createElement('a'),
          beginningOfLink = `https://translate.google.com/?sl=${pageLang}&tl=${translateLang}&text=`,
          endOfLink = '&op=translate';
        
        aTag.href = beginningOfLink + word + endOfLink;
        aTag.innerText = ` ${word}`;
        currTag.appendChild(aTag);
      } 
      // else {                                             // Depricated span tag functionality (pointless with our change in function)
      //   const spanTag = document.createElement('span');
      //   spanTag.innerText = ` ${word}`;
      //   currTag.appendChild(spanTag);
      // }

    })
  }
                                                              // Old less effective way of choosing which words to change
  // function generateIndexes(numOfInd, max) {
  //   let count = 0;
  //   const output = [];
  //   while(count < numOfInd) {
  //     let currInd = Math.floor(Math.random() * max);
  //     if (!output.includes(currInd)) {
  //       output.push(currInd);
  //       count++;
  //     }
  //   }

  //   return output;
  // }
}