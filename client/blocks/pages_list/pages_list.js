
Template.pagesList.pages = function () {
  return Pages.find({}).fetch();
};

Template.pagesList.helpers({
  getAbility: function (userId, pageId) {
    if (Meteor.user() && Meteor.user().profile.admin) {
      return { read: true, write: true, grant: true };
    } else {
      return Abilities.findOne({ userId: userId, pageId: pageId });
    }
  }
});

Template.pagesList.events({
  'click .ability.grant': function (event) {
    var username = prompt('Enter username', Meteor.user().username).toLowerCase();
    if (!username) return;

    var ability  = prompt('Enter ability to modify ("read", "write" or "grant")').toLowerCase();
    if (!ability) return;

    var pageId = event.target.parentElement.parentElement.dataset.pageId;
    var userId = Meteor.users.findOne({ username: username })._id;

    Meteor.call('grant', userId, pageId, ability);
  }
});

