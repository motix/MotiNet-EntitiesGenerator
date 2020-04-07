import axios from "axios";

export default class KeepAlive {
    constructor() {
        this.interval = null;
    }

    start() {
        if (this.interval !== null) {
            return;
        }

        this.interval = window.setInterval(function () {
            axios.get('/api/Alive');
        }, 300000); // 5 mins
    }

    stop() {
        if (this.interval) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    }
}