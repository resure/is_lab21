
Meteor.publish("usersData", function () {
  if (this.userId) {
    return Meteor.users.find({});
  } else {
    this.ready();
  }
});

Meteor.publish("pagesData", function () {
  var user = Meteor.users.findOne({ _id: this.userId });
  
  if (user && user.profile.admin) {
    return Pages.find({});
  } else {

    if (this.userId) {
      var abilities = Abilities.find({
        userId: this.userId,
        $or: [
          { read:  true },
          { write: true },
          { grant: true }
        ]
      }).fetch();

      var pageIds = _.map(abilities, function (ability) {
        return ability.pageId;
      });

      return Pages.find({ _id: { $in: pageIds } });

    } else {
      return this.ready();
    }
  }
});

Meteor.publish('abilitiesData', function () {
  // :)
  return Abilities.find({});
});

