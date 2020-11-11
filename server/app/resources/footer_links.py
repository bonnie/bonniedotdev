from flask_restful import Resource


class FooterLinks(Resource):
    """Flask RESTful Resource for links in website footer."""

    def get(self):
        """Return list of link dicts (keys: icon, link)"""

        # eventually, this will be from a db
        links = [
            {
                "icon": "linkedin.png",
                "target": "https://www.linkedin.com/in/bonnie-schulkin/",
            },
            {
                "icon": "twitter.png",
                "target": "https://twitter.com/bonniedotdev/",
            },
            {
                "icon": "github.png",
                "target": "http://github.com/bonnie",
            },
        ]

        # return the id
        return links, 200
