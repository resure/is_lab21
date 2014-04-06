
Template.login.helpers({
  'isAdmin': function () {
    return Meteor.user() && Meteor.user().profile.admin;
  }
});

