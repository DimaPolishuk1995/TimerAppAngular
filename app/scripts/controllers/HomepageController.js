'use strict';

trackProcess
    .controller('HomepageCtrl', function ($scope, $state, $location, GetArray, LocalStorage, $timeout) {

        $scope.getTasks = LocalStorage.getTaskToken();
        var clocktimer;
        $scope.buttonText = "Start";
        $scope.tasks = GetArray.getArrayData('tasks');

        if (typeof $scope.getTasks != 'undefined') {
            $scope.tasks = $scope.getTasks;
        }

        $scope.project = GetArray.getArrayData('project');
        $scope.currentTask = {
            name: '',
            selectedProject: 'select project',
            dateFinish: ''
        };

        $scope.timer = function () {
            $scope.clock = $scope.dateDifference($scope.currentTask.dateBegin, new Date());
            clocktimer = $timeout($scope.timer, 1000);
        };

        $scope.startOrStop = function () {
            if ($scope.currentTask.dateBegin == undefined) {
                $scope.start();
            } else {
                $scope.stop();
            }
        };

        $scope.start = function () {
            var dateBegin = new Date();
            $scope.currentTask.dateBegin = dateBegin;
            $scope.style = {
                background: 'rgb(220, 17, 17)'
            };
            $scope.buttonText = "Stop";
            $scope.timer();
        };

        $scope.stop = function () {
            var dateFinish = new Date();
            $scope.currentTask.dateFinish = dateFinish;
            $scope.tasks.push($scope.currentTask);
            $timeout.cancel(clocktimer);
            $scope.clock = '00:00:00';
            $scope.tasks.sort(tasksCompare);
            $scope.currentTask = {};
            $scope.style = {
                background: '#11dc51'
            };
            $scope.buttonText = "Start";
            LocalStorage.addTaskToStorage($scope.tasks);
        };

        $scope.dateDifference = function (dateBegin, dateFinish) {
            var dateDifference = ((Math.floor((new Date(dateFinish)) / 1000)) - (Math.floor((new Date(dateBegin)) / 1000)));
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
        };

        $scope.quickStart = function (tasks) {
            if ($scope.currentTask.dateBegin !== undefined) {
                $scope.stop();
            }
            $scope.start();
            $scope.currentTask.name = tasks.name;
            $scope.currentTask.selectedProject = tasks.selectedProject;
        };

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

        $scope.removeTask = function (id) {
            LocalStorage.clearTaskToken(id, id);
        };

    });
