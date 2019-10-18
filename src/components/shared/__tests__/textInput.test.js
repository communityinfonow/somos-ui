import {
    mount
} from "@vue/test-utils";
import AddressInput from "C:/Users/Joe/Documents/workspace/visualizing-healthy-lives/src/components/shared/AddressInput";

describe("AddressINput", () => {
    const wrapper = mount(AddressInput);
    const input = wrapper.find("input");

    test('default is not done typing', () => {
        expect(wrapper.vm.isDoneTyping).toBe(false);
    });

    test('is not done typing', () => {
        input.trigger("keydown.down");
        expect(wrapper.vm.isDoneTyping).toBe(false); // testing timeout
    });
})