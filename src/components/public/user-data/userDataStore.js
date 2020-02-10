export const userDataStore = {
    state: {
        address: null,
        tract: null,
        links: null,
        matchRank: 1

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
    setMatchRank(rank) {
        this.state.matchRank = rank;
    }
}