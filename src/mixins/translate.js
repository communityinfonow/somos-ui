import {
    languageStore
} from "@/store.js";

export default {
    data() {
        return {
            storeState: languageStore.state,
        }
    },
    methods: {
        translateText(textObject) {
            return textObject[this.language];
        }
    },
    computed: {
        language() {
            return this.storeState.languageCode;
        }
    }
}