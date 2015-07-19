angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $http) {
    $scope.creditCard = {};
    $scope.amount = null;

  var vcard  = {
    firstName: 'Newton',
    lastName: 'Jain',
    number: '4005519200000004',
    expirationDate: '08/16',
    amount: '99'
  },
  acard= {
    firstName: 'Tian',
    lastName: 'Yuan',
    number: '371449635398431',
    expirationDate: '08/16',
    amount: '99'
  },
  mcard = {
    firstName: 'Daniel',
    lastName: 'Scott',
    number: '4519023121272361',
    expirationDate: '08/16',
    amount: '99'
  }

    //document.addEventListener('deviceready', this.onDeviceReady, false);
  $scope.tapping = function(){

    nfc.addTagDiscoveredListener(
      function (nfcEvent) {
        $scope.tag = nfcEvent.tag;
        alert(JSON.stringify($scope.tag.id));
        assignCard($scope.tag);
      },
      function () {
        alert("Tap your card please.");
      },
      function (reason) {
        console.log("Error: " + reason);
      }
    );
  };

  var assignCard = function(tag) {
     if($scope.tag.id[0] == -49 && $scope.tag.id[1] == 76 && $scope.tag.id[2] == 98 && $scope.tag.id[3] == 5) {
        alert('sup1');
        $scope.creditCard = vcard;
    }
    if($scope.tag.id[0] == 111 && $scope.tag.id[1] == 122 && $scope.tag.id[2] == 84 && $scope.tag.id[3] == 11) {
        alert('sup2');
        $scope.creditCard = acard;
    }
    if($scope.tag.id[0] == 15 && $scope.tag.id[1] == -107 && $scope.tag.id[2] == -70 && $scope.tag.id[3] == -7) {
        alert('sup2');
        $scope.creditCard = mcard;
    }

       $http.post('https://flashpay.herokuapp.com/createPayment', $scope.creditCard)
    .success(function (data, status, headers, config) {
        alert('recieved' + data);
    }).error(function (data, status, headers, config) {
        alert('There was a problem retrieving your information' + data);
    });

  };

  $scope.justcheck = function(){
 alert(JSON.stringify($scope.creditCard));
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
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    Chats.all(function (transactions) {
        $scope.chats = transactions;
    });
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };

    //  http.$get('flashpay.herokuapp.com/createPayment', params)
});
