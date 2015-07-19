angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $http, $ionicActionSheet, $ionicModal) {
    $scope.creditCard = {};
    $scope.amount = null;
    $scope.txid = null;

  var vcard  = {
    firstName: 'Newton',
    lastName: 'Jain',
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
    number: '4519023121272361',
    expirationDate: '08/16',
    amount: '0'
  }

   $ionicModal.fromTemplateUrl('templates/transactionComplete.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  function triggerEvent (nfcEvent) {
      $scope.tag = nfcEvent.tag;
      $scope.hideSheet();
      assignCard($scope.tag);

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
      $http.post('https://flashpay.herokuapp.com/createPayment', $scope.txid)
        .success(function (data) {
            alert("Data: " + data);
        })
        .error(function (data) {
            alert("Error: " + data);
        });
  };

  var assignCard = function(tag) {
     if($scope.tag.id[0] == -49 && $scope.tag.id[1] == 76 && $scope.tag.id[2] == 98 && $scope.tag.id[3] == 5) {
        $scope.creditCard = vcard;
    }
    if($scope.tag.id[0] == 111 && $scope.tag.id[1] == 122 && $scope.tag.id[2] == 84 && $scope.tag.id[3] == 11) {
        $scope.creditCard = acard;
    }
    if($scope.tag.id[0] == 15 && $scope.tag.id[1] == -107 && $scope.tag.id[2] == -70 && $scope.tag.id[3] == -7) {
        $scope.creditCard = mcard;
    }
     $scope.creditCard.amount = $scope.amount;
     alert(JSON.stringify($scope.creditCard));



    nfc.removeTagDiscoveredListener(triggerEvent, function (){
    }, function (error){});

       $http.post('https://flashpay.herokuapp.com/createPayment', $scope.creditCard)
    .success(function (data, status, headers, config) {
      $scope.modal.show();
        alert('recieved' + data);
    }).error(function (data, status, headers, config) {
        alert('There was a problem retrieving your information' + data+ status);
    });

  };

  $scope.closeLogin = function() {
    $scope.modal.hide();
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

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };

    //  http.$get('flashpay.herokuapp.com/createPayment', params)
});
