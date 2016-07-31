'use strict';

var timerApp = angular.module('timerApp', []);
timerApp.controller("timerController", function($scope, $timeout) {
  var clocktimer;

  $scope.timer = function() {
    $scope.clock = $scope.dateDifference($scope.currentTask.dateBegin, new Date());
    clocktimer = $timeout($scope.timer, 1000);

  }

  $scope.buttonText = "Start";

  $scope.startOrStop = function() {
    if ($scope.currentTask.dateBegin == undefined) {
      $scope.start();
    } else {
      $scope.stop();
    }
  };

  $scope.tasks = tasks;
  $scope.project = [{
    project: "select project"
  }, {
    project: "timer"
  }, {
    project: "timer1"
  }, {
    project: "timer2"
  }];
  $scope.currentTask = {
    name: '',
    selectedProject: 'select project',
    dateFinish: ''
  };

  $scope.start = function() {
    var dateBegin = new Date();
    $scope.currentTask.dateBegin = dateBegin;
    $scope.style = {
      background: 'red'
    };
    $scope.buttonText = "Stop";
    $scope.timer();

  }

  $scope.stop = function() {
    var dateFinish = new Date();
    $scope.currentTask.dateFinish = dateFinish;
    $scope.tasks.push($scope.currentTask);
    $timeout.cancel(clocktimer);
    $scope.clock = '00:00:00';
    $scope.tasks.sort(tasksCompare);
    $scope.currentTask = {};
    $scope.style = {
      background: '#11dc51'
    }
    $scope.buttonText = "Start";
  }

  $scope.dateDifference = function(dateBegin, dateFinish) {
    var dateDifference = ((Math.floor((dateFinish) / 1000)) - (Math.floor((dateBegin) / 1000)));
    var seconds = dateDifference % 60;
    dateDifference -= seconds;
    dateDifference = Math.floor(dateDifference / 60);
    var minutes = dateDifference % 60;
    dateDifference -= minutes;
    dateDifference = Math.floor(dateDifference / 60);
    var hours = dateDifference % 60;
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    dateDifference = hours + ":" + minutes + ":" + seconds;
    return dateDifference;
  }

  $scope.quickStart = function(tasks) {
    if ($scope.currentTask.dateBegin !== undefined) {
      $scope.stop();
    }
    $scope.start();
    $scope.currentTask.name = tasks.name;
    $scope.currentTask.selectedProject = tasks.selectedProject;
  }

  function tasksCompare(a, b) {
    var r = 0;
    if (a.dateFinish > b.dateFinish) {
      r = -1;
    }
    if (a.dateFinish < b.dateFinish) {
      r = 1;
    }
    return r;
  }

});