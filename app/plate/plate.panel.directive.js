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

  PlatesPanelCtrl.$inject = ["$scope", "activeProject", "activePlate", "activePlateResult", "Plate", "Qc"];
  function PlatesPanelCtrl($scope, activeProject, activePlate, activePlateResult, Plate, Qc){

    var platepanVm = this;

    $scope.ActiveProject = activeProject;
    $scope.ActivePlate = activePlate;
    $scope.activePlateResult = activePlateResult;

    platepanVm.setActivePlate = setActivePlate;


    platepanVm.plates = Plate.query();
    platepanVm.platesDisplay = [].concat(platepanVm.plates);

    function setActivePlate (plate){
      var plateres;
      activePlate.plate  = plate;
      activePlate.plate.wellsDisplay = [].concat(activePlate.plate.wells);

      if(plate !== null) {
        plateres = Qc.get({"id": plate.id},function(){
          activePlateResult.plateResult = plateres;
          activePlateResult.plateResult.options = {
            from: 1,
            to: 5,
            floor: true,
            step: 1,
            dimension: "",
            vertical: false,
            scale: [],
            callback: function(value, elt) {
              //console.log(value);
            }
          };
          activePlateResult.plateResult.options.to = plateres.timeStamps.length;
          for (var i = 0; i < plateres.timeStamps.length; i++) {
            activePlateResult.plateResult.options.scale.push(plateres.timeStamps[i].value);
          }
          activePlateResult.plateResult.valueslider = plateres.timeStamps[0].value;

          activePlateResult.activeMeasurement = plateres.measurements

        });
      }
    }

  }
})();
