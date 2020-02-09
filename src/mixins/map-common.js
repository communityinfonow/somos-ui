import boundaries from "@/components/public/shared/map/Boundaries";
import censusTractApi from "@/api/census-tracts";


export const mapCommon = {
    data() {
        return {
            censusTracts: null,
            iconSize: [25, 41],
            iconUrl: "./assets/map-marker.png"
        }
    },
    methods: {
        setCensusTracts(tracts) {
            this.censusTracts = tracts;
        },
        getCensusTracts(url) {
            censusTractApi.getMulti(url, censusTracts => {
                this.setCensusTracts(censusTracts);
            });
        },
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
    },
    computed: {
        boundaryGeojson() {
            if (this.censusTracts) {
                return boundaries(false).generate(this.censusTracts);
            }
            return null;
        }
    }
}