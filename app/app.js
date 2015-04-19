'use strict';

/**
 * @ngdoc overview
 * @name adamApp
 * @description
 * # adamApp
 *
 * Main module of the application.
 */
(function() {
  angular
    .module('adamApp', [
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'smart-table',
      'mgcrea.ngStrap',
      'ngSlider',
      // application modules
      'project',
      'adamServices',
      'navbarAdam',
      'project.data.model'
    ])

    .config(configAdam);

  configAdam.$inject =['$routeProvider','$resourceProvider'];
  function configAdam($routeProvider,$resourceProvider){
    //$resourceProvider.defaults.useXDomain = true;  not supported?

    $routeProvider.
          when('/projects', {
            templateUrl: 'project/project.html',
            controller: 'ProjectsCtrl',
            controllerAs: 'projVm'
          }).
          when('/plates', {
            templateUrl: 'plate/plate.html',
            controller: 'PlatesCtrl'
          }).
          when('/plateeditor', {
            templateUrl: 'plateeditor/plateeditor.html',
            controller: 'PlateeditorCtrl'
          }).
          when('/plateresults', {
            templateUrl: 'plateresult/plateresult.html',
            controller: 'PlateResultsCtrl'
          }).
          when('/qc', {
            templateUrl: 'qc/qc.html',
            controller: 'QcCtrl'
          }).
          otherwise({
            redirectTo: '/projects'
          });
  }

})();
