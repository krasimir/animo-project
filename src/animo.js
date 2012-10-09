animo = (function() {

    if(typeof Array.prototype.compare == "undefined") {
        Array.prototype.compare = function(testArr) {
            if (this.length != testArr.length) return false;
            for (var i = 0; i < testArr.length; i++) {
                if (this[i].compare) { 
                    if (!this[i].compare(testArr[i])) return false;
                }
                if (this[i] !== testArr[i]) return false;
            }
            return true;
        }
    }

    var animations = {};
    var animated = [];
    var api = {};

    var AnimationController = function(elements) {

        // prepare css text
        var run = function(animation, playOn) {

            var styles = "";
            var transforms = "";
            var transformProps = "scale, translate, rotate, skew";
            var excludeProps = "duration, ease, scale, translate, rotate, skew, bind";

            styles += setVendorStyle("transition-duration", animation.duration ? animation.duration + "ms" : "1000ms");
            styles += setVendorStyle("transition-timing-function", animation.ease || "ease-out");

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
                        element[playOn] = function() {
                            setStyles(element, styles);
                        }
                    })(elements[i]);
                } else {
                    setStyles(elements[i], styles);
                }
            }

        }

        // apply css text
        var setStyles = function(element, styles) {
            element.setAttribute("style", styles);
            element.style.cssText = styles;
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
            run: run
        }        

    }

    // get element
    var select = function(selector) {
        var elements = null;
        if(typeof selector == "undefined" || selector == null) throw new Error("Missing options.element!");        
        if(typeof selector == "string") {
            if(typeof $ != "undefined") {
                elements = $(selector);
                if(elements.length == 0) {
                    throw new Error("Wrong selector!");
                    return;
                }
                var result = [];
                for(var i=0; i<elements.length; i++) {
                    result.push(elements.get(i));
                }
                elements = result;
            } else {
                elements = document.querySelectorAll(selector) || document.getElementById(selector);
                if(typeof elements == "undefined") {
                    throw new Error("Wrong selector!");
                }
            }  
        } else if(typeof selector == "object") {
            elements = selector;
        } else {
            throw new Error("Select failed!");
        }
        if(!(elements instanceof Array)) {
            elements = [elements];
        }
        return elements;
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
        var elements = select(options.element);
        var animation = animations[options.animation];
        if(!animation) {
            throw new Error("Missing animation with name '" + options.animation + "'. Did you set options.animation?");
        }
        if(elements) {
            for(var i=0; i<animated.length; i++){
                if(animated[i].elements.compare(elements)) {
                    animated[i].controller.run(animation, options.on);
                    return api;
                }
            }
            var controller = new AnimationController(elements);
            controller.run(animation, options.on);
            animated.push({ elements: elements, controller: controller});   
        }
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