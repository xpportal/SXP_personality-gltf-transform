const { Document, NodeIO, WebIO } = require('@gltf-transform/core');
const { KHRONOS_EXTENSIONS } = require('@gltf-transform/extensions');
const { Extension, ExtensionProperty, PropertyType, WriterContext } = require('@gltf-transform/core');

class Personality extends Extension {
    extensionName = 'EXT_personality';
    static EXTENSION_NAME = 'EXT_personality';
    /** Creates a new Emitter property, for use on a Node. */
    createPersonality(name = 'myNode') {
        return new PersonalityProps(this.document.getGraph());
    }

    /** See https://github.com/donmccurdy/glTF-Transform/blob/main/packages/core/src/io/reader-context.ts */
    read(context) {
        throw new Error('EXT_personality: read() not implemented');
    }

    /** See https://github.com/donmccurdy/glTF-Transform/blob/main/packages/core/src/io/writer-context.ts */
    write(context) {
		let agent;
		let spellName;
		let host;
		let defaultMessage;
		this.properties.forEach(value => {
			agent = value.agent;
			spellName = value.spellName;
			host = value.host;
			defaultMessage = value.defaultMessage;
	
			console.log(value.agent);
			console.log(value['agent']);

			// console.log("set", value);
		});
		for (const node of this.document.getRoot().listNodes()) { 
            if (node.getExtension("EXT_personality")) { 
                const nodeDef = context.jsonDoc.json.nodes[context.nodeIndexMap.get(node)]; 
                nodeDef.extensions = nodeDef.extensions || {};
                nodeDef.extensions["EXT_personality"] = { 
					agent: agent,
					spellName : spellName,
					host : host,
					defaultMessage : defaultMessage,
				}; 
            } 
        } 
        return this; 
    }
}

class PersonalityProps extends ExtensionProperty {
    static EXTENSION_NAME = 'EXT_personality';
    static PROPERTY = 'someprop';

    init() {
        this.extensionName = 'EXT_personality';
        this.propertyType = 'PersonalityProps';
        this.parentTypes = [PropertyType.NODE];
		this.agent = "tubby";
		this.spellName = "complexQuery";
		this.host = "https://localhost:8001";
		this.defaultMessage = "nya nya!";
    }

    getDefaults() {
		console.log("Personality come on!!");

        return Object.assign(super.getDefaults(), {
			agent: "tubby",
			spellName: "complexQuery",
			host: "https://localhost:8001",
			defaultMessage: "nya nya!",
		});
    }
}

async function main() {
		console.log(Personality);
	// Register extensions.
	const io = new NodeIO()
		.registerExtensions([...KHRONOS_EXTENSIONS, Personality]);

	// Get the input file path from the command line argument.
	const inputFile = process.argv[2];

	// Merge documents.
	const document = new Document();
	document.merge(await io.read(inputFile));
	const node = document.createNode(process.argv[3])
	const emitterExtension = document.createExtension(Personality);
	const emitter = emitterExtension.createPersonality('tubby', process.argv[3], process.argv[4], process.argv[5], process.argv[6]);
	emitter.agent = process.argv[3];
	emitter.spellName = process.argv[4];
	emitter.host = process.argv[5];
	emitter.defaultMessage = process.argv[6];
	node.setExtension('EXT_personality', emitter);

	// (Optional) Merge buffers.
	const buffer = document.getRoot().listBuffers()[0];
	document.getRoot()
		.listAccessors()
		.forEach((a) => a.setBuffer(buffer));
	document.getRoot()
		.listBuffers()
		.forEach((b, index) => (index > 0 ? b.dispose() : null));

	// Write the output file to the current directory.
	const outputFile = 'output.glb';
	await io.write(outputFile, document);
}

main();

