# TODO integrate this with Marshmallow
from typing import Optional
from typing import TypedDict


class CouponDict(TypedDict):
    code: str
    price: float
    utcExpirationISO: str
    courseId: Optional[int]


class ReviewQuoteDict(TypedDict):
    review_quote: str
