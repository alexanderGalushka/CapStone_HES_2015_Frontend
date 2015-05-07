//'use strict';

describe('Controller: ProjectsCtrl', function () {

  // load the controller's module
  beforeEach(module('adamApp'));

  var ProjectsCtrl,
    scope,
    httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://54.149.197.234/adam/rest/project').
      respond([{name: 'Project 1', description: 'Description 1', label: 'Label 1'},{name: 'Project 2', description: 'Description 2', label: 'Label 2'}]);

    $httpBackend.expectGET('http://54.149.197.234/adam/rest/user/others').
      respond([{username: 'Ivan',firstName: 'Ivan 1',lastName: 'B'},{username: 'Gerson',firstName: 'Gerson 1',lastName: 'G'},{username: 'Cindy',firstName: 'Cindy',lastName: 'C'}]);

    scope = $rootScope.$new();
    ProjectsCtrl = $controller('ProjectsCtrl', {
      $scope: scope
    });
  }));

  it('should initialize variable', function () {
    expect(ProjectsCtrl.filterowner).toBe('');
    expect(scope.ActiveProject.project).toBe(null);
    expect(scope.ActivePlate.plate).toBe(null);
    expect(scope.activePlateResult.plateResult).toBe(null);

  });

  it('should call web services', function () {
    $httpBackend.flush();

    expect(angular.equals(ProjectsCtrl.projects,
      [{name: 'Project 1', description: 'Description 1', label: 'Label 1'},{name: 'Project 2', description: 'Description 2', label: 'Label 2'}])).toBe(true);
    expect(angular.equals(ProjectsCtrl.collaborators,
      [{username: 'Ivan',firstName: 'Ivan 1',lastName: 'B'},{username: 'Gerson',firstName: 'Gerson 1',lastName: 'G'},{username: 'Cindy',firstName: 'Cindy',lastName: 'C'}])).toBe(true);
  });

  it('should call addNewProject function', function () {
    ProjectsCtrl.addNewProject ();
    expect(ProjectsCtrl.projectAction).toBe("new");

    expect(ProjectsCtrl.newproject).toEqual({
      "name": "" ,
      "description": "",
      "label": "",
      "collaborators":[]
    });

  });
});
