
Abilities = new Meteor.Collection('abilities');
Pages     = new Meteor.Collection('pages');

Meteor.methods({
  grant: function (userId, pageId, abilityName) {
    if (! this.userId)
      throw new Meteor.Error(403, "You must be logged in to grant abilities");

    var selfAbility = Abilities.findOne({ userId: this.userId, pageId: pageId });

    if (!selfAbility || !selfAbility.grant)
      throw new Meteor.Error(403, "You don't have ability to grant");

    var ability = Abilities.findOne({ userId: userId, pageId: pageId });
    var inversed = !ability[abilityName];

    console.log('updating ' + abilityName + ' on ' + userId + ':' + pageId);

    var set = {};
    set[abilityName] = inversed;

    Abilities.update(ability._id, { $set: set });
  }
});

