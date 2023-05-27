//DRAFT
const { Document, Extension, ExtensionProperty, PropertyType, WriterContext, ReaderContext } = require('@gltf-transform/core');

class VRMExtension extends Extension {
    extensionName = 'VRM';
    static EXTENSION_NAME = 'VRM';

    createVRM(name = '') {
        return new VRMProps(this.document.getGraph(), name);
    }

    read(context) {
        const jsonDoc = context.jsonDoc;
        const vrmExtensions = jsonDoc.json.extensions && jsonDoc.json.extensions.VRM;
        if (!vrmExtensions) return;

        this.doc.getRoot().listNodes().forEach((node) => {
            const vrmProps = new VRMProps(this.doc.getGraph());
            const humanoid = vrmExtensions.humanoid;

            if (humanoid) {
                vrmProps.humanoid = new Humanoid(this.doc.getGraph()).copy(humanoid);
            }    
            vrmProps.exporterVersion = vrmExtensions.exporterVersion;

            const meta = vrmExtensions.meta;
            if (meta) {
                vrmProps.meta = new Meta(this.doc.getGraph()).copy(meta);
            }

            // handle humanoid, firstPerson, etc... here
            node.setExtension(VRMProps.EXTENSION_NAME, vrmProps);
        });
    }

    write(context) {
        const { jsonDoc } = context;
        const jsonRoot = jsonDoc.getRoot();

        this.doc.getRoot().listNodes().forEach((node) => {
            const vrmProps = node.getExtension(VRMProps.EXTENSION_NAME);
            if (!vrmProps) return;

            const jsonNode = jsonRoot.nodes[jsonDoc.nodeIndexMap[node.getIndex()]];
            jsonNode.extensions = jsonNode.extensions || {};
            jsonNode.extensions[VRMProps.EXTENSION_NAME] = vrmProps.serialize();
        });
    }
}

class VRMProps extends ExtensionProperty {
    static EXTENSION_NAME = 'VRM';

    init() {
        this.extensionName = 'VRM';
        this.propertyType = 'VRM';
        this.parentTypes = [PropertyType.NODE];
        this.humanoid = null;

        this.exporterVersion = '';
        this.meta = null;
    }

    serialize() {
        return {
            exporterVersion: this.exporterVersion,
            meta: this.meta ? this.meta.serialize() : null,
            humanoid: this.humanoid ? this.humanoid.serialize() : null,
        };
    }
}

class Meta extends ExtensionProperty {
    static PROPERTY_NAME = 'meta';

    init() {
        this.propertyType = Meta.PROPERTY_NAME;
        this.title = '';
        this.version = '';
        this.author = '';
        this.contactInformation = '';
        this.reference = '';
        this.texture = 0;
        this.allowedUserName = '';
        this.violentUssageName = '';
        this.sexualUssageName = '';
        this.commercialUssageName = '';
        this.otherPermissionUrl = '';
        this.licenseName = '';
        this.otherLicenseUrl = '';
    }

    copy({ title, version, author, contactInformation, reference, texture, allowedUserName, violentUssageName, sexualUssageName, commercialUssageName, otherPermissionUrl, licenseName, otherLicenseUrl }) {
        this.title = title;
        this.version = version;
        this.author = author;
        this.contactInformation = contactInformation;
        this.reference = reference;
        this.texture = texture;
        this.allowedUserName = allowedUserName;
        this.violentUssageName = violentUssageName;
        this.sexualUssageName = sexualUssageName;
        this.commercialUssageName = commercialUssageName;
        this.otherPermissionUrl = otherPermissionUrl;
        this.licenseName = licenseName;
        this.otherLicenseUrl = otherLicenseUrl;
    }

    serialize() {
        return {
            title: this.title,
            version: this.version,
            author: this.author,
            contactInformation: this.contactInformation,
            reference: this.reference,
            texture: this.texture,
            allowedUserName: this.allowedUserName,
            violentUssageName: this.violentUssageName,
            sexualUssageName: this.sexualUssageName,
            commercialUssageName: this.commercialUssageName,
            otherPermissionUrl: this.otherPermissionUrl,
            licenseName: this.licenseName,
            otherLicenseUrl: this.otherLicenseUrl,
        };
    }
}

class Humanoid extends ExtensionProperty {
    static PROPERTY_NAME = 'humanoid';

    init() {
        this.propertyType = Humanoid.PROPERTY_NAME;
        this.humanBones = []; // To be filled with specific bone data
        this.armStretch = 0.0;
        this.legStretch = 0.0;
        this.upperArmTwist = 0.0;
        this.lowerArmTwist = 0.0;
        this.upperLegTwist = 0.0;
        this.lowerLegTwist = 0.0;
        this.feetSpacing = 0.0;
        this.hasTranslationDoF = false;
    }

    copy({ humanBones, armStretch, legStretch, upperArmTwist, lowerArmTwist, upperLegTwist, lowerLegTwist, feetSpacing, hasTranslationDoF }) {
        this.humanBones = humanBones; // You might need to process this further depending on the bone schema
        this.armStretch = armStretch;
        this.legStretch = legStretch;
        this.upperArmTwist = upperArmTwist;
        this.lowerArmTwist = lowerArmTwist;
        this.upperLegTwist = upperLegTwist;
        this.lowerLegTwist = lowerLegTwist;
        this.feetSpacing = feetSpacing;
        this.hasTranslationDoF = hasTranslationDoF;
    }
    
    serialize() {
        return {
            humanBones: this.humanBones,
            armStretch: this.armStretch,
            legStretch: this.legStretch,
            upperArmTwist: this.upperArmTwist,
            lowerArmTwist: this.lowerArmTwist,
            upperLegTwist: this.upperLegTwist,
            lowerLegTwist: this.lowerLegTwist,
            feetSpacing: this.feetSpacing,
            hasTranslationDoF: this.hasTranslationDoF,
        };
    }
}
