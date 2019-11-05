import {
    location,
    coordinates
}
from "./Location";

export const store = {
    state: {
        addressSearchString: null,
        isDoneTyping: null,
        addressSearchType: null,
        searchResults: [],
        selectedLocation: new location(null, new coordinates(null, null)),
        contactFirstName: null,
        contactLastName: null,
        contactEmail: null,
        photos: [],
        censusTracts: [],
        boundaries: [],
        dataFeatures: []
    },
    clearSearchString() {
        this.state.addressSearchString = null;
    },
    updateSearchString(input) {
        this.state.addressSearchString = input;
    },
    updateTypingTracker(isDone) {
        this.state.isDoneTyping = isDone;
    },
    setAddressSearchType(type) {
        this.state.addressSearchType = type;
    },
    setSelectedLocation(location) {
        this.state.selectedLocation = location;
    },
    setSelectedLocationTract(tract) {
        this.state.selectedLocation.tract = tract;
    },
    setContactFirstName(firstName) {
        this.state.contactFirstName = firstName;
    },
    setContactLastName(lastName) {
        this.state.contactLastName = lastName;
    },
    setContactEmail(email) {
        this.state.contactLastName = email;
    },
    setPhotos(photos) {
        this.state.photos = photos;
    },
    setSearchResults(results) {
        this.state.searchResults = results;
    },
    setCensusTracts(censusTracts) {
        this.state.censusTracts = censusTracts;
    },
    setBoundaries(boundaries) {
        this.state.boundaries = boundaries;
    },
    setDataFeatures(dataFeatures) {
        this.state.dataFeatures = dataFeatures;
    }
};