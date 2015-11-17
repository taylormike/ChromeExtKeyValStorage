$(function () {
    $('#addAmount').click(function () {
        chrome.extension.sendMessage({ action: "getStorage", storageKey: "total" }, function (response) {
            console.log("Popup Tracing: sendMessage getStorage");
            console.log("Popup Tracing: storage received: " + response.storageValue);

            var newTotal = 0;
            if (response.storageValue) {
                newTotal += parseInt(response.storageValue);
                console.log("Popup Tracing: newTotal " + newTotal);
            }

            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
                console.log("Popup Tracing: newTotal " + newTotal);
            }
            chrome.extension.sendMessage({ action: "setStorage", storageKey: "total", storageValue: newTotal }, function (response) {
                console.log("Popup Tracing: sendMessage setStorage");
                console.log("Popup Tracing: storage written: " + response.storageValue)
            });

            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});