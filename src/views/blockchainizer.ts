import { EditorRED } from "node-red"
import { EditorConfig } from "node-red-es6-shim";
import { BlockchainizerDefaults } from "../@statuscompliance/blockchainizer-node-blockchainizer";

declare var RED: EditorRED;
type Config = EditorConfig & { defaults: BlockchainizerDefaults };

(() => {
    const config: Config = {
        category: "Unknown",
        color: "#b7b7b7",
        defaults: {
            name: { value: "My Node" }
        },
        icon: "home.svg",
        align: "left",
        inputs: 1,
        outputs: 1,
        label: function() { return this.name || this._("@statuscompliance/blockchainizer-node-blockchainizer.node.label"); },
        paletteLabel: function() { return this._("@statuscompliance/blockchainizer-node-blockchainizer.node.label"); },
        inputLabels: function() { return this._("@statuscompliance/blockchainizer-node-blockchainizer.node.input"); },
        outputLabels: function() { return this._("@statuscompliance/blockchainizer-node-blockchainizer.node.output"); },
        button: {
            onclick: function() {
                RED.notify("Button clicked!");
            }
        }
    };

    RED.nodes.registerType("@statuscompliance/blockchainizer-node-blockchainizer", config);
})();