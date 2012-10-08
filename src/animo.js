animo = (function() {

    var animations = {};
    var animated = [];
    var api = {};
    var defaultDuration = "1000ms";
    var defaultEaseMethod = "ease-out-quad";

    var AnimationController = function(element) {

        var styles = {};

        // set css text
        var setStyle = function() {
            var args = arguments;       
            if(args.length == 2) {
                if(args[0] && args[0] != "" && args[1] && args[1] != null) {
                    styles[args[0]] = args[1];
                }
            } else if(args.length == 1) {
                if(args[0] && args[0] != "") {
                    var parts = args[0].split(";");
                    for(var i=0; i<parts.length; i++) {
                        var styleElements = parts[i].split(":");
                        var prop = styleElements[0].replace(/ /gi, "");
                        var value = styleElements[1];
                        if(prop && prop != "" && value && value != null) {
                            styles[prop] = value;
                        }
                    }
                }
            }
        };

        // apply css
        var run = function(animation) {

            styles = {};
            
            var duration = (animation.duration ? animation.duration + "ms" : defaultDuration);
            var timingFunction = translateEase(animation.ease || defaultEaseMethod);

            // setStyle(element.style.cssText || element.getAttribute("style"));
            setStyle("transition: all " + duration + " " + timingFunction);
            setStyle(animation.css);

            // transform shortcuts            
            var transforms = "";
            var transformShortcuts = {
                move: "translate",
                scale: "scale",
                rotate: "rotate",
                rotateX: "rotateX",
                rotateY: "rotateY",
                rotateZ: "rotateZ",
                skew: "skew"
            };
            for(var prop in animation) {
                var shortcut = transformShortcuts[prop];
                if(typeof shortcut != "undefined") {
                    transforms += shortcut + "(" + animation[prop] + ") ";
                }
            }            
            if(transforms != "") {
                setStyle("transform", transforms);
            }

            var css = "";
            var vendors = ["-ms-", "-moz-", "-webkit-", "-o-"];
            var propertiesToBeVendored = {
                "transition": true, 
                "transition-timing-function": true, 
                "transition-delay": true, 
                "transform": true
            };
            for(var prop in styles) {
                var value = styles[prop];
                if(propertiesToBeVendored[prop]) {
                    css += prop + ":" + value + ";";
                    for(var i=0; i<vendors.length; i++) {
                        css += vendors[i] + prop + ":" + value + ";";
                    }
                } else {
                    css += prop + ":" + value + ";";
                }
            }
            
            element.setAttribute("style", css);
            element.style.cssText = css;

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

    // verify the element
    var verifyElement = function(selector) {
        var element = null;
        if(typeof selector == "undefined" || selector == null) throw new Error("Missing element!");        
        if(typeof selector == "string") {
            if(typeof $ != "undefined") {
                element = $(selector);
                if(element.length == 0) {
                    throw new Error("Wrong selector!");
                    return;
                }
                element = $(selector).get(0);
            } else {
                element = document.getElementById(selector) || document.querySelectorAll(selector)[0];
                if(typeof element == "undefined") {
                    throw new Error("Wrong selector!");
                }
            }  
        } else if(typeof selector == "object") {
            if(typeof $ != "undefined" && selector instanceof $) {
                element = selector.get(0);
            } else {
                element = selector;
            }
        } else {
            throw new Error("Missing selector!");
        }
        return element;
    }

    // creating animation
    var create = function(name, props) {
        animations[name] = props;
        return api;
    };

    // play animations
    var play = function(selector, name) {

        var element = verifyElement(selector);
        var animation = animations[name];

        if(!animation) {
            throw new Error("Missing animation with name '" + name + "'!");
            return;
        }

        if(element) {
            for(var i=0; i<animated.length; i++){
                if(animated[i].element == element) {
                    animated[i].controller.run(animation);
                    return api;
                }
            }
            var controller = new AnimationController(element);
            controller.run(animation);
            animated.push({ element: element, controller: controller});   
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