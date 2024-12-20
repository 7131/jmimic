// Controller class
const Controller = function() {
    window.addEventListener("load", this._initialize.bind(this));
}

// Controller prototype
Controller.prototype = {

    // initialize the private fields
    "_initialize": function(e) {
        // DOM elements
        this._facade = new jmotion.Facade("#board");
        this._pattern = document.getElementById("pattern");
        this._startButton = document.getElementById("start");
        this._stopButton = document.getElementById("stop");
        this._restartButton = document.getElementById("restart");

        // control settings
        this._setShapes(this._facade);
        this._setStatus();

        // button events
        this._startButton.addEventListener("click", this._start.bind(this));
        this._stopButton.addEventListener("click", this._stop.bind(this));
        this._restartButton.addEventListener("click", this._restart.bind(this));
    },

    // "Start" button process
    "_start": function(e) {
        this._facade.startJuggling(this._pattern.value);
        this._setStatus();
    },

    // "Stop" button process
    "_stop": function(e) {
        this._facade.stopJuggling();
        this._setStatus();
    },

    // "Restart" button process
    "_restart": function(e) {
        this._facade.startJuggling();
        this._setStatus();
    },

    // set the shapes
    "_setShapes": function(facade) {
        // body
        const body = [
            document.getElementById("shape_head_use"),
        ];

        // hands
        const hands = [
            document.getElementById("shape_right_use"),
            document.getElementById("shape_left_use"),
        ];

        // props
        const props = [
            document.getElementById("shape_ball"),
        ];

        // setting
        facade.animator.core.setBody(body);
        facade.animator.core.setArms([]);
        facade.animator.core.setHands(hands);
        facade.animator.core.setProps(props);
        facade.creator.offset.right = { "x": 5, "y": -10 };
        facade.creator.offset.left = { "x": -5, "y": -10 };
    },

    // set the status
    "_setStatus": function() {
        // buttons
        const status = this._facade.animator.getStatus();
        const running = status.running;
        const runnable = running || !status.runnable;
        this._startButton.disabled = running;
        this._stopButton.disabled = !running;
        this._restartButton.disabled = runnable;
    },

}

// start the controller
new Controller();

