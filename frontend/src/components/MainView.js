import "../Common.css"
import "./MainView.css"
import Logo from "./Logo/Logo";
import EventCard from "./EventCard/EventCard";
import RightPanel from "./RightPanel/RightPanel";

import {ReactComponent as PlusIcon} from '../plus.svg'


function MainView() {


  return (  
    <div className="MainView">
      <div className="container">
        <Logo/>
        <div className="TitleEventsContainer">
          <h1>Ваши мероприятия</h1>
          <div>
            <button className="btn"> 
              Новый запрос 
              <PlusIcon/>
            </button>
          </div>
        </div>

        <div className="EventList">
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
          <EventCard/>
        </div>
      </div>

      <RightPanel/>
    </div>
  );
}

export default MainView;