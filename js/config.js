(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.OktaConfig = factory();
  }
}(this, function () {

    return {
      orgUrl: 'https://grdemo.okta.com',
      clientId: '8tK4sFKAfIJk6tZULlQP',
      idp: '0oa5kecjfwuF4HQ4w0h7',
      scope: ['openid', 'email', 'profile', 'phone', 'groups']
    };

}));
