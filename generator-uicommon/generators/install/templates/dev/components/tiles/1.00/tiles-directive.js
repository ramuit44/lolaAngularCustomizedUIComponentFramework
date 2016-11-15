(function appnameTilesDirective() {
    'use strict';
    angular.module('appname.common.tiles').directive('appnameTiles', Tiles);

    Tiles.$inject = [];

    function Tiles() {
        var directive = {
            restrict: 'EA',
            template: require('./tiles-template.html'),
            scope: {
                "list": '=',
                "model": '=',
                'labelName': '@',
                'valueName': '@',
                'groupTitle': '@',
                'name': '@',
                'onChange': '&',
                'isDisabled': '=',
                'isRequired': '=',
                'isInvalid': '=',
                'errorMsg': '@',
                'tooltipPosition': '@',
                'multiOutput': '@',
                'multiColumn': '@'
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['$element', '$scope', '$attrs'];//, 'keyboardManager'

    function Controller($element, $scope, $attrs) {//, keyboardManager
        var vm = this;
        vm.itemList = [];
        if(vm.multiOutput == 'true'){
            vm.model = [];
        }else{
            vm.model = {};
        }
        //vm.cmLockedFieldMsg = contentManagementFactory.global.lockedFieldMsg;
        $scope.$watch('vm.list',function(newValue){
            if(newValue) {
                vm.itemList = newValue;
                assignAlphabet(vm.itemList);
            }
        });
        $scope.selectItem = function(item){
            if(vm.multiOutput == 'true'){
                item.selected = !item.selected;
                addItemsToList();
            }else{
                angular.forEach(vm.itemList,function(items){
                    items.selected = false;
                });
                item.selected = true;
                vm.model = item;
            }
        };
        function addItemsToList(){
            vm.model = [];
            angular.forEach(vm.itemList,function(items){
                if(items.selected){
                    vm.model.push(items);
                }
            });
        }
        $scope.printElement = function (item) {
            return "<div><span>" + item.keyBoardShortCut + "</span></div>" + "<span class='truncate'>" + item.value  + "</span>";
        };
        $scope.$on("$destroy", function () {
            _.forEach(vm.itemList, function (st) {
                var code = st.keyBoardShortCut;
                /* keyboardManager.unbind(code);*/
            });
        });
        function assignAlphabet(itemList){
            var cc = 97;
            _.forEach(itemList, function (st) {
                var code = String.fromCharCode(cc);
                st.keyBoardShortCut = code;
                /*keyboardManager.unbind(code);
                 keyboardManager.bind(code, function () {
                 $scope.selectItem(st);
                 }, {'inputDisabled': true});*/
                cc++;
            });
        }
    }

})();
