# -*- coding: utf-8 -*-

from typing import Union
from fastapi import FastAPI, File, UploadFile, HTTPException, Response, Depends
from pydantic import BaseModel
from uuid import UUID, uuid4

from fastapi_sessions.backends.implementations import InMemoryBackend
from fastapi_sessions.session_verifier import SessionVerifier
from fastapi_sessions.frontends.implementations import SessionCookie, CookieParameters

from inn_grubber import get_name_by_inn
import re
from credentials import *
from sqlmodel import Field, Session, SQLModel, create_engine, select
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def check_email(email):
    if re.search('.*@.*\..{2,4}', email):
        return True
    else:
        return False


engine = create_engine(MYSQL_URL, echo=True)


class SessionData(BaseModel):
    login: str


class BasicVerifier(SessionVerifier[UUID, SessionData]):
    def __init__(
        self,
        *,
        identifier: str,
        auto_error: bool,
        backend: InMemoryBackend[UUID, SessionData],
        auth_http_exception: HTTPException,
    ):
        self._identifier = identifier
        self._auto_error = auto_error
        self._backend = backend
        self._auth_http_exception = auth_http_exception

    @property
    def identifier(self):
        return self._identifier

    @property
    def backend(self):
        return self._backend

    @property
    def auto_error(self):
        return self._auto_error

    @property
    def auth_http_exception(self):
        return self._auth_http_exception

    def verify_session(self, model: SessionData) -> bool:
        """If the session exists, it is valid"""
        return True



cookie_params = CookieParameters()

# Uses UUID
cookie = SessionCookie(
    cookie_name="cookie",
    identifier="general_verifier",
    auto_error=True,
    secret_key=SESSION_SECRET_KEY,
    cookie_params=cookie_params,
)
backend = InMemoryBackend[UUID, SessionData]()

verifier = BasicVerifier(
    identifier="general_verifier",
    auto_error=True,
    backend=backend,
    auth_http_exception=HTTPException(status_code=403, detail="invalid session"),
)


class Partner(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    inn: str
    name_of_organization: Optional[str] = None
    rank: str
    email: str
    tel: str
    password: str


class PartnerInn(BaseModel):
    inn: str


class Signin(SQLModel):
    login: str
    password: str


class Event(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    start_time: int
    partner: str
    status: str
    logo: str
    responsible: str
    description: str
    type: str


SQLModel.metadata.create_all(engine)


@app.post('/api/user/signup')
async def signup(partner: Partner, response: Response):
    if not partner.name_of_organization:
        name_of_organization = get_name_by_inn(partner.inn)
        if not name_of_organization:
            return {"status": "Error", "message": "Organization inn not found"}
        else:
            partner.name_of_organization = name_of_organization
    with Session(engine) as session:
        session.add(partner)
        session.commit()
        cookie_session = uuid4()
        data = SessionData(login=partner.inn)
        await backend.create(cookie_session, data)
        cookie.attach_to_response(response, cookie_session)
    print(partner)
    return {"status": "Done"}


@app.post('/api/user/signin')
async def signin(signin: Signin, response: Response):
    login = signin.login
    # if check_email(login):
    #     print("Email")
    # else:
    #     print("INN")
    password = signin.password
    with Session(engine) as session:
        statement = select(Partner).filter(Partner.inn == login and Partner.password == password)
        partner = session.exec(statement).first()
        print(partner)
    if partner:
        cookie_session = uuid4()
        data = SessionData(login=login)
        await backend.create(cookie_session, data)
        cookie.attach_to_response(response, cookie_session)
        print(login)
        return {"status": "Done"}
    else:
        return {"status": "Error"}


@app.post('/api/event/add')
async def event_add(event: Event):
    with Session(engine) as session:
        session.add(event)
        session.commit()
    return {"status": "Done"}


@app.post('/api/event/get')
async def event_get(inn: PartnerInn):
    with Session(engine) as session:
        statement = select(Event).where(Event.partner == inn.inn)
        events = session.exec(statement).fetchall()
        print(events)
    return events


@app.delete('/api/event/delete')
async def event_delete(event: Event):
    print(event.id)
    return {"event": "Done"}


@app.post("/files/")
async def create_file(file: Union[bytes, None] = File(default=None)):
    if not file:
        return {"message": "No file sent"}
    else:
        return {"file_size": len(file)}


@app.post("/uploadfile/")
async def create_upload_file(file: Union[UploadFile, None] = None):
    if not file:
        return {"message": "No upload file sent"}
    else:
        return {"filename": file.filename}

