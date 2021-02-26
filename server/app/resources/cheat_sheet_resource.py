import logging

from app.models.cheat_sheet_model import CheatSheet as CheatSheetModel
from app.resources.base_crud_resource import BaseCrudResource
from marshmallow import fields
from marshmallow import post_load
from marshmallow import Schema

logger = logging.getLogger(__name__)


class CheatSheetPostDataSchema(Schema):
    title = fields.Str(required=True)
    fileName = fields.Str(required=True)  # defer to JS for camel case
    tagNames = fields.List(fields.Str(), required=True)
    version = fields.Str(required=True)

    @post_load
    def make_cheat_sheet(self, data, **kwargs):

        return CheatSheetModel(**data)


class CheatSheet(BaseCrudResource):
    """Flask RESTful Resource for individual cheat sheet."""

    def __init__(self):
        self.schema = CheatSheetPostDataSchema
        self.model = CheatSheetModel
        self.logger = logging.getLogger(__name__)
