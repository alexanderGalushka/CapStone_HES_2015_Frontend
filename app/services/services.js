'use strict';

/* Services */

angular.module('adamServices', ['ngResource'])

  .factory('deleteProject', function() {
    return function (coll,item) {
      var index = coll.indexOf(item);
      coll.splice(index, 1);
    }
  })

  .service('activeProject', function() {
    var activeProject = this;
    activeProject.project = "";
  })

  .service('activePlate', function() {
    var activePlate = this;
    activePlate.plate = "";
  })

  .service('activePlateResult', function() {
    var activePlateResult = this;
    activePlateResult.name = "";
  })

;

