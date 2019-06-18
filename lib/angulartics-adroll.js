;(function(window, angular, undefined) {
    'use strict';
    /**
     * @ngdoc overview
     * @name angulartics.adroll
     */
    angular.module('angulartics.adroll', ['angulartics'])
        .config(['$analyticsProvider', function($analyticsProvider) {
            angulartics.waitForVendorApi('__adroll', 500, function(__adroll) {
                var adroll_segments = null;
                $analyticsProvider.registerPageTrack(function(path, segment) {
                    adroll_segments = segment;
                });
            });

            $analyticsProvider.registerEventTrack(function(action, properties) {
                if (!window.__adroll) return;
                try {
                    window.setTimeout(function() {
                      window.__adroll.record_user({ "adroll_segments": properties.segments })
                    }, 500);
                } catch (err) {
                    console.log(err);
                }
            });
        }]);
})(window, window.angular);
