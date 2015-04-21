'use strict';

(function() {
  angular.module('plate', ['smart-table','mgcrea.ngStrap'])

    .controller('PlateCtrl', PlateCtrl);

  PlateCtrl.$inject = ["$scope","activeProject", "activePlate", "activePlateResult", "Plate", "$filter"];
  function PlateCtrl($scope, activeProject, activePlate, activePlateResult, Plate, $filter) {
    var plateVm = this;

    $scope.ActiveProject = activeProject;
    $scope.ActivePlate = activePlate;
    $scope.activePlateResult = activePlateResult;

    plateVm.aside = true;
    plateVm.setActivePlate = setActivePlate;
    plateVm.addNewPlate = addNewPlate;
    plateVm.editPlate = editPlate;
    plateVm.saveChangesPlate = saveChangesPlate;
    plateVm.addLabel = addLabel;
    plateVm.deletePlate = deletePlate;
    plateVm.clearActiveProject = clearActiveProject;


    plateVm.plates = Plate.query();
    plateVm.platesDisplay = [].concat(plateVm.plates);


    function setActivePlate(plate){
      $scope.ActivePlate.plate = plate;
      $scope.activePlateResult.plate  = "";
    }

    function addNewPlate(project){
      plateVm.plateAction = "new";
      plateVm.newplate = {
        "project":"",
        "name": "",
        "label": "L",
        "numberOfRows":"",
        "numberOfColumns":"",
        "barcode":"",
        "protocolid":"",
        //"date": $filter('date')(new Date(),'MM/dd/yyyy'),
        "wellLabels":[{name:"good"}, {name:"start"}]
      };
      plateVm.newplate.projectId = project.id;
    }

    function editPlate(plate) {
      plateVm.plateAction = "edit";
      plateVm.newplate = JSON.parse(JSON.stringify(plate));;
    }

    function saveChangesPlate(act,plate) {
      if (act == "new") {
        var savedplate = Plate.save(plateVm.newplate);
        plateVm.plates = plateVm.plates.concat(savedplate);
      }
      else {
        Plate.update({"id":plateVm.newplate.id},plateVm.newplate);
        plate.project = plateVm.newplate.project;
        plate.name = plateVm.newplate.name;
        plate.label = plateVm.newplate.label;
        plate.numberOfRows = plateVm.newplate.numberOfRows;
        plate.numberOfColumns = plateVm.newplate.numberOfColumns;
        plate.barcode = plateVm.newplate.barcode;
        plate.protocolid = plateVm.newplate.protocolid;
        plate.wellLabels = plateVm.newplate.wellLabels;

      }
    }

    function addLabel(labels,newLabel){
      labels.push({name:newLabel});
    }

    function deletePlate(plate){
      Plate.delete({"id":plate.id});
      var index = plateVm.plates.indexOf(plate);
      plateVm.plates.splice(index, 1);
    }

    function clearActiveProject(){
      $scope.ActiveProject.project  = "";
      $scope.ActivePlate.plate = "";
      $scope.activePlateResult.plate  = "";
    }
  }
})();
