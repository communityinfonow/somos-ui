import {
    languageStore
} from "@/store.js";

export const translate = {
    data() {
        return {
            language: languageStore.state.language,
        }
    },
    methods: {
        translateText(textObject) {
            return textObject[this.language];
        }
    }
}