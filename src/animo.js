animo = (function() {

    var animations = {};
    var animated = [];
    var api = {};
    var defaultDuration = 1000;

    var AnimationController = function(elements) {

        // prepare css text
        var run = function(animation, playOn) {

            var styles = "";
            var transforms = "";
            var transformProps = "scale, translate, rotate, skew";
            var excludeProps = "duration, ease, scale, translate, rotate, skew, bind, skipAnimation";

            if(!animation.skipAnimation) {
                styles += setVendorStyle("transition-duration", animation.duration ? animation.duration + "ms" : defaultDuration + "ms");
                styles += setVendorStyle("transition-timing-function", animation.ease || "ease-out");
            }

            for(var i in animation) {
                if(transformProps.indexOf(i) >= 0) {
                    transforms += i + "(" + animation[i] + ") ";
                } else if(excludeProps.indexOf(i) === -1) {
                    styles += i + ": " + animation[i] + ";";
                }
            }
            if(transforms != "") {
                styles += setVendorStyle("transform", transforms);
            }
            for(var i=0; i<elements.length; i++) {
                if(typeof playOn != "undefined") {
                    (function(element) {
                        element[playOn](function() {
                            element.attr("style", styles);
                        });
                    })(elements.eq(i));
                } else {
                    elements.eq(i).attr("style", styles);
                }
            }

        }

        // vendors
        var setVendorStyle = function(prop, value) {
            var vendors = ["", "-webkit-", "-o-", "-ms-", "-moz-"];
            var styles = "";
            for(var i=0; i<vendors.length; i++) {
                styles += vendors[i] + prop + ":" + value + ";";
            }
            return styles;
        }

        return {
            run: run,
            elements: elements
        }        

    }

    // creating animation
    var create = function(name, props) {
        animations[name] = props;
        if(typeof props.bind != "undefined") {
            api.play({
                element: props.bind.to,
                animation: name,
                on: props.bind.on
            });
        }
        return api;
    };

    // play animations
    var play = function(options) {
        var elements = typeof options.element == "string" ? $(options.element) : options.element;
        if(elements.length == 0) {
            throw new Error("Wrong selector or object!");
        }
        var animation = animations[options.animation];
        if(!animation) {
            throw new Error("Missing animation with name '" + options.animation + "'. Did you set options.animation?");
        }
        if(options.callback) {
            setTimeout(options.callback, animation.duration || defaultDuration)
        }
        for(var i=0; i<animated.length; i++){
            var e1 = animated[i].controller.elements;
            var e2 = elements;
            if(e1.length === e2.length && e1.length === e1.filter(e2).length) {
                animated[i].controller.run(animation, options.on);
                return api;
            }
        }
        var controller = new AnimationController(elements);
        controller.run(animation, options.on);
        animated.push({controller: controller});
        return api;
    };

    // return current created animations
    var getAnimations = function() {
        return animations;
    }

    return api = {
        create: create,
        play: play,
        getAnimations: getAnimations
    }

})();