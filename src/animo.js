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
            var transformProps = ["scale", "translate", "rotate", "skew"].toString();
            var excludeProps = ["duration", "ease", "scale", "translate", "rotate", "skew"].toString();

            animation.duration = animation.duration || "1000ms";
            animation.ease = translateEase(animation.ease || "ease-out-quad");

            styles = setVendorStyle("transition", "all " + animation.duration + "ms;");
            styles += setVendorStyle("transition-timing-function", animation.ease);

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

        // ease methods mapping (taken from https://github.com/visionmedia/move.js);
        var translateEase = function(ease) {
            var methods = {
                'in':                'ease-in',
                'out':               'ease-out',
                'in-out':            'ease-in-out',
                'snap':              'cubic-bezier(0,1,.5,1)',
                'linear':            'cubic-bezier(0.250, 0.250, 0.750, 0.750)',
                'ease-in-quad':      'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
                'ease-in-cubic':     'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
                'ease-in-quart':     'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
                'ease-in-quint':     'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
                'ease-in-sine':      'cubic-bezier(0.470, 0.000, 0.745, 0.715)',
                'ease-in-expo':      'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
                'ease-in-circ':      'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
                'ease-in-back':      'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
                'ease-out-quad':     'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
                'ease-out-cubic':    'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
                'ease-out-quart':    'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
                'ease-out-quint':    'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
                'ease-out-sine':     'cubic-bezier(0.390, 0.575, 0.565, 1.000)',
                'ease-out-expo':     'cubic-bezier(0.190, 1.000, 0.220, 1.000)',
                'ease-out-circ':     'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
                'ease-out-back':     'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
                'ease-out-quad':     'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
                'ease-out-cubic':    'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
                'ease-in-out-quart': 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
                'ease-in-out-quint': 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
                'ease-in-out-sine':  'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
                'ease-in-out-expo':  'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
                'ease-in-out-circ':  'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
                'ease-in-out-back':  'cubic-bezier(0.680, -0.550, 0.265, 1.550)'
            };
            return methods[ease] || "ease-out";
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