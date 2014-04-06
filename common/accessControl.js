
AccessControl = function (user, page) {
  this.ability = Abilities.findOne({
    userId: user.id,
    pageId: page.id
  });

  this.admin = user.profile.admin;
};

AccessControl.prototype = {
  'canRead': function () {
    return this.ability.read || this.ability.write || this.ability.grant || this.admin;
  },

  'canWrite': function () {
    return this.ability.write || this.ability.grant || this.admin;
  },

  'canGrant': function () {
    return this.ability.grant || this.admin;
  }
};

