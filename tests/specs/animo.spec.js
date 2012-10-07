describe("ease > ", function() {

    var animationProps = {
        css: "background: rgb(156, 156, 156)",
        duration: 500
    };

    it("should have animo loaded", function() {
        run(function(done) {
            expect(typeof animo != "undefined").toBe(true);
            done();
        });
    });

    it("should create animation", function() {
        run(function(done) {
            animo.create("test", animationProps);
            expect(animo.getAnimations()["test"] != null).toBe(true);
            done();
        });
    });

    it("should apply", function() {
        run(function(done) {
            animo.apply("body", "test");
            setTimeout(function() {
                expect($("body").css("background-color") == "rgb(156, 156, 156)").toBe(true);
                done();
            }, 1000);
        });
    });

});
