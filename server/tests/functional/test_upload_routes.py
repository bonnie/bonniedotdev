import os
import shutil
from io import BytesIO

import pytest
from pycksum import cksum

TEST_FILEPATH = "tests/test_files/"
TEST_FILECLASHPATH = os.path.join(TEST_FILEPATH, "name_clash")
TEST_FILENAME = "bent-wood.jpg"
TEST_FILENAME_BAD = "evil.js"


@pytest.fixture()
def uploads_path():
    return os.path.join("app", os.getenv("BDD_UPLOAD_FOLDER"))


@pytest.fixture(autouse=True)
def uploads_folder(uploads_path):
    # remove the folder at the start and create it again
    # test env has a different upload folder than dev/prod, so this isn't destructive
    if os.path.isdir(uploads_path):
        shutil.rmtree(uploads_path)
    os.mkdir(uploads_path)

    yield

    # remove the folder from final test
    shutil.rmtree(uploads_path)


@pytest.fixture()
def upload_test_file_response(test_client):
    # upload the file
    response = test_client.post(
        "/api/upload",
        data={"file": (os.path.join(TEST_FILEPATH, TEST_FILENAME), TEST_FILENAME)},
        headers={"Content-Type": "multipart/form-data"},
    )

    return response


def test_upload_file(upload_test_file_response, uploads_path):
    # check response
    assert upload_test_file_response.status_code == 202
    assert upload_test_file_response.json["filename"] == TEST_FILENAME

    # check that file arrived in the right place
    dest_path = os.path.join(uploads_path, TEST_FILENAME)
    assert os.path.isfile(dest_path)


def test_upload_file_exists(test_client, upload_test_file_response, uploads_path):
    # upload the same file again
    response = test_client.post(
        "/api/upload",
        data={"file": (os.path.join(TEST_FILEPATH, TEST_FILENAME), TEST_FILENAME)},
        headers={"Content-Type": "multipart/form-data"},
    )

    # check response
    assert response.status_code == 200
    assert response.json["filename"] == TEST_FILENAME

    # check that there's only one file in the uploads folder
    num_uploads = len(list(os.listdir(uploads_path)))
    assert num_uploads == 1


def test_upload_file_name_clash(test_client, upload_test_file_response, uploads_path):
    # upload different file with same name
    response = test_client.post(
        "/api/upload",
        data={"file": (os.path.join(TEST_FILECLASHPATH, TEST_FILENAME), TEST_FILENAME)},
        headers={"Content-Type": "multipart/form-data"},
    )

    # check response
    assert response.status_code == 202
    assert response.json["filename"] == "bent-wood1.jpg"

    # check that there's two files in the uploads dir
    num_uploads = len(list(os.listdir(uploads_path)))
    assert num_uploads == 2


def test_upload_file_bad_extension(test_client, uploads_path):
    # upload file with forbidden extension
    response = test_client.post(
        "/api/upload",
        data={
            "file": (os.path.join(TEST_FILEPATH, TEST_FILENAME_BAD), TEST_FILENAME_BAD),
        },
        headers={"Content-Type": "multipart/form-data"},
    )

    # check response
    assert response.status_code == 422
    assert response.json["message"] == "Filename not valid for upload: evil.js"

    # check that there's no files in the uploads dir
    num_uploads = len(list(os.listdir(uploads_path)))
    assert num_uploads == 0


def test_access_uploaded_file(test_client, upload_test_file_response):
    # test that accessing the uploaded file gives the uploaded file data
    response = test_client.get(f"/uploads/{TEST_FILENAME}")

    assert response.status_code == 200

    with open(os.path.join(TEST_FILEPATH, TEST_FILENAME), "rb") as test_file:
        test_file_cksum = cksum(test_file)
    assert cksum(BytesIO(response.data)) == test_file_cksum
