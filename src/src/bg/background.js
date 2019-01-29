/*
 * Default example of using a message handler - this code is
 * all but unused. You could probably delete it unless
 * some kind of listener was necessary.
*/

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.pageAction.show(sender.tab.id);
    
    sendResponse();
  });