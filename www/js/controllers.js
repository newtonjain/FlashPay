angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $http) {
    $scope.creditCard = {};
    $scope.amount = null;

  var vcard  = {
    name: 'Newton Jain',
    number: '4005519200000004',
    expiry: '08/16',
    ccv: '123',
    type: 'Visa'
  },
  acard= {
    name: 'Tian Yuan Zhao',
    number: '371449635398431',
    expiry: '04/16',
    ccv: '222',
    type: 'American Express'
  },
  mcard = {
    name: 'Deniel Scott',
    number: '4519023121272361',
    expiry: '06/15',
    ccv: '989',
    type: 'MasterCard'
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

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
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
