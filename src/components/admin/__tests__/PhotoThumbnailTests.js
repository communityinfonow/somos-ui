jest.mock("../../../api/photo-data", () => ({
    savePhoto: jest.fn()
}));

import Vue from "vue";
import Vuetify from "vuetify"

import {
    mount,
    shallowMount,
    createLocalVue
} from "@vue/test-utils";
import PhotoThumbnail from "../photos/PhotoThumbnail.vue";
import photoData from "../../../api/photo-data"

Vue.use(Vuetify);


const mockData = {
    photo: {
        fileName: "photo.png",
        approved: false,
        path: "",
        censusTractId: 1,
        description: "Description",
        _links: {
            self: {
                href: "http//me"
            },
            'photo-file': {
                href: "http//meFile"
            },
            'cropped-photo-file': {
                href: "http//meFile"
            }
        }
    }
}

const localVue = createLocalVue();
var vuetify;
var wrapper;
beforeAll(() => {
    vuetify = new Vuetify();
    wrapper = shallowMount(PhotoThumbnail, {
        localVue,
        vuetify,
        methods: {
            descriptionBlurHandler: jest.fn()
        },
        propsData: {
            "photoObj": mockData.photo
        },
        stubs: {
            VueCropper: true
        }
    });

});

describe("PhotoThumbnail", () => {


    test('descriptionInputExists', () => {
        expect(wrapper.contains('#description')).toBe(true);
    })

    test('editSubmissionMatches', () => {
        var descriptionInput = wrapper.find('#description');
        descriptionInput.value = "new description";
        descriptionInput.trigger('input');
        wrapper.find('.v-textarea').trigger('blur');
        expect(descriptionInput.value).toBe("new description");
        // expect(wrapper.vm.photo.description).toBe("new description");
        expect(wrapper.vm.descriptionBlurHandler).toBeCalled();
        expect(photoData.savePhoto).toBeCalledWith(wrapper.vm.selfPath, wrapper.vm.photo, expect.anything());

    })

    test.only('rotating photo scales image properly for display', () => {
        var wrapper = shallowMount(PhotoThumbnail, {
            localVue,
            vuetify,
            methods: {
                descriptionBlurHandler: jest.fn()
            },
            propsData: {
                "photoObj": mockData.photo
            }
        });
        wrapper.vm.rotate();
        expect(wrapper.vm.rotateTracker).toBe(90);
        wrapper.vm.rotate();
        expect(wrapper.vm.rotateTracker).toBe(180);
        wrapper.vm.rotate();
        expect(wrapper.vm.rotateTracker).toBe(270);
        wrapper.vm.rotate();
        expect(wrapper.vm.rotateTracker).toBe(0);
    })
})