'use strict';

(function() {
    angular.module('singlewell', ['ngAnimate','ngSanitize', 'smart-table','mgcrea.ngStrap'])

        .directive('adamhesSinglewell', function() {
            return {
                restrict: 'E',
                scope: {
                    well: '=',
                    boxsize:"@",
                    tooltipdelay:"@",
                    filterarg:"=",
                    dropgroup:"=",
                    "labels":"=",
                    "rows":"="
                },
                templateUrl: 'singlewell.html',
                controller: SingleWellCtrl,
                controllerAs: 'singlewellVm'

            };
        });

    //SingleWellCtrl.$inject = [''];
    function SingleWellCtrl() {
        var singlewellVm = this;

        singlewellVm.updateWell = updateWell;


        function updateWell(well, cond, rows) {
                if(cond.plotLabelName != null && well != null && cond.copyLabel != null) {
                    well.color = cond.copyLabel.color;
                    well[cond.plotLabelName] = cond.copyLabel.name;
                    if(well.condSelected){
                        for (var i = 0; i < rows.length; i++) {
                            if(rows[i].condSelected) {
                                rows[i].color = cond.copyLabel.color;
                                rows[i][cond.plotLabelName] = cond.copyLabel.name;
                            }
                        }
                    }
                }
            }


        function mouseDownWell(well,labels) {
            //$scope.resetSelection();
            $scope.multiselectWell.mode = true;
            $scope.multiselectWell.firstwell_row = well.row;
            $scope.multiselectWell.firstwell_column = well.column;
            //console.log(JSON.stringify( $scope.multiselectWell, null, 4));
        }



    }

})();
