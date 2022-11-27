import "../Common.css";
import "./MainView.css";
import Logo from "./Logo/Logo";
import EventCard from "./EventCard/EventCard";
import RightPanel from "./RightPanel/RightPanel";
import LeftPanel from "./LeftPanel/LeftPanel";

import { ReactComponent as PlusIcon } from "../plus.svg";
import { useEffect, useRef, useState } from 'react'
import ServerIp from "../Global";

function PageDashBoard({pageSetter}) {

  const getCards = async () => {
    const response = await fetch(`${ServerIp}/api/event/get`, {
      method: "POST", 
      mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inn: '8602298565',
      }),
    });

    const res = await response.json();

    console.log(res);
  };

  useEffect(() => {
    getCards();
  })

  return (
    <div>
      <div className="TitleEventsContainer">
        <h1>Ваши мероприятия</h1>
        <div>
          <button className="btn" onClick={() => pageSetter('EditEvent')}>
            Новый запрос
            <PlusIcon />
          </button>
        </div>
      </div>

      <div className="EventList">
        <EventCard pageSetter={pageSetter}/>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
}

const eventImg =
  "https://drivenew.ru/upload/resize_cache/iblock/ccf/944_629_2/ccf309cf1714243a859e701a882e6647.jpg";

function PageEditEvent({pageSetter}) {

  const fName = useRef(null);
  const fDate = useRef(null);
  const fType = useRef(null);
  const fDesc = useRef(null);

  const addCard = async () => {
    const response = await fetch(`${ServerIp}/api/event/add`, {
      method: "POST", 
      mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": fName.current.value,
        "start_time": 0,
        "partner": '8602298565',
        "desc": fDesc.current.value,
        "status": "string",
        "logo": "string",
        "responsible": "None",
        "type": fType.current.value
      }),
    });

    const res = await response.json();

    console.log(res);
  };

  return (
    <div className="PageEditEvent">
      <div className="TitleEventsContainer">
        <h1>Редактирование заявки</h1>
      </div>
      <div className="PageEditEvent-UpperContainer">
        <img src={eventImg}></img>

        <div className="PageEditEvent-UpperContainer-Right">
          <input ref={fName} placeholder="Название мероприятия" />
          <input ref={fDate} placeholder="Дата" type="date" />
          <select ref={fType} placeholder="Тип">
            <option>Мероприятие</option>
            <option>Исследование</option>
            <option>Практика</option>
          </select>
        </div>

        <textarea ref={fDesc} placeholder="Описание" />
      </div>
      <div>
        <h1>Ответственный со стороны СурГУ</h1>
        <p>Отсутствует</p>
      </div>
      <div className="PageEditEvent-StatusContainer">
        <h1>Статус заявки</h1>
        <p>Ожидает рассмотрения</p>
      </div>
      <div className="PageEditEvent-Buttons">
        <button className="btn" onClick={() => {
          pageSetter('Main');
          addCard();
        }}>Применить изменения</button>
        <button className="btn btn-secondary" onClick={() => {
          pageSetter('Main');
        }}>Назад</button>

      </div>
    </div>
  );
}

const artLabUrl =
  "http://sun9-46.userapi.com/s/v1/ig2/BMTdnqIgLOAYMkeMKpGpiDvZbPBKffz9l_TBrLLEP9qd56wLjo_JsPdqteTinuRl1dbbdnUjMJX5o-ohXmXDoNQO.jpg?size=200x200&quality=96&crop=20,20,216,216&ava=1";

function PageEditProfile() {
  return (
    <div>
      <div className="PageEditProfile">
        <div className="PageEditProfile-Section">
          <h1>Фото профиля</h1>
          <img src={artLabUrl}></img>
        </div>

        <div className="PageEditProfile-Section">

          <h1>Сменить пароль</h1>
          <input placeholder="Старый пароль" type={"password"}></input>
          <input placeholder="Новый пароль" type={"password"}></input>
          <input placeholder="Подтверждение пароля" type={"password"}></input>

        </div>
      </div>
      <button className="btn">Применить изменения</button>
    </div>
  );
}

function MainView({viewSetter}) {
  const [page, setpage] = useState("Main");

  if (page === 'Logout')
    viewSetter('Login');

  return (
    <>
      <LeftPanel onChange={(page) => setpage(page)}/>
      <div className="MainView">
        <div className="container">
          <Logo />
          {page === 'Main' && <PageDashBoard pageSetter={setpage}/>}
          {page === 'EditEvent' && <PageEditEvent pageSetter={setpage}/>}
          {page === 'Settings' && <PageEditProfile/>}
        </div>

        <RightPanel/>
      </div>
    </>
  );
}

export default MainView;
