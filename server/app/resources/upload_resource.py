import logging
import os
import re

from flask import request
from flask_restful import Resource
from pycksum import cksum
from werkzeug.utils import secure_filename


ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


class Upload(Resource):
    """Flask RESTful Resource to upload files"""

    logger = logging.getLogger(__name__)

    def post(self):
        """Receive uploaded file and save to destination directory."""
        uploaded_file = request.files["file"]
        if uploaded_file and allowed_file(uploaded_file.filename):

            filename = secure_filename(uploaded_file.filename).rstrip()
            filepath = os.path.join("app", os.getenv("BDD_UPLOAD_FOLDER"), filename)

            if os.path.isfile(filepath):
                # is this the same as a file that's already been uploaded?
                with open(filepath, "rb") as existing_file:
                    existing_file_cksum = cksum(existing_file)
                new_file_cksum = cksum(uploaded_file)
                if existing_file_cksum == new_file_cksum:
                    return {"filename": filename}, 200

                # if it's not, give the new file a unique name
                suffix = 1
                while os.path.isfile(filepath):
                    filename = re.sub(
                        r"\.\w+$",
                        f"{suffix}\g<0>",
                        filename,
                    )  # noqa W605
                    filepath = os.path.join(
                        "app",
                        os.getenv("BDD_UPLOAD_FOLDER"),
                        filename,
                    )
                    suffix += 1

            uploaded_file.save(filepath)
            return {"filename": filename}, 202
        else:
            # return error
            fname = uploaded_file.filename
            self.logger.error(
                f"Error uploading file [{fname}]: bad or nonexistent filename",
            )
            return {
                "message": f"Filename not valid for upload: {uploaded_file.filename}",
            }, 422
