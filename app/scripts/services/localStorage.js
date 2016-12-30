'use strict';

trackProcess
    .service('LocalStorage', function ($localStorage) {
        /**
         * Add event token to storage
         */
        this.addTaskToStorage = function (task) {
            $localStorage.task = task;
        };

        /**
         * Get event token
         */
        this.getTaskToken = function () {
            return $localStorage.task;
        };

        /**
         * Clear event token by id
         */

        this.clearTaskToken = function (id) {
             var newId = id - id + 1;
             $localStorage.task.splice(id, newId);
        };

        /**
         * Clear localStorage
         */

        this.clearLocalStorage = function () {
            delete $localStorage.task;
        };

    });