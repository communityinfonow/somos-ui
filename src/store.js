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
        selectedLocation: new location(null, null, new coordinates(null, null)),
        contactFirstName: null,
        contactLastName: null,
        contactEmail: null,
        photo: null,
        censusTracts: [],
        boundaries: [],
        dataFeatures: [],
        photoDescription: null
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
    setPhotoDescription(photoDescription) {
        this.state.photoDescription = photoDescription;
    },
    clearSelectedLocation() {
        this.state.selectedLocation = new location(null, null, new coordinates(null, null));
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
    setPhoto(photo) {
        this.state.photo = photo;
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