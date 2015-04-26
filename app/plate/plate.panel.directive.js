'use strict';

(function() {
  angular.module('platepanel', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap'])

    .directive('admahesPlatepanel', function() {
      return {
        restrict: 'E',
        scope: {
          asideind: '='
        },
        controller:"PlatesPanelCtrl",
        controllerAs: 'platepanVm',
        templateUrl: 'plate/plate.panel.html'
      };
    })

    .controller('PlatesPanelCtrl', PlatesPanelCtrl);

  PlatesPanelCtrl.$inject = ["$scope", "activeProject", "activePlate", "activePlateResult", "Plate"];
  function PlatesPanelCtrl($scope, activeProject, activePlate, activePlateResult, Plate){

    var platepanVm = this;

    $scope.ActiveProject = activeProject;
    $scope.ActivePlate = activePlate;
    $scope.activePlateResult = activePlateResult;

    platepanVm.setActivePlate = setActivePlate;


    platepanVm.plates = Plate.query();
    platepanVm.platesDisplay = [].concat(platepanVm.plates);

    function setActivePlate (plate){
      activePlate.plate  = plate;
      activePlate.plate.wellsDisplay = [].concat(activePlate.plate.wells);
      $scope.activePlateResult.plateresult  = "";
    }

  }
})();
