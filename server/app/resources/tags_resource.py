from app.models.cheat_sheet_model import Tag as TagModel
from flask_restful import Resource


class Tags(Resource):
    """Flask RESTful Resource for cheat sheet tags."""

    def get(self):
        """Return list of tag names."""

        tag_names = [tag.tagName for tag in TagModel.query.all()]

        return tag_names, 200
