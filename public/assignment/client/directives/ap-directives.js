/**
 * Created by ameyapandilwar on 4/13/16.
 */

(function(){
    "use strict";
    angular
        .module("apDirectives", [])
        .directive("apSortable", apSortable);

    function apSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end = null;
            $(element)
                .sortable({
                    axis: "y",
                    sort: function (event, ui) {
                        start = ui.item.index();
                    },
                    stop: function (event, ui) {
                        end = ui.item.index();
                        if (start >= end) {
                            start--;
                        }
                        scope.apSortableCallback({start: start, end: end});
                    }
                });
        }

        return {
            scope: {
                apSortableCallback: '&'
            },
            link: link
        };
    }
})();