// Controller class
class Controller {
    #facade;
    #pattern;
    #startButton;
    #stopButton;
    #restartButton;

    // constructor
    constructor() {
        window.addEventListener("load", this.#initialize.bind(this));
    }

    // initialize the private fields
    #initialize(e) {
        // DOM elements
        this.#facade = new jmotion.Facade("#board");
        this.#pattern = document.getElementById("pattern");
        this.#startButton = document.getElementById("start");
        this.#stopButton = document.getElementById("stop");
        this.#restartButton = document.getElementById("restart");

        // control settings
        this.#setShapes(this.#facade);
        this.#setStatus();

        // button events
        this.#startButton.addEventListener("click", this.#start.bind(this));
        this.#stopButton.addEventListener("click", this.#stop.bind(this));
        this.#restartButton.addEventListener("click", this.#restart.bind(this));
    }

    // "Start" button process
    #start(e) {
        this.#facade.startJuggling(this.#pattern.value);
        this.#setStatus();
    }

    // "Stop" button process
    #stop(e) {
        this.#facade.stopJuggling();
        this.#setStatus();
    }

    // "Restart" button process
    #restart(e) {
        this.#facade.startJuggling();
        this.#setStatus();
    }

    // set the shapes
    #setShapes(facade) {
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
        facade.generator.offset.right = { "x": 13, "y": -12 };
        facade.generator.offset.left = { "x": -13, "y": -12 };
        facade.generator.paths.right = right;
        facade.generator.paths.left = left;
    }

    // set the status
    #setStatus() {
        const status = this.#facade.animator.status;
        const running = status.running;
        const runnable = running || !status.runnable;
        this.#startButton.disabled = running;
        this.#stopButton.disabled = !running;
        this.#restartButton.disabled = runnable;
    }

}

// start the controller
new Controller();

