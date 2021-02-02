import logging

from app.models.course_model import Course as CourseModel
from app.resources.base_crud_resource import BaseCrudResource
from marshmallow import fields
from marshmallow import post_load
from marshmallow import Schema

logger = logging.getLogger(__name__)


class CoursePostDataSchema(Schema):
    name = fields.Str(required=True)
    link = fields.Str(required=True)
    description = fields.Str(required=True)
    imageName = fields.Str(required=True)  # defer to JS for camel case

    @post_load
    def make_course(self, data, **kwargs):

        return CourseModel(**data)


class Course(BaseCrudResource):
    """Flask RESTful Resource for individual course."""

    def __init__(self):
        self.schema = CoursePostDataSchema
        self.model = CourseModel
        self.logger = logging.getLogger(__name__)
