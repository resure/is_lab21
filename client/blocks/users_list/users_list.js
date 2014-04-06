
Template.usersList.users = function () {
  return Meteor.users.find().fetch();
};

