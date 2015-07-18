angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
  alert('here');
  //document.addEventListener('deviceready', this.onDeviceReady, false);
  $scope.tapping = function(){
    $scope.app.initialize();
  };

$scope.app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
          document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      alert('1');
        // When the device is ready, hide the listening element
        app.hideElement('.listening');

        // Display that the device is ready
        app.showElement('.received');

        // Initialize Triangle
        // TODO: change these values to values you obtain for your own application from triangle.io
        navigator.triangle.initialize(
            "vZbpthAY7lCMEQF", // application ID
            "JyA9Qbil4E", // access key
            "O7ZiSeoLFzUs0M7zoJl5IsKrNtNTDJaMUw6AXMCiV6NYIgxN2gMzZZVmnxvpqv7W", // secret key
            function () // success callback
            {
                // Hide that the device is ready, it's given now
                app.hideElement('.received');
                alert('I am here too');
                // Display the Triangle ready element
                app.showElement('.triangle-ready');

                // Subscribe to events that the Triangle APIs raise
                document.addEventListener('ontaperror', app.onTapError, false);
                document.addEventListener('ontapdetect', app.onTapDetect, false);
                document.addEventListener('ontapsuccess', app.onNewCard, false);
            },
            function (message) // error callback
            {
                console.log("there was an error initializing the Triangle APIs");
                console.error(message);
            }
        );
    },
    showElement: function (css)
    {
        var parentElement = document.getElementById('notifications');
        var element = parentElement.querySelector(css);

        element.setAttribute('style', 'display:block');
    },
    hideElement: function (css)
    {
        var parentElement = document.getElementById('notifications');
        var element = parentElement.querySelector(css);

        element.setAttribute('style', 'display:none');
    },
    onNewCard: function (card)
    {
        console.log("Scanned card successfully.");

        // Display basic card information to the user
        // various other properties such as cardholderName,
        // activationDate, expiryDate, cardPreferredName, and encryptedAccountNumber
        // may be available.
        var dataToShow = card.cardBrand;
        if (card.cardholderName != undefined)
        {
            dataToShow += "\n" + card.cardholderName;
        }
        dataToShow += "\n**** **** **** " + card.lastFourDigits;

        alert(dataToShow);
    },
    onTapDetect: function ()
    {
        console.log("Detected new tap.");
    },
    onTapError: function(error)
    {
        console.log("Error processing contactless card.");
        console.error(error);
    }
};
  

})

.controller('DashCtrl', function($scope) {

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

//  http.$get('flashpay.herokuapp.com/createPayment', params)
});
