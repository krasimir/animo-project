# animo
### Small JavaScript library for CSS3 animations

*** 

#### Dependencies

[http://jquery.com/](jQuery)

#### Usage

Include **jQuery** and **animo.js** in your page.

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
- skipAnimation - if it is **true** the css styles are applied without setting the transition properties, which means that there is no animation, just direct styling
- delay (example: {delay: 300})


#### Play the animation

    animo.play(<properties>);

**properties:**

- element - string selector or jQuery object
- animation - name of created animation
- on - if set the animation will be executed as a handler of provided event (example: {on: "onmouseover"})
- callback - it is called once the animation ends

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

# Plugins

***

### Popuplize

The plugin allows creation of popups. 

#### Usage

Include **jQuery**, **animo.js** and **animo.plugin.popuplize.js** in your page.

    <script src="jquery.js"></script>
    <script src="animo.js"></script>
    <script src="animo.plugin.popuplize.js"></script>

Your dialog should be hidden
    
    <style type="text/css">
        .dialog {
            display: none; /* only this style is required */
            width: 400px;
            padding: 20px;
            box-shadow: 0px 0px 20px #5C5C5C;
            background: #FFF;
        }
    </style>
    ...
    <div class="dialog" id="info-popup"> ... dialog content ... </div>

Define the main content holder

    animo.popuplize.content(".container");

Decide if you want to use overlay or not

    animo.popuplize.useCover = true; // true by default

Showing the popup

    animo.popuplize.show("#info-popup");

You can also supply a jquery object. It is not necessary to have the object in DOM. If it is not added animo will do that for you.

    var popup = $('<div class="dialog"> ... dialog content ... </div>');
    animo.popuplize.show(popup);

Hide the popup

    animo.popuplize.hide("#info-popup");

or 

    var popup = $('<div class="dialog"> ... dialog content ... </div>');
    animo.popuplize.hide(popup);


###### Inspired by
- [https://github.com/visionmedia/move.js](https://github.com/visionmedia/move.js)
- [https://github.com/daneden/animate.css](https://github.com/daneden/animate.css)
- [http://hakim.se/](http://hakim.se/)