# animo
### Small JavaScript library for CSS3 animations

*** 

#### Dependencies

[http://jquery.com/](jQuery)

#### Usage

Include **animo.js** and **jQuery** in your page.

    <script src="jquery.js"></script>
    <script src="animo.js"></script>

#### Create animation template:

    animo.create(<name>, <properties>)

**name:** string

**properties:**

- any valid css property (example: {border: "solid 1px #000", color: "#F00"})
- duration (example: {duration: "1500ms"})
- scale (example: {scale: "1.2, 1.2"})
- rotate (example: {rotate: "120deg"})
- translate (example: {rotate: "100px, 200px"})
- skew (example: {skew: "10deg, 60deg"})
- ease (example: {ease: "cubic-bezier(0,1.23,.87,.02)"})
- bind (example: {bind: {to: ".mainmenu > a", on: "onmouseover"})


#### Play the animation

    animo.play(<properties>);

**properties:**

- element - string selector or jQuery object
- animation - name of created animation
- on - if set the animation will be executed as a handler of provided event (example: {on: "onmouseover"})

Instant playing

    $(".demo-nav > li > a").mouseover(function() {
        animo.play({
            element: this,
            animation: "over"
        });
    });

Playing on event

    animo.play({
        element: ".demo-nav > li > a",
        animation: "over",
        on: "mouseover"
    });

Playing on event, defined in the animation creation

    animo.create("over", {
        "box-shadow": "0px 0px 20px #5C5C5C",
        duration: 400,
        background: "#000",
        bind: {
            to: ".navigation > li > a",
            on: "mouseover"
        }
    })


###### Inspired by
- [https://github.com/visionmedia/move.js](https://github.com/visionmedia/move.js)
- [https://github.com/daneden/animate.css](https://github.com/daneden/animate.css)
- [http://hakim.se/](http://hakim.se/)