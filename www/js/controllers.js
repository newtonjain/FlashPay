angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $http) {
    $scope.creditCard = {};

    var goodNCard = {
        number: '4111111111111111',
        expirationDate: '08/16',
        amount: '99'
    }
    //document.addEventListener('deviceready', this.onDeviceReady, false);
    $scope.tapping = function () {

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

    var assignCard = function (tag) {
        if ($scope.tag.id[0] == -49 && $scope.tag.id[1] == 76 && $scope.tag.id[2] == 98 && $scope.tag.id[3] == 5) {
            alert('sup');
            $scope.creditCard = goodNCard;
        }
        if ($scope.tag.techTypes.length > 3) {
            $scope.creditCard.type = 'Visa';
        }
        if ($scope.tag.techTypes.length == 3) {
            $scope.creditCard.type = 'MasterCard';
        }
        if ($scope.tag.techTypes.length == 2) {
            $scope.creditCard.type = 'Interac';
        }

        $http.post('https://flashpay.herokuapp.com/createPayment', $scope.creditCard)
        .success(function (data, status, headers, config) {
            alert('recieved' + data);
        }).error(function (data, status, headers, config) {
            alert('There was a problem retrieving your information' + data);
        });
    };

    $scope.justcheck = function () {
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
