animo = function(element) {

    // jquery fixture
    if(typeof $ != "undefined" && element instanceof $) {
        if(element.length == 0) {
            throw new Error("Wrong selector!"); return;
        }
        element = element.get(0);
    }

    var self = this;
    var styles = {};
    var animations = {};
    var api = {};
    var defaultDuration = "1000ms";

    if(typeof element == "undefined" || element == null) throw new Error("Missing element!");

    var setStyle = function() {        
        if(arguments.length == 2) {
            if(arguments[0] && arguments[0] != "" && arguments[1] && arguments[1] != null) {
                styles[arguments[0]] = arguments[1];
            }
        } else if(arguments.length == 1) {
            if(arguments[0] && arguments[0] != "") {
                var parts = arguments[0].split(";");
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

        var css = "";
        for(var i in styles) {
            css += composeCSSText(i, styles[i]);
        }

        element.setAttribute("style", css);
        element.style.cssText = css;

    };
    var composeCSSText = function(prop, value) {
        var vendors = ["-ms-", "-moz-", "-webkit-", "-o-"];
        var special = {
            "transition": true, 
            "transition-property": true, 
            "transition-duration": true, 
            "transition-timing-function": true, 
            "transition-delay": true, 
            "transform": true,
            "transform-origin": true,
            "transform-style": true
        };
        var css = "";
        if(special[prop]) {
            css += prop + ":" + value + ";";
            for(var i=0; i<vendors.length; i++) {
                css += vendors[i] + prop + ":" + value + ";";
            }
        } else {
            css += prop + ":" + value + ";";
        }
        return css;
    }
    var create = function(name, props) {
        animations[name] = props;
        return api;
    };
    var run = function(name, wait) {
        var animation = animations[name];
        if(!animation) throw new Error("Missing animation with name '" + name + "'!");
        if(animation.start) setStyle(animation.start);
        if(wait) {
            setTimeout(function() {
                setStyle("transition:" + (animation.duration || defaultDuration))
                if(animation.end) setStyle(animation.end);    
            }, wait);
        } else {
            setStyle("transition:" + (animation.duration || defaultDuration))
            if(animation.end) setStyle(animation.end); 
        }
        return api;
    };

    setStyle(element.style.cssText || element.getAttribute("style"));

    return api = {
        setStyle: setStyle,
        create: create,
        run: run
    }   

};