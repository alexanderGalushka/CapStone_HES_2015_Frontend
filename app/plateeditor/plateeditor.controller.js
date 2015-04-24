'use strict';

(function() {


  angular.module('plateeditor', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap'])

    .controller('PlateeditorCtrl',PlateeditorCtrl)


  PlateeditorCtrl.$inject = ["$scope", "activeProject", "resetSelection", "filterColorFilter", "filterBorder3Filter",  "filterHoverFilter", "filterControlFilter"];

  function PlateeditorCtrl($scope, activeProject, resetSelection, filterColor, filterBorder3, filterHover, filterControl) {
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

    $scope.ActiveProject = activeProject.activeId;
    pleditVm.filterPlateEditor.plotLabelName = "";
    pleditVm.filterPlateEditor.labelValueColors = {};
    pleditVm.filterPlateEditor.wellgroup = [];
    pleditVm.filterPlateEditor.labels = {};



    pleditVm.rows = [];
    pleditVm.rowsDisplay = [].concat(pleditVm.rows);


    pleditVm.labels = [];
    pleditVm.labelsDisplay = [].concat(pleditVm.labels);
    pleditVm.filterPlateEditor.labels = pleditVm.labels;


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
