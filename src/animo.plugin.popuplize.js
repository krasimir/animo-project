(function() {

    if(typeof animo == "undefined") {
        throw new Error("Missing animo.js!");
        return;
    }

    animo.popuplize = (function() {

        var api = {};

        var show = function(element) {
            
            var element = typeof element == "string" ? $(element) : element;
            if(element.length == 0) {
                throw new Error("Wrong selector or object!");
                return;
            } else if(element.length > 1) {
                throw new Error("There are " + element.length + " elements passed to show method. It should be only one.");
            }

            var positionProps = function() {
                return {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    "margin-left": (- element.outerWidth() / 2) + "px",
                    "margin-top": (- element.outerHeight() / 2) + "px",
                    display: "block",
                    opacity: 0.4,
                    scale: "1.2, 1.2"
                }
            };

            animo
            .create("dialog.init", $.extend(positionProps(), {
                skipAnimation: true
            }))
            .create("dialog.show", $.extend(positionProps(), {
                opacity: 1,
                scale: "1, 1",
                duration: 500
            }))
            .create("dialog.hide", $.extend(positionProps(), {
                duration: 300
            }))
            .create("dialog.hideEnds", {
                display: "none",
                skipAnimation: true
            })
            .play({
                animation: "dialog.init",
                element: element
            });

            setTimeout(function() {
                animo.play({
                    animation: "dialog.show",
                    element: element
                });
            }, 20)

            return api;
        };

        var hide = function(element) {
            animo.play({
                animation: "dialog.hide",
                element: element,
                callback: function() {
                    animo.play({
                        animation: "dialog.hideEnds",
                        element: element
                    })
                }
            });
        }

        return api = {
            show: show,
            hide: hide
        }

    })();

})();