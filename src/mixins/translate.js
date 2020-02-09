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
        translateText(textArray) {
            return textArray.map(text => text[this.language]);
        }
    }
}