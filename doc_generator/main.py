import docx
import pickle
import random
from datetime import datetime, date


MONTHS = {
    1: "января",
    2: "февраля",
    3: "марта",
    4: "апреля",
    5: "мая",
    6: "июня",
    7: "июля",
    8: "августа",
    9: "сентября",
    10: "октября",
    11: "ноября",
    12: "декабря"
}


def generate_contract_code():
    letters = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ'

    rand_string = ''.join(random.choice(letters) for i in range(2))
    rand_digits = random.randint(100000, 999999)
    contract_code = rand_string + '-' + str(rand_digits)

    return contract_code


def generate_contract(var_dict):
    contract_code = generate_contract_code()
    gen_contract_date = datetime.now().date()
    end_of_contract = date(gen_contract_date.year + 5, gen_contract_date.month, gen_contract_date.day)
    month = MONTHS.get(gen_contract_date.month)

    variables.update(
        {
            "contract_number": contract_code,
            "city_name": "Сургут",
            "gen_date": gen_contract_date.strftime(f"«%d» {month} %Y г."),
            "start_contract": gen_contract_date.strftime(f"«%d» {month} %Y г."),
            "end_contract": end_of_contract.strftime(f"«%d» {month} %Y г."),
            "post_addr": "628403",
            "phys_addr": "г. Сургут, пр. Ленина 1"
        }
    )

    contract = docx.Document("template.docx")

    for var in var_dict:
        for paragraph in contract.paragraphs:
            if paragraph.text.find(var) >= 0:
                paragraph.text = paragraph.text.replace(var, var_dict[var])

    try:
        contract.save(f"ДОГОВОР О СОТРУДНИЧЕСТВЕ {contract_code}.docx")
    except pickle.PicklingError:
        print("Произошла ошибка при сохранении")
        return False

    return True


variables = {
    "organization_name": "ПИПИПА ПАПАПИ ПУПУПУ",
    "uni_agent_name": "Иванов Иван Иванович",
    "uni_agent_status": "Начальник отдела по внеучебной деятельности",
    "uni_agent_tel": "8(888)888-88-88",
    "uni_agent_mail": "example@edu.surgu.ru",
    "org_agent_name": "Викторов Виктор Викторович",
    "org_agent_tel": "9(999)999-99-99",
    "org_agent_mail": "example@gmail.com",
}

generate_contract(variables)
