from app.models.course_model import Course as CourseModel
from flask import request
from flask_restful import Resource
from marshmallow import fields
from marshmallow import Schema


class CouponSchema(Schema):
    code = fields.Str(required=True)
    expiration_iso_string = fields.Str(required=True)
    price = fields.Float(required=True)
    local_tz_string = fields.Str()


class ReviewQuoteSchema(Schema):
    body = fields.Str(required=True)


class CoursePostDataSchema(Schema):
    name = fields.Str(required=True)
    link = fields.Str(required=True)
    description = fields.Str(required=True)
    coupons = fields.Nested(CouponSchema, many=True)
    review_quotes = fields.Nested(ReviewQuoteSchema, many=True)


class NewCourse(Resource):
    """Flask RESTful Resource for course data."""

    schema = CoursePostDataSchema()

    def post(self):
        """Create new course."""

        args = self.schema.load(request.json)
        new_course = CourseModel(**args)

        return new_course.to_dict(), 201
