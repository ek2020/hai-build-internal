from marshmallow import Schema, fields, validate, ValidationError

class StringDictOrList(fields.Field):
    def _deserialize(self, value, attr, data, **kwargs):
        if isinstance(value, (str, dict, list)):
            return value
        raise ValidationError("Field must be either a string, a dictionary, or a list")

    def _serialize(self, value, attr, obj, **kwargs):
        return value

class CreateTaskSchema(Schema):
    name = fields.String(required=True, validate=validate.Length(min=1))
    description = fields.String(required=True, validate=validate.Length(min=1))

class AddTaskSchema(Schema):
    appId = fields.String(required=True)
    name = fields.String(required=True, validate=validate.Length(min=1, error="User story title must not be empty"))
    description = fields.String(required=True, validate=validate.Length(min=1, error="User story description must not be empty"))
    taskId = fields.String(required=True, validate=validate.Length(min=1, error="Task Id must not be empty"))
    taskName = fields.String(required=True, validate=validate.Length(min=1, error="Task Name must not be empty"))
    featureId = fields.String(required=True, validate=validate.Length(min=1, error="Feature Id must not be empty"))
    reqId = fields.String(required=True, validate=validate.Length(min=1, error="Product requirement Id must not be empty"))
    reqDesc = fields.String(required=True, validate=validate.Length(min=1, error="Task description must not be empty"))
    contentType = fields.String(required=True)
    fileContent = fields.String(required=True)
    useGenAI = fields.Boolean(required=True)
    usIndex = fields.Number(required=True)

class UpdateTaskSchema(Schema):
    appId = fields.String(required=True)
    name = fields.String(required=True, validate=validate.Length(min=1, error="User story title must not be empty"))
    description = fields.String(required=True, validate=validate.Length(min=1, error="User story description must not be empty"))
    taskId = fields.String(required=True, validate=validate.Length(min=1, error="Task Id must not be empty"))
    taskName = fields.String(required=True, validate=validate.Length(min=1, error="Task Name must not be empty"))
    featureId = fields.String(required=True, validate=validate.Length(min=1, error="Feature Id must not be empty"))
    reqId = fields.String(required=True, validate=validate.Length(min=1, error="Product requirement Id must not be empty"))
    reqDesc = fields.String(required=True, validate=validate.Length(min=1, error="Task description must not be empty"))
    contentType = fields.String(required=True)
    fileContent = fields.String(required=True)
    useGenAI = fields.Boolean(required=True)
    existingTaskTitle = fields.String(required=True, validate=validate.Length(min=1, error="Existing task title must not be empty"))
    existingTaskDesc = StringDictOrList(required=True)
    usIndex = fields.Number(required=True)

