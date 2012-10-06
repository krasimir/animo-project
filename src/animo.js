animo = function(element) {

    var self = this;
    var defaultDuration  = "transition: 1000ms;-moz-transition: 1000ms;-webkit-transition: 1000ms;-o-transition: 1000ms;";
    var styles = {};
    var animations = {};
    var api = {};

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
            css += i + ":" + styles[i] + ";";
        }

        element.setAttribute("style", css);
        element.style.cssText = css;

    };
    var setDuration = function(value) {
        var css = "transition:" + value + ";";
        css += "-moz-transition:" + value + ";";
        css += "-webkit-transition:" + value + ";";
        css += "-o-transition:" + value + ";";
        setStyle(css);
    };
    var create = function(name, props) {
        animations[name] = props;
        return api;
    };
    var run = function(name, wait) {

        var animation = animations[name];
        if(!animation) throw new Error("Missing animation with name '" + name + "'!");
        if(animation.start) setStyle(animation.start);
        setTimeout(function() {
            setDuration(animation.duration || defaultDuration);
            if(animation.end) setStyle(animation.end);    
        }, wait || 1);

        return api;
    };

    setStyle(element.style.cssText || element.getAttribute("style"));

    return api = {
        create: create,
        run: run
    }   

};