export const mapCommon = {
    data() {
        return {
            iconSize: [25, 41],
            iconUrl: "./assets/map-marker.png"

        }
    },
    methods: {

        calculateIconAnchor(width, height, justify = "center") {
            let x = null;

            switch (justify) {
                case "right":
                    x = width;
                    break;
                case "left":
                    x = 0;
                    break;
                default:
                    x = width / 2
                    break;
            }
            return [x, height];
        }
    }

}