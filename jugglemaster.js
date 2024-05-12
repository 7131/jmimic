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
            document.getElementById("board_head"),
        ];

        // arms
        const arms = [
            [
                document.getElementById("shape_right_0"),
                document.getElementById("shape_right_1"),
                document.getElementById("shape_right_2"),
                document.getElementById("shape_right_3"),
                document.getElementById("shape_right_4"),
            ],
            [
                document.getElementById("shape_left_0"),
                document.getElementById("shape_left_1"),
                document.getElementById("shape_left_2"),
                document.getElementById("shape_left_3"),
                document.getElementById("shape_left_4"),
            ],
        ];

        // hands
        const hands = [
            document.getElementById("shape_right_use"),
            document.getElementById("shape_left_use"),
        ];

        // orbits
        const right = [
            [
                document.getElementById("orbit_right_00"),
                document.getElementById("orbit_right_10"),
                document.getElementById("orbit_right_20"),
                document.getElementById("orbit_right_30"),
                document.getElementById("orbit_right_40"),
            ],
            [
                document.getElementById("orbit_right_01"),
                document.getElementById("orbit_right_11"),
                document.getElementById("orbit_right_21"),
                document.getElementById("orbit_right_31"),
                document.getElementById("orbit_right_41"),
            ],
        ];
        const left = [
            [
                document.getElementById("orbit_left_00"),
                document.getElementById("orbit_left_10"),
                document.getElementById("orbit_left_20"),
                document.getElementById("orbit_left_30"),
                document.getElementById("orbit_left_40"),
            ],
            [
                document.getElementById("orbit_left_01"),
                document.getElementById("orbit_left_11"),
                document.getElementById("orbit_left_21"),
                document.getElementById("orbit_left_31"),
                document.getElementById("orbit_left_41"),
            ],
        ];

        // setting
        facade.animator.core.setBody(body);
        facade.animator.core.setArms(arms);
        facade.animator.core.setHands(hands);
        facade.animator.core.setStyle({ "stroke": "black", "fill": "white" });
        facade.creator.offset.right = { "x": 3, "y": -10 };
        facade.creator.offset.left = { "x": -3, "y": -10 };
        facade.creator.paths.right = right;
        facade.creator.paths.left = left;
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

