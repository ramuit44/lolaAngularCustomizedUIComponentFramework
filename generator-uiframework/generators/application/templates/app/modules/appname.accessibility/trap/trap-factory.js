/**
 * Trap factory to inject trappping of user in dropdown and modals
 */
(function () {
    'use strict';

    angular.module('appname.accessibility.trap').factory('trapFactory', Trap);

    Trap.$inject = [];

    function Trap() {
        Trap.trappedElementList = [];
        Trap.currentElement = null;
        Trap.currentIndex = -1;
        var fixIndexSelector = {};

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

        // will return true if we could process the tab event
        // otherwise, return false
        var processTab = function (container, goReverse) {
            var $focussable = getFocusableElementsInContainer(container);
            var nextIndex, prevIndex;
            nextIndex = Trap.currentIndex + 1;
            if (nextIndex > $focussable.length - 1) {
                nextIndex = 0;
            }
            prevIndex = Trap.currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = $focussable.length - 1;
            }

            if (goReverse) {
                Trap.currentIndex = prevIndex;
            } else {
                Trap.currentIndex = nextIndex;
            }

            var curElt = $focussable.get(Trap.currentIndex);
            // IE sometimes throws when an element is not visible
            try {
                curElt.focus();
            } catch (e) {}

            return true;
        };

        var sortFocusable = function (a, b) {
            return (a.t - b.t) || (a.i - b.i);
        };

        var getFocusableElementsInContainer = function (container) {
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
        };

        var createDOMEvent = function () {
            $(document).keydown(function (e) {
                if (Trap.currentElement) {
                    if (e.keyCode === 9) {
                        var goReverse = !!(e.shiftKey);
                        if (processTab(Trap.currentElement, goReverse)) {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                }
            });
        };

        var unbindDomEvent = function () {
            $(document).unbind('keydown');
        };

        Trap.trapUser = function (element, name) {
            if (Trap.trappedElementList.length > 0) {
                Trap.trappedElementList[Trap.trappedElementList.length - 1].currentIndex = Trap.currentIndex;
            } else {
                createDOMEvent();
            }
            var trappedElementObj = {};
            trappedElementObj[name] = {
                currentElement: element,
                currentIndex: -1
            };
            Trap.currentElement = element;
            Trap.currentIndex = -1;
            Trap.trappedElementList.push(trappedElementObj);
        };

        Trap.untrapUser = function (name) {
            var index = getElementIndex(name);

            Trap.trappedElementList.splice(index, 1);

            if (Trap.trappedElementList.length === 0) {
                unbindDomEvent();
            }
        };

        var getElementIndex = function (name) {
            var indexToReturn = null;
            for (var index = 0; index < Trap.trappedElementList.length; index++) {
                if (Trap.trappedElementList[index][name]) {
                    indexToReturn = index;
                    break;
                }
            }
            return indexToReturn;
        };

        return Trap;
    }
})();
