import {
    userDataStore
} from "@/components/public/user-data/userDataStore";
import photoData from "@/api/photo-data.js";
import translate from "@/mixins/translate";



export default {
    mixins: [translate],
    data() {
        return {
            tractPhotos: [],
            matchedTractPhotos: [],
            commonIndicatorsTitle: {
                en: "YOUR NEIGHBORHOODS HAVE A LOT IN COMMON. TAKE A LOOK.",
                es: "SUS VECINDARIOS TIENEN MUCHO EN COMÚN. ECHÉ UN VISTAZO."
            },
            differentIndicatorsParagraph: {
                en: "Your neighborhoods have other differences, too. The differences may not directly cause the life expectancy gap you’re seeing. Local data tells us, though, that there’s a relationship between these issues and a neighborhood’s average life expectancy.",
                es: "Sus vecindarios también tienen otras diferencias. Las diferencias pueden no causar directamente la diferencia en los años de vida que está viendo. Sin embargo, los datos locales nos dicen que existe una relación entre estos problemas y el promedio de longevidad de un vecindario."
            },
        }
    },
    methods: {
        getPhotos(tract) {
            if (tract) {
                photoData.get(
                    tract._links.photos.href,
                    response => {
                        this.tractPhotos = response;
                    },
                    error => {
                        return [];
                    }
                );
            }
        },
        getMatchedTractPhotos(tract) {
            if (tract) {
                photoData.get(
                    tract._links.photos.href,
                    response => {
                        this.matchedTractPhotos = response;
                    },
                    error => {
                        return [];
                    }
                );
            }
        }
    },
    computed: {
        tract() {
            return userDataStore.state.tract;
        },
        matchedTract() {
            return userDataStore.getMatchedTract();
        },
        commonData() {
            return this.matchedTract ?
                this.matchedTract.similarIndicators.sort((a, b) => a.rank - b.rank) : [];
        },
        differenceData() {
            return this.matchedTract ?
                this.matchedTract.dissimilarIndicators.sort((a, b) => a.rank - b.rank) : [];
        },

        lifeExpectancy() {
            return this.matchedTract ?
                parseFloat(this.matchedTract.lifeExpectancyDifference.toFixed(1)) :
                null;
        }
    },
    watch: {
        tract(newTract) {
            this.tractPhotos = [];
            this.getPhotos(newTract);
        },
        matchedTract(newTract) {
            this.matchedTractPhotos = [];
            this.getMatchedTractPhotos(newTract);
        }
    },
}