
Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('home', { path: '/' });
  this.route('users', { path: '/users' });
  this.route('pages', { path: '/pages' });
});

