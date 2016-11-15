(function appnameTrapDirective() {
    'use strict';
    angular.module('appname.accessibility.trap').directive('appnameTrap', Trap);

    Trap.$inject = [];

    function Trap() {
        var directive = {
            restrict: 'EA',
            template: require('./trap-template.html'),
            scope: {
                isTrapEnabled: '='
            },
            transclude: 'true',
            link: linkFunc
        };

        function linkFunc(scope, el, attr, ctrl) {

            var fixIndexSelector = {};
            var currentIndex = -1;
            var $focussable;

            if ($.find.find && $.find.attr !== $.attr) {
                // jQuery uses Sizzle (this is jQuery >= 1.3)
                // sizzle uses its own attribute handling (in jq 1.6.x and below)
                (function () {
                    var tabindexKey = "tabindex";
                    var sizzleAttrHandle = $.expr.attrHandle;

                    // this function comes directly from jQuery 1.7.2 (propHooks.tabIndex.get)
                    // we have to put it here if we want to support jQuery < 1.6 which
                    // doesn't have an attrHooks object to reference.
                    function getTabindexAttr(elem) {
                        // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                        // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                        var attributeNode = elem.getAttributeNode(tabindexKey);

                        return attributeNode && attributeNode.specified ?
                            parseInt(attributeNode.value, 10) :
                            undefined;
                    }

                    function fixSizzleAttrHook() {
                        // in jQ <= 1.6.x, we add to Sizzle the attrHook from jQuery's attr method
                        sizzleAttrHandle[tabindexKey] = sizzleAttrHandle.tabIndex = getTabindexAttr;
                    }

                    function unfixSizzleAttrHook() {
                        delete sizzleAttrHandle[tabindexKey];
                        delete sizzleAttrHandle.tabIndex;
                    }


                    fixIndexSelector = {
                        enable: fixSizzleAttrHook,
                        disable: unfixSizzleAttrHook
                    };
                })();
            }

            $(document).unbind('keydown').keydown(function (e) {
                if (scope.isTrapEnabled === true || scope.isTrapEnabled === undefined) {
                    if (e.keyCode === 9) {
                        var goReverse = !!(e.shiftKey);
                        if (processTab(el, goReverse)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                }
            });

            // will return true if we could process the tab event
            // otherwise, return false
            function processTab(container, goReverse) {
                $focussable = getFocusableElementsInContainer(el);
                var nextIndex, prevIndex;
                nextIndex = currentIndex + 1;
                if (nextIndex > $focussable.length - 1) {
                    nextIndex = 0;
                }
                prevIndex = currentIndex - 1;
                if (prevIndex < 0) {
                    prevIndex = $focussable.length - 1;
                }

                if (goReverse) {
                    currentIndex = prevIndex;
                } else {
                    currentIndex = nextIndex;
                }

                var curElt = $focussable.get(currentIndex);
                // IE sometimes throws when an element is not visible
                try {
                    curElt.focus();
                } catch (e) {}

                return true;
            }

            function sortFocusable(a, b) {
                return (a.t - b.t) || (a.i - b.i);
            }

            function getFocusableElementsInContainer(container) {
                var $container = $(container);
                var result = [],
                    cnt = 0;

                if (fixIndexSelector.enable) {
                    fixIndexSelector.enable();
                }

                // leaving away command and details for now
                $container.find("a[href], link[href], [draggable=true], [contenteditable=true], :input:enabled, [tabindex=0]")
                    .filter(":visible")
                    .filter(function () {
                        return !this.tabIndex; // true if no tabIndex or tabIndex == 0
                    })
                    .each(function (i, val) {
                        result.push({
                            v: val, // value
                            t: 0, // tabIndex
                            i: cnt++ // index for stable sort
                        });
                    });

                $container
                    .find("[tabindex]")
                    .filter(":visible")
                    .filter(function () {
                        return this.tabIndex > 0;
                    })
                    .each(function (i, val) {
                        result.push({
                            v: val, // value
                            t: val.tabIndex, // tabIndex
                            i: cnt++ // index
                        });
                    });

                if (fixIndexSelector.disable) {
                    fixIndexSelector.disable();
                }

                result = $.map(result.sort(sortFocusable), // needs stable sort
                    function (val) {
                        return val.v;
                    }
                );
                return $(result);
            }

            scope.$on('$destroy', function () {
                $(document).unbind('keydown');
            });

        }
        return directive;
    }

})();
