import boundaries from "@/components/public/shared/map/Boundaries";
import censusTractApi from "@/api/census-tracts";

export default {
    data() {
        return {
            boundaryGeojson: null,
            censusTracts: null,
            displayTracts: false

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
        }
    },
    watch: {
        censusTracts() {
            if (this.censusTracts) {
                this.boundaryGeojson = boundaries(this.displayTracts).generate(this.censusTracts);
            }

        }
    }
}