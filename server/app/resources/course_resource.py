from app.models.course_model import Course as CourseModel
from flask import request
from flask_restful import abort
from flask_restful import Resource
from jsonpatch import JsonPatchException
from marshmallow import fields
from marshmallow import Schema


class CouponSchema(Schema):
    code = fields.Str(required=True)
    price = fields.Float(required=True)
    utcExpirationISO = fields.Str(required=True)
    id = fields.Int()


class CoursePostDataSchema(Schema):
    name = fields.Str(required=True)
    link = fields.Str(required=True)
    description = fields.Str(required=True)
    imageName = fields.Str(required=True)  # defer to JS for camel case
    coupons = fields.Nested(CouponSchema, many=True)


class Course(Resource):
    """Flask RESTful Resource for course data."""

    model = CourseModel

    def _get_by_id(self, id: int) -> CourseModel:
        """Return record object for specified ID."""

        record = CourseModel.query.get_or_404(id)

        return record

    def get(self, id):
        """Return dict for course"""

        course = self._get_by_id(id)
        return course.to_dict(), 200

    def patch(self, id):
        course = self._get_by_id(id)

        try:
            course.update_from_patch(request.json)
        except JsonPatchException as e:
            # TODO: log this instead of printing
            print(e)
            abort(400)

        return course.to_dict(), 200

    def post(self):
        """Create new course."""

        args = CoursePostDataSchema().load(request.json)
        new_course = CourseModel(**args)

        return new_course.to_dict(), 201

    def delete(self, id):
        """Delete Udemy course."""

        course = self._get_by_id(id)
        course.delete()

        return None, 204
