
const { Document, Extension, ExtensionProperty, PropertyType, WriterContext } = require('@gltf-transform/core');

class Personality extends Extension {
    extensionName = 'EXT_personality';
    static EXTENSION_NAME = 'EXT_personality';
    /** Creates a new Emitter property, for use on a Node. */
    createPersonality(name = '') {
        return new PersonalityProps(this.document.getGraph(), name);
    }

    /** See https://github.com/donmccurdy/glTF-Transform/blob/main/packages/core/src/io/reader-context.ts */
    read(context) {
        throw new Error('EXT_personality: read() not implemented');
    }

    /** See https://github.com/donmccurdy/glTF-Transform/blob/main/packages/core/src/io/writer-context.ts */
    write(context) {
		console.log("WRITE");
		return this;
    }
}

class PersonalityProps extends ExtensionProperty {
    static EXTENSION_NAME = 'EXT_personality';

    init() {
        this.extensionName = 'EXT_personality';
        this.propertyType = 'Personality';
        this.parentTypes = [PropertyType.NODE];
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
