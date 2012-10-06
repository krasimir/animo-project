ease = (function() {

    // *************************************************************** easing methods
    var methods = {
        InBack: function(t, b, c, d, s) {
            if(typeof s == "undefined") { s = 1.70158;}
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        OutBack: function(t, b, c, d, s) {
            if(typeof s == "undefined") { s = 1.70158;}
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        InOutBack: function(t, b, c, d, s) {
            if(typeof s == "undefined") { s = 1.70158; }
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        //Bounce
        OutBounce: function(t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
            }
        },
        InBounce: function(t, b, c, d) {
            return c - this.OutBounce (d-t, 0, c, d) + b;
        },
        InOutBounce: function(t, b, c, d) {
            if (t < d/2) return this.InBounce (t*2, 0, c, d) * .5 + b;
            else return this.OutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
        },
        //Circ
        InCirc: function(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        OutCirc: function(t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        InOutCirc: function(t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        //Cubic
        In: function(t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        Out: function(t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        InOut: function(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        //Elastic
        InElastic: function(t, b, c, d, a, p) {
            if(typeof a == "undefined") { a = 1; }
            if(typeof p == "undefined") { p = 0.3; }
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s = p/4; }
            else s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        OutElastic: function(t, b, c, d, a, p) {
            if(typeof a == "undefined") { a = 1; }
            if(typeof p == "undefined") { p = 0.3; }
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s = p/4; }
            else s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        InOutElastic: function(t, b, c, d, a, p) {
            if(typeof a == "undefined") { a = 1; }
            if(typeof p == "undefined") { p = 0.3; }
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s = p/4; }
            else s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        //Expo
        InExpo: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        OutExpo: function(t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        InOutExpo: function(t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        //Linear
        Linear: function(t, b, c, d) {
            return c*t/d + b;
        },
        InLinear: function(t, b, c, d) {
            return c*t/d + b;
        },
        OutLinear: function(t, b, c, d) {
            return c*t/d + b;
        },
        InOutLinear: function(t, b, c, d) {
            return c*t/d + b;
        },
        //Quad
        InQuad: function(t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        OutQuad: function(t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        InOutQuad: function(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        //Quart
        InQuart: function(t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        OutQuart: function(t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        InOutQuart: function(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        //Quint
        InQuint: function(t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        OutQuint: function(t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        InOutQuint: function(t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        //Sine
        InSine: function(t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        OutSine: function(t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        InOutSine: function(t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    }

    var calculate = function(options) {     
        if(typeof options == "undefined"){ animo.ease.error("missing options"); return; }
        if(typeof options.start == "undefined"){ animo.ease.error("missing options.start"); return; }
        if(typeof options.end == "undefined"){ animo.ease.error("missing options.end"); return; }
        if(typeof options.steps == "undefined"){ animo.ease.error("missing options.steps"); return; }
        if(typeof options.method == "undefined"){ animo.ease.error("missing options.method"); return; }                
        var values = [];
        for(var i=0; i<options.steps; i++) {
            var value = methods[options.method](i, options.start, options.end - options.start, options.steps-1);
            value = Number(String(value).split('.')[0]);
            values[i] = value;
        }
        values[0] = options.start;
        values[values.length-1] = options.end;
        return values;
    }

    // *************************************************************** error
    var error = function(msg) {
        if(animo.ease.mode == "production") {
            throw new Error(msg);
        } else if(animo.ease.mode == "development") {
            console.log("error: " + msg);
        }
    }

    return {
        mode: "production",
        calculate: calculate,
        error: error
    }    

})();