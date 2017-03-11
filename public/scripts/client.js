/*jshint esversion: 6 */
const app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(function ($routeProvider, $mdThemingProvider) {

    // $mdThemingProvider.theme('default')
    //   .primaryPalette('red')
    //   .accentPalette('blue')
    //   .warnPalette('yellow')
    //   .dark();

    $routeProvider
      .when('/home', {
        templateUrl: 'views/templates/home.html',
        controller: 'HomeController',
        controllerAs: 'home'
      })
      .when('/nav', {
        templateUrl: 'views/templates/nav.html',
        controller: 'NavController',
        controllerAs: 'nav'
      })
      .when('/builder/:selectedCohort', {
        templateUrl: 'views/templates/builder.html',
        controller: 'BuilderController',
        controllerAs: 'builder'
      })
      .when('/teams', {
        templateUrl: 'views/templates/teams.html',
        controller: 'TeamController',
        controllerAs: 'teams'
      })
      .when('/manager', {
        templateUrl: 'views/templates/manager.html',
        controller: 'ManagerController',
        controllerAs: 'manager'
      })
      .when('/cohorts', {
        templateUrl: '/views/templates/cohorts.html',
        controller: 'CohortController',
        controllerAs: 'cohorts'
      })
      .otherwise({
        redirectTo: 'home'
      });
  });
