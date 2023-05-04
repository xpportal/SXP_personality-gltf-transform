# OMI_personality Extension with gltf-transform to use it

# Description

This extension allows users to assign personality attributes to a glTF node appended to a file. The attributes include `agent`, `personality`, and `defaultMessage`. Currently this extension is only compatible with MagickML but will be adjusted to be interoperable with others as more options are available.

Usage: 
1) `npm install`
2) `node script.js someobject.glb tubby '#agent is cheery and says nya nya a lot' 'nya nya!'`

# Extension Name

OMI_personality

# Extension Type

Node extension

# Properties

- `agent` (string) - The name of the agent assigned to the node.
- `personality` (string) - Typically a long prompt describing the character and their backstory.
- `defaultMessage` (string) - The default message for the node.

# JSON Schema

The following JSON schema defines the extension properties:
```json
{
  "definitions": {
    "OMI_personality": {
      "type": "object",
      "properties": {
        "agent": { "type": "string" },
        "personality": { "type": "string" },
        "defaultMessage": { "type": "string" }
      }
    }
  },
  "type": "object",
  "properties": {
    "extensions": {
      "type": "object",
      "properties": {
        "OMI_personality": { "$ref": "#/definitions/OMI_personality" }
      }
    }
  }
}
```
# Example

Here is an example of how the extension can be used in a glTF file:
```json
{
  "nodes": [
    {
      "name": "TubbyPet",
      "extensions": {
        "OMI_personality": {
          "agent": "tubby",
          "personality": "#agent is cheery.",
          "defaultMessage": "nya nya!"
        }
      }
    }
  ],
  "extensionsUsed": [ "OMI_personality" ]
}
```