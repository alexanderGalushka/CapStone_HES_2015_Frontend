'use strict';

(function() {
    angular.module('wellstable', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap'])

        .directive('adamhesWellstable', function() {
            return {
                restrict: 'E',
                scope: {
                    rowsonedimw:'=',
                    rowsonedimdisplayw:'=',
                    labelsdisplayw:"=",
                    dropwellgroup:"="
                },
                templateUrl: 'plateeditor/wellstable/wells.table.html',
                controller:WellsTableCtrl,
                controllerAs: 'wellstabVm'
            };
        });

    WellsTableCtrl.$inject = ['resetSelection'];
    function WellsTableCtrl(resetSelection){

        var wellstabVm = this;

        wellstabVm.test1 = "test1";
        wellstabVm.test2 = {name:"test2"};

        wellstabVm.resetSelection = resetSelection;
        wellstabVm.toogleRowSelection = toogleRowSelection;
        wellstabVm.updateWellUniqLabelValues = updateWellUniqLabelValues;

        function toogleRowSelection(well, labels, rowsOneD, dropwellgroup){
            //$scope.filterPlateEditor.wellgroup = well;
            //$scope.addWellToSelection(well, $scope.filterPlateEditor.wellgroup);
            //$scope.filterPlateEditor.labels = labels;
            dropwellgroup.checked = "true";

            //$scope.toogleRowSelection??(well, labels, rowsOneD);
            var wellSelected;

            for (var i = 0; i < rowsOneD.length; i++) {
                wellSelected = "true";
                for (var j = 0; j < labels.length && wellSelected; j++) {
                    //if (rowsOneD[i][labels[j].name] != null && well[labels[j].name] != rowsOneD[i][labels[j].name]) {
                    if (well[labels[j].name] != rowsOneD[i][labels[j].name]) {
                        wellSelected = false;
                    }
                    //console.log("label " + cond.labels[i].name);
                }
                if(well.controltype != rowsOneD[i].controltype)
                    wellSelected = false;

                if(wellSelected) {
                    if (well.isSelected) {
                        rowsOneD[i].condSelected = true;
                    } else
                        rowsOneD[i].condSelected = false;
                }
            }
        }

        function updateWellUniqLabelValues(well, newColor){
            $scope.uniqueLabelValuesColors[well[$scope.filterPlateEditor.plotLabelName]] = newColor;
            //console.log(JSON.stringify($scope.uniqueLabelValues, null, 4));
            for (var i = 0; i < $scope.uniqueLabelValues.length; i++) {
                if($scope.uniqueLabelValues[i].name === well[$scope.filterPlateEditor.plotLabelName]){
                    $scope.uniqueLabelValues[i].color = newColor;
                }
            }
        }

    }
})();