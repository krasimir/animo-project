window.onload = function() {
    animo(document.getElementById("demo"))
    .create("animation1", {
        start:"padding: 20px",
        end: "  background: #A36060; width :540px; color: #FFF;"
    })
    .create("animation2", {
        end: "font-size: 30px; transform: scale(1.4, 1.4); opacity: 0.5;",
        duration: "500ms"
    })
    .run("animation1", 500)
    .run("animation2", 1000)
}