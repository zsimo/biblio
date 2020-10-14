"use strict";
var Quagga = window.Quagga;
var App = {
    _scanner: null,
    init: function() {
        this.attachListeners();
    },
    activateScanner: function() {
        var scanner = this.configureScanner('.overlay__content'),
            onDetected = function (result) {
                document.querySelector('input.isbn').value = result.codeResult.code;
                stop();
            }.bind(this),
            stop = function() {
                scanner.stop();  // should also clear all event-listeners?
                scanner.removeEventListener('detected', onDetected);
                this.hideOverlay();
                this.attachListeners();
            }.bind(this);

        this.showOverlay(stop);
        scanner.addEventListener('detected', onDetected).start();
    },
    attachListeners: function() {
        var self = this,
            button = document.querySelector('.input-field input + button.scan');

        button.addEventListener("click", function onClick(e) {
            e.preventDefault();
            button.removeEventListener("click", onClick);
            self.activateScanner();
        });
    },
    showOverlay: function(cancelCb) {
        if (!this._overlay) {
            var content = document.createElement('div'),
                closeButton = document.createElement('div');

            closeButton.appendChild(document.createTextNode('X'));
            content.className = 'overlay__content';
            closeButton.className = 'overlay__close';
            this._overlay = document.createElement('div');
            this._overlay.className = 'overlay';
            this._overlay.appendChild(content);
            content.appendChild(closeButton);
            closeButton.addEventListener('click', function closeClick() {
                closeButton.removeEventListener('click', closeClick);
                cancelCb();
            });
            document.body.appendChild(this._overlay);
        } else {
            var closeButton = document.querySelector('.overlay__close');
            closeButton.addEventListener('click', function closeClick() {
                closeButton.removeEventListener('click', closeClick);
                cancelCb();
            });
        }
        this._overlay.style.display = "block";
    },
    hideOverlay: function() {
        if (this._overlay) {
            this._overlay.style.display = "none";
        }
    },
    configureScanner: function(selector) {
        if (!this._scanner) {
            this._scanner = Quagga
                .decoder({readers: ['ean_reader']})
                .locator({patchSize: 'medium'})
                .fromSource({
                    target: selector,
                    constraints: {
                        width: 800,
                        height: 600,
                        facingMode: "environment"
                    }
                });
        }
        return this._scanner;
    }
};
App.init();


// console.log(Quagga);

// var Quagga = window.Quagga;
// var App = {
//     _scanner: null,
//     init: function() {
//         this.attachListeners();
//     },
//     activateScanner: function() {
//         var scanner = this.configureScanner('.overlay__content'),
//             onDetected = function (result) {
//                 document.querySelector('input.isbn').value = result.codeResult.code;
//                 stop();
//             }.bind(this),
//             stop = function() {
//                 scanner.stop();  // should also clear all event-listeners?
//                 scanner.removeEventListener('detected', onDetected);
//                 this.hideOverlay();
//                 this.attachListeners();
//             }.bind(this);
//
//         this.showOverlay(stop);
//         scanner.addEventListener('detected', onDetected).start();
//     },
//     attachListeners: function() {
//         var self = this,
//             button = document.querySelector('.input-field input + button.scan');
//
//         button.addEventListener("click", function onClick(e) {
//             e.preventDefault();
//             button.removeEventListener("click", onClick);
//             self.activateScanner();
//         });
//     },
//     showOverlay: function(cancelCb) {
//         if (!this._overlay) {
//             var content = document.createElement('div'),
//                 closeButton = document.createElement('div');
//
//             closeButton.appendChild(document.createTextNode('X'));
//             content.className = 'overlay__content';
//             closeButton.className = 'overlay__close';
//             this._overlay = document.createElement('div');
//             this._overlay.className = 'overlay';
//             this._overlay.appendChild(content);
//             content.appendChild(closeButton);
//             closeButton.addEventListener('click', function closeClick() {
//                 closeButton.removeEventListener('click', closeClick);
//                 cancelCb();
//             });
//             document.body.appendChild(this._overlay);
//         } else {
//             var closeButton = document.querySelector('.overlay__close');
//             closeButton.addEventListener('click', function closeClick() {
//                 closeButton.removeEventListener('click', closeClick);
//                 cancelCb();
//             });
//         }
//         this._overlay.style.display = "block";
//     },
//     hideOverlay: function() {
//         if (this._overlay) {
//             this._overlay.style.display = "none";
//         }
//     },
//     configureScanner: function(selector) {
//         if (!this._scanner) {
//             this._scanner = Quagga
//                 .decoder({readers: ['ean_reader']})
//                 .locator({patchSize: 'medium'})
//                 .fromVideo({
//                     target: selector,
//                     constraints: {
//                         width: 800,
//                         height: 600,
//                         facingMode: "environment"
//                     }
//                 });
//         }
//         return this._scanner;
//     }
// };
// App.init();


// return;
// var barcodescanner = new BarcodeScanner();
//
// barcodescanner.scan({
//     formats: "QR_CODE,PDF_417",   // Pass in of you want to restrict scanning to certain types
//     cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
//     cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
//     message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
//     showFlipCameraButton: true,   // default false
//     preferFrontCamera: false,     // default false
//     showTorchButton: true,        // default false
//     beepOnScan: true,             // Play or Suppress beep on scan (default true)
//     fullScreen: true,             // Currently only used on iOS; with iOS 13 modals are no longer shown fullScreen by default, which may be actually preferred. But to use the old fullScreen appearance, set this to 'true'. Default 'false'.
//     torchOn: false,               // launch with the flashlight on (default false)
//     closeCallback: function () { console.log("Scanner closed"); }, // invoked when the scanner was closed (success or abort)
//     resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
//     orientation: "landscape",     // Android only, optionally lock the orientation to either "portrait" or "landscape"
//     openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
// }).then(
//     function(result) {
//         console.log("Scan format: " + result.format);
//         console.log("Scan text:   " + result.text);
//     },
//     function(error) {
//         console.log("No scan: " + error);
//     }
// );