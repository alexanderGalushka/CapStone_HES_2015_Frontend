'use strict';

(function() {

  angular.module('wellattrfilter', [])

  .filter("filterBorder3",  function() {
    return function(well, cond) {
      var wellSelected = false;


       if(well.condSelected){
        return "border:2px dashed red;";
      }else{
        return "border:2px solid black;";
      }

    }
  })

    .filter("filterColor",  function() {
      return function(well, cond) {
        var textColor;

        if(cond != null && well != null) {
          var wellLabelValue = well[cond.plotLabelName];
          if (wellLabelValue != null && wellLabelValue != '') {
            var colorForWell = cond.labelValueColors[wellLabelValue];
            if (colorForWell != null) {
              well.color = colorForWell;
              if(well.controltype === ".")
                textColor = colorForWell;
              else
                textColor = "black";
              return "color:" + textColor + ";background-color:" + colorForWell;
            }
            else
            if(well.controltype === ".")
              return "color:#FF0000;background-color:#FF0000";
            else
              return "color:black;background-color:#FF0000";
          } else
          if(well.controltype === ".")
            return "color:#FFFFFF;background-color:#FFFFFF";
          else
            return "color:black;background-color:#FFFFFF";
        }else {
          return "color:#FFFFFF;background-color:#FFFFFF";
        }

      }
    })

    .filter("filterHover",  function() {
      return function(well, cond) {
        var returnVal = '';

        if(cond.labels != null && well != null) {
          for (var i = 0; i < cond.labels.length; i++) {
            if(well[cond.labels[i].name] != null)
              returnVal += ' '  + well[cond.labels[i].name];
            else
              returnVal += ' '  + 'n/a';
          }
          returnVal += ' ' + well["controltype"];
        }

        return returnVal



      }
    })

    .filter("filterControl",  function() {
      return function(well, cond) {
        var returnVal = '';


        returnVal = well.controltype.substr(0,1);

        return returnVal
      }
    })

})();
