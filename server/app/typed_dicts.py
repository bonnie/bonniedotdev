# TODO integrate this with Marshmallow
from typing import TypedDict


class CouponDict(TypedDict):
    code: str
    expiration_iso_string: str
    local_tz_string: str
    price: float


class ReviewQuoteDict(TypedDict):
    review_quote: str
