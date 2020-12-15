import logging

from flask import request
from flask_restful import Resource
from marshmallow import fields
from marshmallow import post_load
from marshmallow import Schema
from marshmallow.exceptions import ValidationError

logger = logging.getLogger("FrontEnd")
log_levels = ["critical", "error", "warning", "debug", "info"]


class logSchema(Schema):
    message = fields.Str(required=True)
    logLevel = fields.Str(required=True)

    @post_load
    def validate_loglevel(self, data, **kwargs):

        log_level = data["logLevel"]
        if log_level.lower() not in log_levels:
            raise ValidationError(
                f'logLevel [{log_level}] must be one of {"|".join(log_levels)}',
            )

        return data


class Log(Resource):
    def post(self):
        """Log message from client."""

        try:
            args = logSchema().load(request.json)
        except ValidationError as e:
            return {"message": f"incorrect arguments: {e}"}, 400

        # add IP address
        message = f"[request.remote_addr] {args['message']}"

        # get the enum from the string log level
        level = logging.__getattribute__(args["logLevel"].upper())

        # log the message
        logger.log(level, message)

        return 200
