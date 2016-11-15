/*
 * Modal factory to display the a modal.
 */
(function () {
    'use strict';

    angular.module('appname.common.modal').factory('modalFactory', Modal);

    Modal.$inject = [];

    function Modal($timeout) {
        Modal.modals = {};

        Modal.openModal = function (modalName) {
            Modal.modals[modalName] = true;
        };

        Modal.closeModal = function (modalName) {
            Modal.modals[modalName] = false;
        };

        return Modal;
    }
})();
