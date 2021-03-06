angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $http, $ionicActionSheet, $ionicModal) {
    $scope.creditCard = {};
    $scope.amount = null;
    $scope.txid = null;

  var vcard  = {
    firstName: 'Shiva',
    lastName: 'Kaushal',
    number: '4005519200000004',
    expirationDate: '08/16',
    amount: '0'
  },
  acard= {
    firstName: 'Tian',
    lastName: 'Yuan',
    number: '371449635398431',
    expirationDate: '08/16',
    amount: '0'
  },
  mcard = {
    firstName: 'Daniel',
    lastName: 'Scott',
    number: '5555555555554444',
    expirationDate: '08/16',
    amount: '0'
  }

   $ionicModal.fromTemplateUrl('templates/transactionComplete.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modallogin) {
      $scope.modallogin = modallogin;
      $scope.modallogin.show();
  });

   $ionicModal.fromTemplateUrl('templates/transactionDetails.html', { scope: $scope })
        .then(function (txDetails) {
            $scope.txDetails = txDetails;
        });

  function triggerEvent (nfcEvent) {
      $scope.tag = nfcEvent.tag;
      $scope.hideSheet();
      assignCard($scope.tag);
      //alert(JSON.stringify($scope.tag));

  }
    //document.addEventListener('deviceready', this.onDeviceReady, false);
  $scope.tapping = function(amount){
    //alert('amount'  + amount);

    $scope.amount = amount;
    nfc.addTagDiscoveredListener(triggerEvent,
      function () {
      $scope.hideSheet = $ionicActionSheet.show({
          buttons: [
       { text: '<center><b>You are going to pay $' + $scope.amount}
     ],
           titleText: '<center>Tap your card please.</center>'
        });
      },
      function (reason) {
        console.log("Error: " + reason);
      }
    );
  };

  $scope.verifyTxId = function (txid) {
      $scope.txid = txid;
      $http.get('https://flashpay.herokuapp.com/getinfo/' + $scope.txid)
        .success(function (data) {
            $scope.currentTx = data[0];
            $scope.txDetails.show();
        })
        .error(function (data) {
            alert("Error: " + data);
        });
  };

  var assignCard = function(tag) {
     if($scope.tag.id[0] == 33 && $scope.tag.id[1] == 34 && $scope.tag.id[2] == 35 && $scope.tag.id[3] == 36) {
        $scope.creditCard = vcard;
    }
    if($scope.tag.id[0] == 111 && $scope.tag.id[1] == 122 && $scope.tag.id[2] == 84 && $scope.tag.id[3] == 11) {
        $scope.creditCard = acard;
    }
    if($scope.tag.id[0] == 15 && $scope.tag.id[1] == -107 && $scope.tag.id[2] == -70 && $scope.tag.id[3] == -7) {
        $scope.creditCard = mcard;
    }
     $scope.creditCard.amount = $scope.amount;

    nfc.removeTagDiscoveredListener(triggerEvent, function (){
    }, function (error){});

       $http.post('https://flashpay.herokuapp.com/createPayment', $scope.creditCard)
    .success(function (data, status, headers, config) {
      $scope.modal.show();
    }).error(function (data, status, headers, config) {
        alert('There was a problem retrieving your information' + data+ status);
    });

  };

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.doLogin = function (username, password) {
      if (username.toLowerCase() === "newton" && password.toLowerCase() === "1234") {
          $scope.modallogin.hide();
      } else {
          alert("Invalid password entered");
      }
  };

  $scope.closeTxDetails = function () {
      $scope.txDetails.hide();
  };

  $scope.justcheck = function(){    
    }
})

.controller('DashCtrl', function ($scope) {



})

.controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    $scope.$on('$ionicView.enter', function (e) {
        Chats.all(function (transactions) {
            $scope.chats = transactions;
        });
    });
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    Chats.all(function (transactions) {
        $scope.chats = transactions;
    });
})

.controller('AccountCtrl', function ($scope, Chats) {
    $scope.settings = {
        enableFriends: true
    };

    Chats.all(function (transactions) {
        $scope.chats = transactions;
    });

    //  http.$get('flashpay.herokuapp.com/createPayment', params)
})

.controller('TickerCtrl', function ($scope) {

    $scope.cookie = "yummy";

    $scope.ticker_msgs = [];

    // Enable pusher logging - don't include this in production
    Pusher.log = function (message) {
        if (window.console && window.console.log) {
            window.console.log(message);
        }
    };

    var pusher = new Pusher('991b4111cb90d8ba79f6', {
        encrypted: true
    });
    var channel = pusher.subscribe('test_channel');
    channel.bind('my_event', function (data) {
        $scope.ticker_msgs.push(data);
        $scope.$apply();
    });
    //  http.$get('flashpay.herokuapp.com/createPayment', params)
});
