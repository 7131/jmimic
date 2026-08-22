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

