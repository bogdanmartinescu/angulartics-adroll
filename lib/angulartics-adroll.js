(function(window, angular, __adroll, undefined) {
    'use strict';
    /**
     * @ngdoc overview
     * @name angulartics.adroll
     */
    angular.module('angulartics.adroll', ['angulartics'])
        .config(['$analyticsProvider', function($analyticsProvider) {

            angulartics.waitForVendorApi('__adroll', 500, function(__adroll) {
                $analyticsProvider.registerPageTrack(function(path, segment) {
                    adroll_segments = segment;
                });
            });

            $analyticsProvider.registerEventTrack(function(action, properties) {
                if (!__adroll) return;
                try {
                    __adroll.record_user({ "adroll_segments": properties.segments })
                } catch (err) {
                    console.log(err);
                }
            });

        }]);
})(window, window.angular, window.__adroll);
