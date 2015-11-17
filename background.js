// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
      if (request.action == "getStorage") {
          console.log("Background Tracing: getStorage");
          console.log("Background Tracing: storageKey: " + request.storageKey);

          chrome.storage.sync.get(request.storageKey, function (items) {
              var newTotal = 0;
              if (items[request.storageKey]) {
                  newTotal = parseInt(items[request.storageKey]);
              }
              sendResponse({ storageValue: newTotal });
          });
          return true; // calls send message later
      }
      else if (request.action == "setStorage") {
          console.log("Background Tracing: setStorage");
          console.log("Background Tracing: storageKey: " + request.storageKey);
          console.log("Background Tracing: storageValue: " + request.storageValue);
  
          var save = {};
          var key = request.storageKey;
          var value = request.storageValue;
          save[key] = value;

          chrome.storage.sync.set(save, function () {
              console.log("Background Tracing: setStorage written");
              sendResponse({ storageValue: save[key] });
          });
          return true; // calls send message later
      }
      return false; // does not call send message later
  });