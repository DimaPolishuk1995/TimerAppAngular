'use strict';
trackProcess
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider',
        function ($locationProvider, $stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('homepage', {
                    url: '/',
                    templateUrl: 'views/homepage.html',
                    controller: 'HomepageCtrl'
                })
        }]);