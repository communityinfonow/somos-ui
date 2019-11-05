export const location = function (name, id, coordinates) {
    return {
        name: name,
        id: id,
        coordinates: coordinates
    }
};

export const coordinates = function (lat, lng) {
    return {
        lat: lat,
        lng: lng
    }
};