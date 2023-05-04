const { Document, NodeIO, WebIO } = require('@gltf-transform/core');
const { KHRONOS_EXTENSIONS } = require('@gltf-transform/extensions');
const { Extension, ExtensionProperty, PropertyType, WriterContext } = require('@gltf-transform/core');

class Personality extends Extension {
    extensionName = 'OMI_personality';
    static EXTENSION_NAME = 'OMI_personality';

    createPersonality(name = 'myNode') {
        return new PersonalityProps(this.document.getGraph());
    }

    read(context) {
        throw new Error('OMI_personality: read() not implemented');
    }

    write(context) {
        let agent;
        let personality;
        let defaultMessage;
        this.properties.forEach(value => {
            agent = value.agent;
            personality = value.personality;
            defaultMessage = value.defaultMessage;

            console.log(value.agent);
            console.log(value['agent']);
        });
        for (const node of this.document.getRoot().listNodes()) { 
            if (node.getExtension("OMI_personality")) { 
                const nodeDef = context.jsonDoc.json.nodes[context.nodeIndexMap.get(node)]; 
                nodeDef.extensions = nodeDef.extensions || {};
                nodeDef.extensions["OMI_personality"] = { 
                    agent: agent,
                    personality : personality,
                    defaultMessage : defaultMessage,
                }; 
            } 
        } 
        return this; 
    }
}

class PersonalityProps extends ExtensionProperty {
    static EXTENSION_NAME = 'OMI_personality';
    static PROPERTY = 'someprop';

    init() {
        this.extensionName = 'OMI_personality';
        this.propertyType = 'PersonalityProps';
        this.parentTypes = [PropertyType.NODE];
        this.agent = "tubby";
        this.personality = "#agent is cheery";
        this.defaultMessage = "nya nya!";
    }

    getDefaults() {
        return Object.assign(super.getDefaults(), {
            agent: "tubby",
            personality: "#agent is cheery",
            defaultMessage: "nya nya!",
        });
    }
}

async function main() {
    const io = new NodeIO()
        .registerExtensions([...KHRONOS_EXTENSIONS, Personality]);

    const inputFile = process.argv[2];

    const document = new Document();
    document.merge(await io.read(inputFile));
    const node = document.createNode(process.argv[3])
    const emitterExtension = document.createExtension(Personality);
    const emitter = emitterExtension.createPersonality(process.argv[3], process.argv[4], process.argv[5]);
    emitter.agent = process.argv[3];
    emitter.personality = process.argv[4];
    emitter.defaultMessage = process.argv[5];
    node.setExtension('OMI_personality', emitter);

    const buffer = document.getRoot().listBuffers()[0];
    document.getRoot()
        .listAccessors()
        .forEach((a) => a.setBuffer(buffer));
    document.getRoot()
        .listBuffers()
        .forEach((b, index) => (index > 0 ? b.dispose() : null));

    const outputFile = 'output.glb';
    await io.write(outputFile, document);
}

main();