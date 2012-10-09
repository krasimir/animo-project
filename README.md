# animo
### Small JavaScript library for CSS3 animations

*** 

##### Usage

Include **animo.js** in your page.

    <script src="../src/animo.js"></script>

Create animation template:

    animo.create("over", {
        "box-shadow": "0px 0px 20px #5C5C5C",
        duration: 400,
        scale: "1.1, 1.1",
        ease: "ease-out-back",
        rotate: "3deg",
        color: "#FF0",
        background: "#000"
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