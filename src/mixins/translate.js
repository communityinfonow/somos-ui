import {
    languageStore
} from "@/store.js";


export default {
    data() {
        return {
            languageStoreState: languageStore.state,
        }
    },
    methods: {
        translateText(textObject) {
            return textObject[this.language];
        }
    },
    computed: {
        language() {
            return this.languageStoreState.languageCode;
        }
    }
}