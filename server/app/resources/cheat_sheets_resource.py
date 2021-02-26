from app.models.cheat_sheet_model import CheatSheet as CheatSheetModel
from flask_restful import Resource


class CheatSheets(Resource):
    """Flask RESTful Resource for cheat sheet resources."""

    def get(self):
        """Return list of course dicts for published cheat sheets"""

        cheat_sheet_dicts = [
            cheat_sheet.to_dict() for cheat_sheet in CheatSheetModel.query.all()
        ]

        return cheat_sheet_dicts, 200
