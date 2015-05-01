'use strict';

(function() {


  angular.module('qc', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap','ngSlider'])

    .controller('QcCtrl',QcCtrl)


  QcCtrl.$inject = ["$scope", "activeProject", "activePlate", "activePlateResult", "rangeFilter"];

  function QcCtrl($scope, activeProject, activePlate, activePlateResult, range) {
    var qcVm = this;

    $scope.ActiveProject = activeProject.project;
    $scope.ActivePlate = activePlate;
    $scope.ActivePlateResult = activePlateResult;

    qcVm.boxsz = "35";
    qcVm.wellcollors = {bckgColorH:"0",colorText:"#FFFF00"};


  }

})();
