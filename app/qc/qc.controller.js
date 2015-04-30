'use strict';

(function() {


  angular.module('qc', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap','ngSlider'])

    .controller('QcCtrl',QcCtrl)


  QcCtrl.$inject = ["$scope", "activeProject", "activePlate"];

  function QcCtrl($scope, activeProject, activePlate) {
    var qcVm = this;

    $scope.ActiveProject = activeProject.project;
    $scope.ActivePlate = activePlate;

  }

})();
