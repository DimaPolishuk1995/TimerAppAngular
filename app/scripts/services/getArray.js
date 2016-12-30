'use strict';

trackProcess
    .factory('GetArray', function () {

        var typesCollection = {
            tasks: [{
                name: "Задача № 1",
                selectedProject: 'select project',
                dateBegin: new Date('07 24, 2016 19:58:49'),
                dateFinish: new Date('07 24, 2016 19:58:59')
            }, {
                name: "Задача № 2",
                selectedProject: 'timer',
                dateBegin: new Date('07 25, 2016 19:58:30'),
                dateFinish: new Date('07 25, 2016 19:59:15')
            }],
            project: [
                {
                    project: "My project №1"
                },
                {
                    project: "My project №2"
                }
                ,
                {
                    project: "My project №3"
                }
            ]
        };

        return {
            getArrayData: function (key) {
                return typesCollection[key];
            }
        };

    });