(function appnameSortableTableAccordionDirective() {
    'use strict';
    angular.module('appname.common.sortableTableAccordion').directive('appnameSortableTableAccordion', sortableTableAccordion);

    sortableTableAccordion.$inject = [];

    function sortableTableAccordion() {
        var directive = {
            restrict: 'EA',
            template: require('./sortable-table-accordion-template.html'),
            scope: {
                list: '=',
                headers: '=',
                tableTitle: '@',
                collapsible: '=',
                setSelectedRow: '&',
                pagination: '=',
                pageSize: '=',
                sortable: '=',
                noOfResults: '@',
                noResultsMsg: '@',
                isErrorOccured: '='
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {}
    }

    Controller.$inject = ['$attrs', '$filter', 'contentManagementFactory'];

    function Controller($attrs, $filter, contentManagementFactory) {
        var vm = this;
        vm.cmNodata = contentManagementFactory.global.noData;

        vm.toggleRowContentDisplay = function (index) {
            var isExpanded = vm.currentList[index].shouldDisplay;
            resetFieldInList(vm.currentList, ['shouldDisplay']);
            vm.currentList[index].shouldDisplay = !isExpanded;
        };

        vm.orderList = function (index) {
            vm.headers[index].isReversed = vm.headers[index].isCurrentSortedColumn ? !vm.headers[index].isReversed : resetFieldInList(vm.headers, ['isReversed']);
            resetFieldInList(vm.headers, ['isCurrentSortedColumn']);
            resetFieldInList(vm.currentList, ['shouldDisplay']);
            vm.headers[index].isCurrentSortedColumn = true;
            vm.currentList = $filter('orderBy')(vm.currentList, vm.headers[index].sortingFieldName, vm.headers[index].isReversed);
            vm.list = vm.currentList.concat(vm.remainingList);
        };

        var resetFieldInList = function (list, labelArray) {
            for (var listIndex = 0; listIndex < list.length; listIndex++) {
                for (var labelArrayIndex = 0; labelArrayIndex < labelArray.length; labelArrayIndex++) {
                    list[listIndex][labelArray[labelArrayIndex]] = false;
                }
            }
        };

        vm.selectRow = function (selectedRowIndex) {
            resetFieldInList(vm.currentList, ['isSelected']);
            vm.currentList[selectedRowIndex].isSelected = true;
            if ($attrs.setSelectedRow) {
                vm.setSelectedRow({
                    "selectedRowIndex": selectedRowIndex
                });
            }
            if (vm.collapsible) {
                vm.toggleRowContentDisplay(selectedRowIndex);
            }
        };

        vm.showMore = function () {
            if (vm.moreRecords) {
                vm.remainingList = vm.list.slice(vm.currentList.length + vm.pageSize);
                vm.currentList = vm.list.slice(0, vm.currentList.length + vm.pageSize);
                if (vm.currentList.length >= vm.list.length || vm.currentPageSize >= contentManagementFactory.tableAccordion.maxRecords) {
                    vm.moreRecords = false;
                }
            }
        };

        vm.isAllFieldsUndefined = function (listEntry, dataFields) {
            var isAllFieldsUndefeined = true;
            for (var index = 0; index < dataFields.length; index++) {
                if (listEntry[dataFields[index]]) {
                    isAllFieldsUndefeined = false;
                    break;
                }
            }
            return isAllFieldsUndefeined;
        };

        vm.init = function () {
            vm.pageLink = contentManagementFactory.tableAccordion.pageLink;
            resetFieldInList(vm.headers, ['isCurrentSortedColumn', 'isReversed']);
            resetFieldInList(vm.list, ['shouldDisplay', 'isSelected']);
            vm.headers[0].isCurrentSortedColumn = true;
            vm.pageSize = vm.pageSize || contentManagementFactory.tableAccordion.defaultPageSize;
            if (vm.list.length > vm.pageSize) {
                vm.moreRecords = vm.pagination;
            } else {
                vm.moreRecords = false;
            }

            //vm.list = $filter('orderBy')(vm.list, vm.headers[0].sortingFieldName);

            if (vm.moreRecords) {
                vm.currentList = vm.list.slice(0, vm.pageSize);
                vm.remainingList = vm.list.slice(vm.pageSize);
            } else {
                vm.currentList = vm.list;
                vm.remainingList = [];
            }
        };

        vm.init();
    }

})();
