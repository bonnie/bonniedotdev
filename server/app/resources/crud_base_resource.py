from app.db import db
from flask_restful import Resource


class CrudBase(Resource):
    """Base Flask RESTful Resource for basic CRUD."""

    # to be supplied by child
    model: db.Model = None

    def _get_args(self):
        """To be implemented by children."""

    def _get_by_id(self, id: int) -> db.Model:
        """Return record object for specified ID."""

        record = self.model.query.get_or_404(id)

        return record

    def get(self, id):
        """Return dict for coupon.s"""

        coupon_dict = self._get_by_id(id).to_dict()

        return coupon_dict, 200

    def post(self):
        """Create new coupon."""

        args = self._get_args()
        new_coupon = self.model.add_new(**args)

        return new_coupon, 201

    def put(self, id):
        """Update coupon data."""

        args = self._get_args()
        record = self._get_by_id(id)

        updated_record = record.update(**args)

        return updated_record, 200

    def delete(self, id):
        """Delete Udemy coupon."""

        coupon = self._get_by_id(id)
        coupon.delete()

        return None, 204
