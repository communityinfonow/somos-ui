export const userDataStore = {
    state: {
        address: null,
        tract: null,
        links: null,
        matchRank: 1,
        neighborhoodData: null,
        matchData: null,
        lifeExpectancyIndicator: null

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
    },
    setNeighborhoodData(data) {
        this.state.neighborhoodData = data;
    },
    setMatchData(data) {
        this.state.matchData = data;
    },
    setLifeExpectancyIndicator(indicator) {
        this.state.lifeExpectancyIndicator = indicator;
    },
    getMatchedTract() {
        return this.state.tract && this.state.tract.matchedTracts ? this.state.tract.matchedTracts.find(tract => tract.rank === this.state.matchRank) : null;
    }
}