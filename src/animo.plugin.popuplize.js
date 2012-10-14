(function() {

    if(typeof animo == "undefined") {
        throw new Error("Missing animo.js!");
        return;
    }

    animo.popuplize = (function() {

        var api = {};
        var popupElement = null;

        var verifyElement = function(element) {
            var element = typeof element == "string" ? $(element) : element;
            if(element.length == 0) {
                throw new Error("Wrong selector or object!");
                return;
            } else if(element.length > 1) {
                throw new Error("There are " + element.length + " elements passed to show method. It should be only one.");
                return;
            }
            if(element.parent().length === 0) {
                $("body").append(element);
            }
            return element;
        };

        /* ********************************************************************* popup */
        var show = function(element) {

            element = popupElement = verifyElement(element);

            var positionProps = function() {
                return {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    "margin-left": (- element.outerWidth() / 2) + "px",
                    "margin-top": (- element.outerHeight() / 2) + "px",
                    display: "block",
                    scale: "0.95, 0.95",
                    opacity: 0
                }
            };

            animo
            .create("dialog.init", $.extend(positionProps(), { skipAnimation: true }))
            .create("dialog.show", $.extend(positionProps(), { scale: "1.1, 1.1", opacity: 1, duration: 300 }))
            .create("dialog.hide", $.extend(positionProps(), { duration: 300 }))
            .create("dialog.hideEnds", { display: "none", skipAnimation: true })
            .play({ animation: "dialog.init", element: element })

            setTimeout(function() {
                animo.play({
                    animation: "dialog.show",
                    element: element
                });
            }, 20);

            content.show();
            cover.show();

            return api;
        };
        var hide = function(element) {
            animo.play({
                animation: "dialog.hide",
                element: element,
                callback: function() {
                    animo
                    .play({
                        animation: "dialog.hideEnds",
                        element: element
                    });
                }
            });
            content.hide();
            cover.hide();
        };

        /* ********************************************************************* content */
        var content = {
            element: null,
            selector: null,
            animationHide: {
                scale: "0.97, 0.97", 
                duration: 300, 
                filter: "blur(2px)" 
            },
            animationShow: {
                scale: "1, 1",
                duration: 300,
                filter: "none"
            },
            init: function(selector) {
                content.selector = selector;
            },
            show: function() {
                if(this.selector && !this.element) {
                    this.element = verifyElement(this.selector);
                    animo.create("content.hide", this.animationHide).create("content.show", this.animationShow);
                }
                if(this.element) {
                    animo.play({ element: this.element, animation: "content.hide" });
                }
            },
            hide: function() {
                if(this.element) {
                    animo.play({ element: this.element, animation: "content.show" });
                }
            }
        }

        /* ********************************************************************* cover */
        var cover = {
            element: null,
            show: function() {
                if(api.useCover && !this.element) {
                    this.element = $('<div class="animo-popuplize-cover"></div>');
                    this.element.insertBefore(popupElement);
                }
                if(this.element) {
                    this.element.attr("style", "position: absolute; width: 100%; height: 100%; top: 0; left: 0; opacity: 0.5; background: #000; display: block;" );   
                }  
            },
            hide: function() {
                if(this.element) {
                    this.element.attr("style", "display: none;" );
                }
            }
        };

        return api = {
            useCover: true,
            content: content.init,
            show: show,
            hide: hide
        }

    })();

})();