import logging

from app.models.talk_model import Talk as TalkModel
from app.resources.base_crud_resource import BaseCrudResource
from marshmallow import fields
from marshmallow import post_load
from marshmallow import Schema


class TalkSchema(Schema):
    title = fields.Str(required=True)
    utcDateStringISO = fields.Str(required=True)
    description = fields.Str(required=True)
    slidesFilename = fields.Str(required=True)
    conferenceName = fields.Str(required=True)
    conferenceLink = fields.Str(required=True)
    recordingLink = fields.Str(required=True)

    @post_load
    def make_talk(self, data, **kwargs):

        return TalkModel(**data)


class Talk(BaseCrudResource):
    """Flask RESTful Resource for individual quotes."""

    def __init__(self):
        self.schema = TalkSchema
        self.model = TalkModel
        self.logger = logging.getLogger(__name__)
