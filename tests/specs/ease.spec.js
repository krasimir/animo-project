describe("ease > ", function() {

    it("should have ease loaded", function() {
        run(function(done) {
            expect(typeof ease != "undefined").toBe(true);
            ease.mode = "development";
            done();
        });
    });

    it("should have ease methods defined", function() {
        run(function(done) {
            expect(typeof ease != "undefined").toBe(true);
            done();
        });
    });

    it("should have ease methods working", function() {
        run(function(done) {
            var methods = ["InBack", "OutBack", "InOutBack", "OutBounce", "InBounce", "InOutBounce", "InCirc", "OutCirc", "InOutCirc", "In", "Out", "InOut", "InElastic", "OutElastic", "InOutElastic", "InExpo", "OutExpo", "InOutExpo", "Linear", "InLinear", "OutLinear", "InOutLinear", "InQuad", "OutQuad", "InOutQuad", "InQuart", "OutQuart", "InOutQuart", "InQuint", "OutQuint", "InOutQuint", "InSine", "OutSine", "InOutSine"];
            for(var i=0; i<methods.length; i++) {
                var options = {
                    start: 23,
                    end: 105,
                    steps: 19,
                    method: methods[i]
                };
                var values = ease.calculate(options);    
                expect(values != null).toBe(true);
                if(values != null) {
                    expect(values.length == options.steps).toBe(true);
                    expect(values[0] == options.start).toBe(true);
                    expect(values[values.length-1] == options.end).toBe(true);
                }
            }
            done();
        });
    });

});
