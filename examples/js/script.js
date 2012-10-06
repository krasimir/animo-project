window.onload = function() {
    animo(document.getElementById("demo"))
    .create("animation1", {
        duration: "1000ms",
        start:"padding: 20px",
        end: "  background: #A36060; width :540px; color: #FFF;"
    })
    .create("animation2", {
        end: "font-size: 30px",
        duration: "500ms"
    })
    .run("animation1", 500)
    .run("animation2", 1000)
}