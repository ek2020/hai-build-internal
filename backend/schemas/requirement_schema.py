from marshmallow import Schema, fields


class UpdateRequirementSchema(Schema):
    updatedReqt = fields.String(required=False)
    fileContent = fields.String(required=False)
    contentType = fields.String(required=True)
    title = fields.String(required=False)
    id = fields.String(required=True)
    reqId = fields.String(required=True)
    reqDesc = fields.String(required=True)
    name = fields.String(required=True)
    description = fields.String(required=True)
    useGenAI = fields.Boolean(required=True)


class AddRequirementSchema(Schema):
    reqt = fields.String(required=False)
    fileContent = fields.String(required=False)
    title = fields.String(required=False)
    contentType = fields.String(required=True)
    id = fields.String(required=True)
    addReqtType = fields.String(required=True)
    name = fields.String(required=True)
    description = fields.String(required=True)
    useGenAI = fields.Boolean(required=True)
