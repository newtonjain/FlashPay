angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'TIAN YUAN ZHAO',
    date: '18/07/2015',
    time: '13:00 EST',
    amount: '$27.45',
    face: 'img/Icon---Mastercard.png'
  }, {
    id: 1,
    name: 'NEWTON JAIN ',
    date: '18/07/2015',
    time: '13:00 EST',
    amount: '$27.45',
    face: 'img/Icon---VISA.png'
  }, {
    id: 2,
    name: 'DANIEL MIRMILSHTEYN',
    date: '18/07/2015',
    time: '13:00 EST',
    amount: '$27.45',
    face: 'img/Icon---Interac.png'
  }, {
    id: 3,
    name: 'SHIVA KAUSHAL',
    date: '18/07/2015',
    time: '13:00 EST',
    amount: '$27.45',
    face: 'img/Icon---AMEX.png'
  }, ];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
