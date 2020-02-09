export const userDataStore = {
    state: {
        address: null,
        tract: null,
        links: null,
        counterpartRank: 1

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
            if (this.state.counterpartRank - 1 < this.state.tract.matchedTracts.length - 1) {
                this.state.counterpartRank++;
            } else {
                this.resetCounterpart();
            }
        }
    },
    resetCounterpart() {
        this.state.counterpartRank = 1;
    },
    getMatch() {
        return this.state.tract && this.state.tract.matchedTracts ? this.state.tract.matchedTracts.find(matched => matched.rank === this.values.counterpartRank) : null
    }
}