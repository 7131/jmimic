// Controller class
const Controller = function() {
    window.addEventListener("load", this._initialize.bind(this), false);
}

// Controller prototype
Controller.prototype = {

    // initialize the private fields
    "_initialize": function(e) {
        // DOM elements
        this._facade = new jmotion.Facade(document.getElementById("board"));
        this._pattern = document.getElementById("pattern");
        this._startButton = document.getElementById("start");
        this._stopButton = document.getElementById("stop");
        this._restartButton = document.getElementById("restart");

        // control settings
        this._setShapes(this._facade);
        this._setStatus();

        // button events
        this._startButton.addEventListener("click", this._start.bind(this), false);
        this._stopButton.addEventListener("click", this._stop.bind(this), false);
        this._restartButton.addEventListener("click", this._restart.bind(this), false);
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
            document.getElementById("shape_head"),
            document.getElementById("shape_body"),
        ];

        // arms
        this._arms = [
            document.getElementById("shape_right_lower"),
            document.getElementById("shape_right_upper"),
            document.getElementById("shape_left_lower"),
            document.getElementById("shape_left_upper"),
        ];
        this._weight = parseInt(this._arms[0].getAttribute("stroke-width"), 10) || 1;
        const arms = [
            [
                this._arms[0],
                this._arms[1],
            ],
            [
                this._arms[2],
                this._arms[3],
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
                document.getElementById("orbit_right_hand_0"),
                document.getElementById("orbit_right_elbow_0"),
            ],
            [
                document.getElementById("orbit_right_hand_1"),
                document.getElementById("orbit_right_elbow_1"),
            ],
        ];
        const left = [
            [
                document.getElementById("orbit_left_hand_0"),
                document.getElementById("orbit_left_elbow_0"),
            ],
            [
                document.getElementById("orbit_left_hand_1"),
                document.getElementById("orbit_left_elbow_1"),
            ],
        ];

        // setting
        facade.animator.core.setBody(body);
        facade.animator.core.setArms(arms);
        facade.animator.core.setHands(hands, facade.animator.core.back);
        facade.creator.offset.right = { "x": 8, "y": -8 };
        facade.creator.offset.left = { "x": -8, "y": -8 };
        facade.creator.paths.right = right;
        facade.creator.paths.left = left;
        const balls = Array.from(facade.animator.core.defs.children).filter(elem => elem instanceof SVGCircleElement);
        balls.forEach(elem => elem.setAttribute("r", 20));
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

        // arm thickness
        this._arms.forEach(elem => elem.setAttribute("stroke-width", this._weight));
    },

}

// start the controller
new Controller();

