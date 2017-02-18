cordova.define("cordova-plugin-facebook-account-kit.FacebookAccountKitLogin", function(require, exports, module) {
var exec = require('cordova/exec')
exports.mobileLogin = function mobileLogin (s, f) {
    exec(s, f, 'FacebookAccountKitLogin', 'mobileLogin', [])
}

exports.emailLogin = function mobileLogin (s, f) {
    exec(s, f, 'FacebookAccountKitLogin', 'emailLogin', [])
}

});
