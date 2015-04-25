'use strict';

(function() {


  angular.module('plateeditor', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap'])

    .controller('PlateeditorCtrl',PlateeditorCtrl)


  PlateeditorCtrl.$inject = ["$scope", "activeProject", "activePlate", "resetSelection", "filterColorFilter", "filterBorder3Filter",  "filterHoverFilter", "filterControlFilter", "rangeFilter"];

  function PlateeditorCtrl($scope, activeProject, activePlate, resetSelection, filterColor, filterBorder3, filterHover, filterControl, range) {
    var pleditVm = this;


    pleditVm.leftTable = leftTable;
    pleditVm.mouseDownWell = mouseDownWell;
    pleditVm.mouseUpWell = mouseUpWell;
    pleditVm.mouseOverWell = mouseOverWell;

    //pleditVm.boxszs = ["10","20","30","40","50"];
    pleditVm.boxsz = "30";
    pleditVm.tooltipdel = "500";
    pleditVm.dropWellGroup = {checked:"true"}; // "" for false
    pleditVm.filterPlateEditor = {};
    pleditVm.uniqueLabelValues = [];
    pleditVm.uniqueLabelValuesColors = [];
    pleditVm.selectedLabel = {};
    pleditVm.selectedUniqValue = {};
    pleditVm.selectedLabelColor = {"color":"#FFFFFF"};
    pleditVm.itemsByPage=10;
    pleditVm.aside = false;
    pleditVm.multiselectWell = {"firstwell_row":"","firstwell_column":"","secondwell_row":"","secondwell_column":"","mode":false};

    $scope.ActiveProject = activeProject.project;
    $scope.ActivePlate = activePlate.plate;
    pleditVm.filterPlateEditor.plotLabelName = "";
    pleditVm.filterPlateEditor.labelValueColors = {};
    pleditVm.filterPlateEditor.wellgroup = [];
    pleditVm.filterPlateEditor.labels = {};



    //pleditVm.rows = [];
    if(activePlate.plate != null) {
      pleditVm.rows= activePlate.plate.wells;
      pleditVm.rowsDisplay = [].concat(pleditVm.rows);

      pleditVm.numberOfRows = activePlate.plate.numberOfRows;
      pleditVm.numberOfColumns = activePlate.plate.numberOfColumns;

      pleditVm.labels = activePlate.plate.wellLabels;
      pleditVm.labelsDisplay = [].concat(pleditVm.labels);
      pleditVm.filterPlateEditor.labels = pleditVm.labels;
      console.log(JSON.stringify(pleditVm, null, 4));
    }

    function leftTable() {
      if(pleditVm.multiselectWell.mode) {
        pleditVm.multiselectWell.secondwell_row = "";
        pleditVm.multiselectWell.secondwell_column = "";
      }
      pleditVm.multiselectWell.mode = false;
    }

    function mouseDownWell(well,labels) {
      pleditVm.multiselectWell.mode = true;
      pleditVm.multiselectWell.firstwell_row = well.row;
      pleditVm.multiselectWell.firstwell_column = well.column;
    }

    function mouseUpWell(well,labels) {
      if(pleditVm.multiselectWell.mode) {
        pleditVm.multiselectWell.secondwell_row = "";
        pleditVm.multiselectWell.secondwell_column = "";
      }
      pleditVm.multiselectWell.mode = false;

    }

    function mouseOverWell(well,rows){
      if(pleditVm.multiselectWell.mode) {
        if (pleditVm.multiselectWell.secondwell_row === "")
          resetSelection(pleditVm.rowsOneDim, pleditVm.dropWellGroup);
        pleditVm.multiselectWell.secondwell_row = well.row;
        pleditVm.multiselectWell.secondwell_column = well.column;

        var bigrow, smallrow, bigcolumn, smallcolumn;
        //var wellSelected;

        if(pleditVm.multiselectWell.firstwell_row >= pleditVm.multiselectWell.secondwell_row){
          bigrow = pleditVm.multiselectWell.firstwell_row;
          smallrow = pleditVm.multiselectWell.secondwell_row;
        }else{
          bigrow = pleditVm.multiselectWell.secondwell_row;
          smallrow = pleditVm.multiselectWell.firstwell_row;
        }
        if(pleditVm.multiselectWell.firstwell_column >= pleditVm.multiselectWell.secondwell_column){
          bigcolumn = pleditVm.multiselectWell.firstwell_column;
          smallcolumn = pleditVm.multiselectWell.secondwell_column;
        }else{
          bigcolumn = pleditVm.multiselectWell.secondwell_column;
          smallcolumn = pleditVm.multiselectWell.firstwell_column;
        }

        for (var i = 0; i < rows.length; i++) {
          rows[i].condSelected = false;
          if (((rows[i].row >=  smallrow )&&(rows[i].row <=  bigrow )) &&
            ((rows[i].column >=  smallcolumn)&&(rows[i].column <=  bigcolumn)))
          {
            rows[i].condSelected = true;
          }

        }

      }
    }

  }

})();
