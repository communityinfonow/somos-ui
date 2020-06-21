import {
    userDataStore
} from "@/components/public/user-data/userDataStore";
import censusTractsApi from "@/api/census-tracts";
import GeometryUtil from "leaflet-geometryutil";
import polylabel from "polylabel";
import {
    location,
    coordinates
} from "@/Location";

export default {
    data() {
        return {
            storeState: userDataStore.state,
            closestTractDialog: false,
            isClosestLocation: false,
            censusTractsLink: null
        }
    },
    computed: {
        selectedLocation() {
            return this.storeState.address;
        }
    },
    methods: {
        closeModal() {
            this.closestTractDialog = false;
        },
        selectClosestTract() {
            let closestTractLayer = GeometryUtil.closestLayer(
                this.storeState.mapObject,
                this.storeState.geojson
                .getLayers()
                .filter(layer => layer.feature && layer.feature.properties.hasData),
                this.selectedLocation.coordinates
            ).layer;
            let closestTractCentroid = polylabel(
                closestTractLayer.feature.geometry.coordinates[0],
                1.0
            );
            userDataStore.setAddress(
                new location(
                    this.selectedLocation.name,
                    this.selectedLocation.addressDetails,
                    null,
                    new coordinates(closestTractCentroid[1], closestTractCentroid[0])
                )
            );
            this.closeModal();
        },
        getContainingTract(location) {
            userDataStore.setMatchRank(1);
            censusTractsApi.getSingle(
                this.censusTractsLink +
                "/latlng/lat=" +
                location.coordinates.lat +
                ";lng=" +
                location.coordinates.lng,
                this.containingTractHandler,
                this.containingTractErrorHandler
            );
        },
        containingTractErrorHandler(error) {
            this.isClosestLocation = true;
            this.showClosestTractMessage();
        },
        containingTractHandler(response) {
            if (!this.storeState.indicatorData || (this.storeState.indicatorData && this.storeState.indicatorData.length === 0)) {
                this.noIndicatorHandler();
            } else if (
                !this.storeState.indicatorData.find(
                    tractData => response.id === tractData.censusTractId
                )
            ) {
                this.isClosestLocation = true;
                this.showClosestTractMessage();
            } else {
                this.isClosestLocation = false;

                let tract = response;
                userDataStore.setMatchRank(1);
                censusTractsApi.getMatched(
                    response._links["matched-tracts"].href,
                    response => {
                        tract.matchedTracts = response;
                        userDataStore.setTract(tract);
                    }
                );
            }
        },
        showClosestTractMessage() {
            this.closestTractDialog = true;
        },
        noIndicatorHandler() {

        }
    },
    watch: {

        selectedLocation(newLocation) {
            this.getContainingTract(newLocation);
        }
    }
}