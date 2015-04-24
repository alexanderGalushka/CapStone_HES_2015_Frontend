'use strict';

(function() {

    angular.module('resetsel', [])

        .factory('resetSelection', function() {
            return function (rowsOneDim, dropwellstatus){
                //$scope.filterPlateEditor.wellgroup = [];
                for (var i = 0; i < rowsOneDim.length; i++) {
                    rowsOneDim[i].isSelected = false;
                    rowsOneDim[i].condSelected = false;
                }
                dropwellstatus.checked = "true";
            }

        });

})();
