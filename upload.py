import json
import requests
from PIL import Image
from io import BytesIO

# This is to upload multiple anime girls to the DB.
API_URL = "http://localhost:8080/api/v1/imgs/upload"


def load_image(url):
    """
    Load a image data: (width, height)
    """
    # Make request
    response = requests.get(url)
    # Get the bytes
    img = Image.open(BytesIO(response.content))

    return img.size


if __name__ == "__main__":
    with open("images.json") as file:
        girls = json.loads(file.read())

        for girl in girls:
            size = load_image(girl["url"])
            girl["width"] = size[0]
            girl["height"] = size[1]

            # Print data
            print("-----------------------------------")
            print(girl)
            print("Uploading --------- ------- ------- -----")
            response = requests.post(API_URL, data=json.dumps(girl), headers={'content-type': 'application/json'})
            print("Finished uploading --- --- ---")
            print(response.content)