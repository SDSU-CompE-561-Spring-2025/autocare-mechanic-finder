from pydantic import BaseModel

#taken for reference from prof demo

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
