from marshmallow import Schema, fields, validate


class CreateUserStorySchema(Schema):
    reqDesc = fields.String(required=True)

class AddUserStorySchema(Schema):
    appId = fields.String(required=True)
    name = fields.String(required=True, validate=validate.Length(min=1, error="App Name must not be empty"))
    description = fields.String(required=True, validate=validate.Length(min=1, error="App Description must not be empty"))
    reqId = fields.String(required=True, validate=validate.Length(min=1, error="Product requirement Id must not be empty"))
    reqDesc = fields.String(required=True, validate=validate.Length(min=1, error="Product requirement must not be empty"))
    featureId = fields.String(required=True, validate=validate.Length(min=1, error="Feature id must not be empty"))
    featureRequest = fields.String(required=True, validate=validate.Length(min=1, error="Feature request must not be empty"))
    contentType = fields.String(required=True)
    fileContent = fields.String(required=True)
    useGenAI = fields.Boolean(required=True)

class UpdateUserStorySchema(Schema):
    appId = fields.String(required=True)
    name = fields.String(required=True, validate=validate.Length(min=1, error="App Name must not be empty"))
    description = fields.String(required=True, validate=validate.Length(min=1, error="App Description must not be empty"))
    reqId = fields.String(required=True, validate=validate.Length(min=1, error="Product requirement Id must not be empty"))
    reqDesc = fields.String(required=True, validate=validate.Length(min=1, error="Product requirement must not be empty"))
    featureId = fields.String(required=True, validate=validate.Length(min=1, error="Feature id must not be empty"))
    featureRequest = fields.String(required=True, validate=validate.Length(min=1, error="Feature request must not be empty"))
    existingFeatureTitle = fields.String(required=True, validate=validate.Length(min=1, error="Existing feature title must not be empty"))
    existingFeatureDesc = fields.String(required=True)
    contentType = fields.String(required=True)
    fileContent = fields.String(required=True)
    useGenAI = fields.Boolean(required=True)
