# Personality Extension with gltf-transform to use it


# Description

This extension allows users to assign personality attributes to a glTF node appended to a file. The attributes include `agent`, `spellName`, `host`, and `defaultMessage`. Currently this extension is only compatible with MagickML but will be adjusted to be interoperable with others as more options are available.

Usage: 
1) `npm install`
2) `node script.js someobject.glb tubby complexQuery https://localhost:8001 'nya nya!'`

# Extension Name

EXT_personality

# Extension Type

Node extension

# Properties

- `agent` (string) - The name of the agent assigned to the node.
- `spellName` (string) - The name of the spell assigned to the node.
- `host` (string) - The host URL for the node.
- `defaultMessage` (string) - The default message for the node.

# JSON Schema

The following JSON schema defines the extension properties:
```json
{
  "definitions": {
    "EXT_personality": {
      "type": "object",
      "properties": {
        "agent": { "type": "string" },
        "spellName": { "type": "string" },
        "host": { "type": "string" },
        "defaultMessage": { "type": "string" }
      }
    }
  },
  "type": "object",
  "properties": {
    "extensions": {
      "type": "object",
      "properties": {
        "EXT_personality": { "$ref": "#/definitions/EXT_personality" }
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
        "EXT_personality": {
          "agent": "tubby",
          "spellName": "complexQuery",
          "host": "https://localhost:8001",
          "defaultMessage": "nya nya!"
        }
      }
    }
  ],
  "extensionsUsed": [ "EXT_personality" ]
}
```