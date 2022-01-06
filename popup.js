// Initialize button with users's prefered color
// Initialize button with users's prefered color
let translatePage = document.getElementById("translatePage"); // Eric note = alter this line

// Eric note: alter this file for our own button
chrome.storage.sync.get("color", ({ color }) => {
  translatePage.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
// Eric note: This is in reference to the 'green' button. In our case, it will be a button that reads 'Translate'
translatePage.addEventListener("click", async (diff) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: translate, // execute function to transalte 
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
// Eric note: put our functionality here
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

function translate() {
  const pTags = document.querySelectorAll('p');
  let difficulty = Number(window.prompt('Please enter a difficulty 1 being the hardest with larger numbers being easier: '));
  while (Math.floor(difficulty) !== difficulty || difficulty < 0 || Number.isNaN(difficulty)) {
    difficulty = Number(window.prompt('Please enter a whole integer greater than 0: '));
  }

  pTags.forEach((tag) => {
    pickingOutWords(tag);
  });

  function pickingOutWords(currTag) {
    const wordsArr = currTag.innerText.split(' ')
    const numOfWordsToChange = Math.floor(wordsArr.length / difficulty);
    //const indexes = generateIndexes(numOfWordsToChange, wordsArr.length);

    currTag.innerText = '';
    wordsArr.forEach((word, ind) => {
      if (Math.random() <= (1/difficulty)) {
        const newWord = 'TRANSLATE';
        const HTML = ` <strong> ${newWord} </strong> `
        currTag.innerHTML += HTML;
      } else {
        currTag.innerText += ` ${word}`;
      }

    })
  }

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