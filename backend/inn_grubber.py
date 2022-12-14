import requests as req
from dadata import Dadata
from credentials import DADATA_TOKEN

ddt = Dadata(DADATA_TOKEN)


def get_name_by_inn(inn: str):
    result = ddt.find_by_id("party", inn)
    return result if len(result) > 0 else None


print(get_name_by_inn("7728437776"))