# -*- coding: utf-8 -*-

from typing import Union
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from inn_grubber import get_name_by_inn
import re

app = FastAPI()


def check_email(email):
    if re.search('.*@.*\..{2,4}', email):
        return True
    else:
        return False


class Partner(BaseModel):
    name: str
    inn: str
    name_of_organization: str
    rank: str
    email: str
    tel: str
    password: str


class Signin(BaseModel):
    login: str
    password: str


class Event(BaseModel):
    id: int
    name: str
    start_time: int
    partners: list
    status: str
    logo: str
    responsible: str
    type: str


@app.post('/api/user/signup')
async def signup(partner: Partner):
    if not partner.name_of_organization:
        name_of_organization = get_name_by_inn(partner.inn)
        if not name_of_organization:
            return {"status": "Error", "message": "Organization inn not found"}
    name = partner.name
    inn = partner.inn
    rank = partner.rank
    email = partner.email
    tel = partner.tel
    password = partner.password
    print(name_of_organization, name, inn, rank, email, tel, password)
    return {"status": "Done"}


@app.post('/api/user/signin')
async def signin(signin: Signin):
    login = signin.login
    if check_email(login):
        print("Email")
    else:
        print("INN")
    password = signin.password
    print(login, password)
    return {"status": "Done"}


@app.post('/api/event/add')
async def event_add(event: Event):
    print(event)
    return {"status": "Done"}


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

