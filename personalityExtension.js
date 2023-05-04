
const { Document, Extension, ExtensionProperty, PropertyType, WriterContext } = require('@gltf-transform/core');

class Personality extends Extension {
    extensionName = 'OMI_personality';
    static EXTENSION_NAME = 'OMI_personality';
    /** Creates a new Emitter property, for use on a Node. */
    createPersonality(name = '') {
        return new PersonalityProps(this.document.getGraph(), name);
    }

    /** See https://github.com/donmccurdy/glTF-Transform/blob/main/packages/core/src/io/reader-context.ts */
    read(context) {
        throw new Error('OMI_personality: read() not implemented');
    }

    /** See https://github.com/donmccurdy/glTF-Transform/blob/main/packages/core/src/io/writer-context.ts */
    write(context) {
		console.log("WRITE");
		return this;
    }
}

class PersonalityProps extends ExtensionProperty {
    static EXTENSION_NAME = 'OMI_personality';

    init() {
        this.extensionName = 'OMI_personality';
        this.propertyType = 'Personality';
        this.parentTypes = [PropertyType.NODE];
    }

    getDefaults() {
        return Object.assign(super.getDefaults(), {
			agent: "tubby",
			personality: "#agent is cheery",
			defaultMessage: "nya nya!",
		});
    }
}
