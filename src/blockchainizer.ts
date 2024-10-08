import * as NodeRed from "node-red";
import { NodeMessage, NodeMessageInFlow } from "node-red";
import NodeRedNode, { EditorConfig } from "node-red-es6-shim";
import util from "util";

type Defaults = EditorConfig["defaults"];

export interface BlockchainizerDefaults extends Defaults {
    name: { value: string }
}
type ExtendedConfigKeys = {
    [K in keyof BlockchainizerDefaults]: BlockchainizerDefaults[K]["value"];
}
export interface BlockchainizerConfig extends NodeRed.NodeDef, ExtendedConfigKeys {}

export class Blockchainizer extends NodeRedNode {
    private readonly RED: NodeRed.NodeAPI;
    private readonly config: BlockchainizerConfig;
    constructor(node: NodeRed.Node, config: BlockchainizerConfig, RED: NodeRed.NodeAPI) {
        super(node);
        this.config = config;
        this.RED = RED;
        this.initialize();
    }
    initialize() {
        this.on("input", this.handleMessage);
    }
    handleMessage(msg: NodeMessageInFlow, send: (msg: NodeMessage | Array<NodeMessage | NodeMessage[] | null>) => void, done: (err?: Error) => void): void {
        const newMsg = {
            ...msg,
            topic: "Hello World"
        };
        send(newMsg);
        if (done) { done(); }
    }
}

module.exports = function(RED: NodeRed.NodeAPI) {
    function MakeNode(this: NodeRed.Node, config: BlockchainizerConfig) {
        RED.nodes.createNode(this, config);
        util.inherits(Blockchainizer, this.constructor);
        return new Blockchainizer(this, config, RED);
    }
    RED.nodes.registerType("@statuscompliance/blockchainizer-node-blockchainizer", MakeNode);
};

export default module.exports;
module.exports.Blockchainizer = Blockchainizer;