// Initialize button with users's prefered color
let changeColor = document.getElementById("changeColor"); // Eric note = alter this line

// Eric note: alter this file for our own button
chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
// Eric note: This is in reference to the 'green' button. In our case, it will be a button that reads 'Translate'
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor, // execute function to transalte 
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
