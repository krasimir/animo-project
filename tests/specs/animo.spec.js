describe("ease > ", function() {

    it("should have animo loaded", function() {
        run(function(done) {
            expect(typeof animo != "undefined").toBe(true);
            done();
        });
    });

});
