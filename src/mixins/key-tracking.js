const timeoutLength = 2000; //ms

var timeout = null;

export const keyTracking = {
    data() {
        return {
            isDoneTyping: false
        }
    },
    created: function () {
        window.addEventListener("keyup", this.keyupHandler)
        window.addEventListener("keydown", this.keydownHandler);
    },
    methods: {
        keyupHandler() {
            timeout = setTimeout(() => {
                this.isDoneTyping = true
            }, timeoutLength);
        },
        keydownHandler() {
            clearTimeout(timeout);
            this.isDoneTyping = false;
        }
    }
};