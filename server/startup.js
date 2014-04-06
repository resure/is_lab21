Meteor.startup(function () {

  Meteor.users.remove({});
  Abilities.remove({});
  Pages.remove({});

  var users = [
    ['xboct', 'Aleksandr Dashkevich'],
    ['sharfik', 'Artem Marzavin'],
    ['solo', 'Alexey Berezin'],
    ['dread', 'Andrey Golubev'],
    ['goblak', 'Artur Kostenko']
  ];

  var titles = [
    'Simplified Data Processing on Large Clusters',
    'The Google File System',
    'Fundamental Concepts in Programming Languages',
    'Distributed Storage System for Structured Data',
    'Ordering of Events in Distributed System',
    'Looking inside the (Drop) box',
    'Recursive Functions of Symbolic Expressions',
    'Is Parallel Programming Hard',
    'Debian Handbook',
    'Scala by Example'
  ];

  var userIds = [];

  var randBool = function () { return Math.random() >= 0.5 };
  var FILES_COUNT = 10;

  _.each(users, function (user) {
    userIds.push(Accounts.createUser({
      username: user[0],
      password: 'gaben',
      profile: {
        name: user[1],
        admin: (user[0] == 'goblak')
      }
    }));
  });

  for (var i = 0; i < FILES_COUNT; i++) {
    var filename = 'file_number_' + i;

    var pageId = Pages.insert({
      name: titles[i],
      content: 'Lorem ipsum number ' + i + '.'
    });

    _.each(userIds, function (userId) {
      Abilities.insert({
        pageId: pageId,
        userId: userId,
        read:   randBool(),
        write:  randBool(),
        grant:  randBool()
      });
    });
  }

});

