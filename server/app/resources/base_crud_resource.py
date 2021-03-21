from logging import Logger

from app.db import db
from app.jwt import checkuser
from flask import request
from flask_restful import abort
from flask_restful import Resource
from jsonpatch import JsonPatchException
from marshmallow import Schema
from marshmallow.exceptions import ValidationError


class BaseCrudResource(Resource):
    """Flask RESTful Resource for CRUD item."""

    decorators = [checkuser]

    schema: Schema
    model: db.Model
    logger: Logger

    def _get_by_id(self, id: int) -> db.Model:
        """Return record object for specified ID."""

        record = self.model.query.get_or_404(id)

        return record

    def get(self, id: int):
        """Return data for particular ID."""

        item = self._get_by_id(id)
        return item.to_dict(), 200

    def patch(self, id: int):
        """Update existing quote."""

        patch = request.json
        item = self._get_by_id(id)

        # ignore empty patches
        if len(patch) > 0:
            try:
                item.update_from_patch(patch)
            except JsonPatchException as e:
                print("()" * 20, patch, "shit went down")
                self.logger.error(
                    f"Error updating item [{item}] from patch [{patch}]: {e}",
                )
                abort(400)

        return item.to_dict(), 200

    def post(self):
        """Create new item."""
        try:
            item = self.schema().load(request.json)
        except ValidationError as e:
            msg = (
                f"Failed to validate input for [{self.schema}], data [{request.json}]: "
            )
            msg += str(e)
            self.logger.error(msg)
            return {"message": f"failed to validate input: {e}"}, 400

        return item.to_dict(), 201

    def delete(self, id):
        """Delete item."""

        item = self._get_by_id(id)
        item.delete()

        return None, 204
