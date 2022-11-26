import docx
import pickle
import random
from datetime import datetime, date


def generate_contract_code():
    letters = 'АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЫЭЮЯ'

    rand_string = ''.join(random.choice(letters) for i in range(2))
    rand_nums = random.randint(100000, 999999)
    cont_code = rand_string+'-' + str(rand_nums)

    return cont_code


def generate_contract(var_dict):
    date_format = "\"%d\" %m %Y г."
    contract_code = generate_contract_code()
    generate_contract_date = datetime.now().date()
    end_of_contract = date(generate_contract_date.year+5, generate_contract_date.month, generate_contract_date.day)

    variables.update(
        {
            "contract_number": contract_code,
            "city_name": "Сургут",
            "gen_date": generate_contract_date.strftime("«%d» %m %Y г."),
            "start_contract": generate_contract_date.strftime("«%d» %m %Y г."),
            "end_contract": end_of_contract.strftime("«%d» %m %Y г."),
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
        contract.save("Test2.docx")
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
