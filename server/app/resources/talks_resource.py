from app.models.talk_model import Talk as TalkModel
from flask_restful import Resource


class Talks(Resource):
    """Flask RESTful Resource for data about Udemy courses."""

    def get(self):
        """Return list of review quote data dicts (including course name and link)."""

        talks = [talk.to_dict() for talk in TalkModel.query.all()]

        return talks, 200
