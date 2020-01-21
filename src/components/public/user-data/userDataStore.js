export const userDataStore = {
    values: {
        counterpartRank: 1
    },
    methods: {

    },
    state: {
        address: null,
        tract: null,
        links: null

    },
    setTract(tract) {
        this.state.tract = tract;
    },
    setAddress(address) {
        this.state.address = address;
    },
    setLinks(links) {
        this.state.links = links;
    },
    nextCounterpart() {
        if (this.state.tract) {
            if (this.values.counterpartRank - 1 <= this.state.tract.matchedTracts.length) {
                this.values.counterpartRank++;
            } else {
                this.resetCounterpart();
            }
        }
    },
    resetCounterpart() {
        this.values.counterpartRank = 1;
    },
    getCounterpart() {
        return this.state.tract && this.state.tract.matchedTracts ? this.state.tract.matchedTracts.find(matched => matched.rank === this.values.counterpartRank) : null
    }
}