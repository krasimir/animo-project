# animo
### Small JavaScript library for CSS3 animations

*** 

##### Usage

Include **animo.js** in your page.

    <script src="../src/animo.js"></script>

Create animation template:

    animo.create("over", {
        css: "background-color: #A36060; width: 250px; box-shadow: 5px -5px 10px 1px #000;",
        duration: 300,
        ease: "ease-out-back"
    })

Play the animation

    animo.play({
        element: $(".main-menu-link"),
        animation: "over",
        on: "onmouseover"
    });

##### Inspired by
- [https://github.com/visionmedia/move.js](https://github.com/visionmedia/move.js)
- [https://github.com/daneden/animate.css](https://github.com/daneden/animate.css)
- [http://hakim.se/](http://hakim.se/)