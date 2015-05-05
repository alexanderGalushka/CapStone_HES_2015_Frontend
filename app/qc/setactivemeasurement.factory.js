'use strict';

(function() {

  angular.module('setactivemeasurement', [])

    .factory('setActiveMeasurement', setActiveMeasurement);

  setActiveMeasurement.$inject = ["activePlateResult"];
  function setActiveMeasurement(activePlateResult) {
    return function (type, sliderIndex, plateres) {
    }
  }



})();
