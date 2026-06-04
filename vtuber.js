// Controller class
class Controller {
    #facade;
    #pattern;
    #startButton;
    #stopButton;
    #restartButton;
    #arms;
    #weight;

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
            document.getElementById("shape_head"),
            document.getElementById("shape_body"),
        ];

        // arms
        this.#arms = [
            document.getElementById("shape_right_lower"),
            document.getElementById("shape_right_upper"),
            document.getElementById("shape_left_lower"),
            document.getElementById("shape_left_upper"),
        ];
        this.#weight = parseInt(this.#arms[0].getAttribute("stroke-width"), 10) || 1;
        const arms = [
            [
                this.#arms[0],
                this.#arms[1],
            ],
            [
                this.#arms[2],
                this.#arms[3],
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
    }

    // set the status
    #setStatus() {
        // buttons
        const status = this.#facade.animator.getStatus();
        const running = status.running;
        const runnable = running || !status.runnable;
        this.#startButton.disabled = running;
        this.#stopButton.disabled = !running;
        this.#restartButton.disabled = runnable;

        // arm thickness
        this.#arms.forEach(elem => elem.setAttribute("stroke-width", this.#weight));
    }

}

// start the controller
new Controller();

