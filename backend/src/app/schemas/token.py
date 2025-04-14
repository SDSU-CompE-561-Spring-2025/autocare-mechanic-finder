from pydantic import BaseModel
from datetime import datetime

#taken for reference from prof demo

class Token(BaseModel):
    Auth: str
    Token_Id: str


class TokenData(BaseModel):
    user_id: str | None = None
    Error_type: str
    Error_message: str
    created_at: datetime
