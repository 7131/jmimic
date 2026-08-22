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
        const result = jmotion.Siteswap.analyze(this.#pattern.value);
        if (!result.valid) {
            return;
        }

        // create coordinate list
        const table = jmotion.Siteswap.separate(result.throws, result.sync);
        const orbits = this.#facade.generator.calculateOrbits(table, result.sync, result.throws);
        this.#facade.animator.props = orbits.props;
        this.#facade.animator.arms = orbits.arms.map(elem => [ elem, elem ]).flat();
        this.#facade.animator.core.scale = this.#facade.generator.scale;
        this.#weight.forEach((val, idx) => this.#arms[idx].forEach(elem => elem.setAttribute("stroke-width", val)));

        // start animation
        this.#facade.animator.index = 0;
        this.#facade.animator.start(1);
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
        const rarm = new Array(2).fill().map(() => []);
        const larm = new Array(2).fill().map(() => []);
        for (let i = 0; i < rarm.length; i++) {
            for (let j = 0; j < 2; j++) {
                rarm[i].push(document.getElementById(`shape_right_${i}${j}`));
                larm[i].push(document.getElementById(`shape_left_${i}${j}`));
            }
        }
        this.#arms = [
            [ rarm[0], larm[0] ].flat(),
            [ rarm[1], larm[1] ].flat(),
        ];
        this.#weight = [
            parseInt(rarm[0][0].getAttribute("stroke-width"), 10),
            parseInt(rarm[1][0].getAttribute("stroke-width"), 10),
        ];

        // hands
        const dummy = document.getElementById("shape_dummy_hand");
        const hands = [
            document.getElementById("shape_right_use"), dummy,
            document.getElementById("shape_left_use"), dummy,
        ];

        // orbits
        const rorbit = [
            [
                document.getElementById("orbit_right_hand_0"),
                document.getElementById("orbit_right_elbow_0"),
            ],
            [
                document.getElementById("orbit_right_hand_1"),
                document.getElementById("orbit_right_elbow_1"),
            ],
        ];
        const lorbit = [
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
        facade.animator.core.setArms(rarm.concat(larm));
        facade.animator.core.setHands(hands, facade.animator.core.back);
        facade.generator.offset.right = { "x": 8, "y": -8 };
        facade.generator.offset.left = { "x": -8, "y": -8 };
        facade.generator.paths.right = rorbit;
        facade.generator.paths.left = lorbit;
        const balls = Array.from(facade.animator.core.defs.children).filter(elem => elem instanceof SVGCircleElement);
        balls.forEach(elem => elem.setAttribute("r", 20));
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

