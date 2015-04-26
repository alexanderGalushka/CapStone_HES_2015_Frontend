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
              if(well.controlType === ".")
                textColor = colorForWell;
              else
                textColor = "black";
              return "color:" + textColor + ";background-color:" + colorForWell;
            }
            else
            if(well.controlType === ".")
              return "color:#FF0000;background-color:#FF0000";
            else
              return "color:black;background-color:#FF0000";
          } else
          if(well.controlType === ".")
            return "color:#FFFFFF;background-color:#FFFFFF";
          else
            return "color:black;background-color:#FFFFFF";
        }else {
          return "color:#FFFFFF;background-color:#FFFFFF";
        }

      }
    })

    .filter("filterHover",  function() {
      return function(well, labels) {
        var returnVal = '';

        if(labels != null && well != null) {
          for (var i = 0; i < labels.length; i++) {
            if(well[labels[i].name] != null)
              returnVal += ' '  + well[labels[i].name];
            else
              returnVal += ' '  + 'n/a';
          }
          returnVal += ' ' + well["controlType"];
        }

        return returnVal



      }
    })

    .filter("filterControl",  function() {
      return function(well, cond) {
        var returnVal = '';


        returnVal = well.controlType.substr(0,1);

        return returnVal
      }
    })

    .filter('range', function() {
      return function (input, min, max) {
        min = parseInt(min);
        max = parseInt(max);
        for (var i = min; i <= max; i++)
          input.push(i);
        return input;
      }


    })

})();
