'use strict';

(function() {
  angular.module('project', ['smart-table','mgcrea.ngStrap'])

    .controller('ProjectsCtrl', ProjectsCtrl);


  ProjectsCtrl.$inject = ["$scope","deleteProject", "activeProject", "activePlate", "Project","$http", "$filter"];
  function ProjectsCtrl($scope, deleteProject, activeProject, activePlate, Project,$http, $filter) {
    var projVm = this;

    $scope.ActiveProject = activeProject;
    $scope.ActivePlate = activePlate;

    projVm.filterowner = '';

    projVm.editProject = editProject;
    projVm.addNewProject = addNewProject;
    projVm.saveChangesProject = saveChangesProject;
    projVm.setActiveProject = setActiveProject;
    projVm.addTag = addTag;
    projVm.checkedOwner = checkedOwner;
    projVm.addCollaborator = addCollaborator;
    projVm.deletePr = deletePr;

    projVm.projects = Project.query();

    projVm.projects2 = [
      {
        "name": "Project b",
        "description": "Cancer research in 2015",
        "owner":"Cindy",
        "tags":[{name:"multi projectadam"},{name:"mouse"}],
        "collaborators":[{name:"Alex"},{name:"Ivan"},{name:"Gerson"}],
        "label":"mouse","creationDate": "2/2/2015"
      },
      {
        "name": "Project a",
        "description": "Amazing new medicine",
        "owner":"Nik",
        "tags":[],
        "collaborators":[{name:"Alex"},{name:"Ivan"},{name:"Cindy"}],
        "label":"human","creationDate": "2/12/3015"
      },
      {
        "name": "Aiv",
        "description": "Painkiller medicine phase 3",
        "owner":"Alex",
        "tags":[],
        "collaborators":[{name:"Alex"},{name:"Nik"},{name:"Cindy"}],
        "label":"mouse","creationDate": "3/2/2015"
      },
      {
        "name": "Zig medicine",
        "description": "Building new research",
        "owner":"Ivan",
        "tags":[],
        "collaborators":[{name:"Cindy"},{name:"Nik"},{name:"Gerson"}],
        "label":"human","creationDate": "2/12/2015"
      }
    ];
    projVm.projectsDisplay = [].concat(projVm.projects);

    projVm.collaborators = [
      {
        "name": "Alex"
      },
      {
        "name": "Cindy"
      },
      {
        "name": "Gerson"
      },
      {
        "name": "Nik"
      }
    ];

    function deletePr(coll1,indx1){
      deleteProject(coll1,indx1);
    };

    function addNewProject (){
      projVm.projectAction = "new";
      projVm.newproject = {
        "name": "",
        "description": "",
        "label": "",
        "owner":"Ivan",
        "creationDate": "" //,
        //"tags":[],
        //"collaborators":[]
      };
      projVm.newproject.creationDate = $filter('date')(new Date(),'MM/dd/yyyy');
    };

    function editProject(proj) {
      projVm.projectAction = "edit";
      projVm.newproject = JSON.parse(JSON.stringify(proj));
      //$scope.newproject.name = proj.name;
    };

    function saveChangesProject(act,proj) {
      if (act == "new") {
        Project.save(projVm.newproject);
        projVm.projects = projVm.projects.concat(projVm.newproject);
      }
      else {
        proj.name = projVm.newproject.name;
        proj.description = projVm.newproject.description;
        proj.label = projVm.newproject.label;
        proj.owner = projVm.newproject.owner;
        proj.creationDate = projVm.newproject.creationDate  ;
        proj.tags = projVm.newproject.tags;
        proj.collaborators = projVm.newproject.collaborators;
      }
    };


    function setActiveProject (proj){
      $scope.ActiveProject.project = proj;
      $scope.ActivePlate.plate  = "";
    };

    function addTag(tags,newTag){
      tags.push({name:newTag});
    };

    function checkedOwner(check){
      if (check)
        projVm.filterowner = 'Ivan';
      else
        projVm.filterowner = '';
    };

    function addCollaborator(collaborators,newCollaborator){
      collaborators.push(newCollaborator);
    };

  }



})();
