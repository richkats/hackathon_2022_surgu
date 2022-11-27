import "./RightPanel.css";

import { ReactComponent as PlusIcon } from "../../plus.svg";
import { ReactComponent as CrossIcon } from "../../cross.svg";


const artLabUrl =
  "http://sun9-46.userapi.com/s/v1/ig2/BMTdnqIgLOAYMkeMKpGpiDvZbPBKffz9l_TBrLLEP9qd56wLjo_JsPdqteTinuRl1dbbdnUjMJX5o-ohXmXDoNQO.jpg?size=200x200&quality=96&crop=20,20,216,216&ava=1";

const usrImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_0kHHOSi4fYgs-ohblk2rfpJkQOF6qaGpg&usqp=CAU";

function Agent({mode}) {
  return (
    <div className="Agent">
      <div className="Agent-AvatarContainer">
        <img src={usrImg} className="Agent-Avatar" />
      </div>

      <div className="Agent-Main">
        <div className="Agent-Name">Классный В. В.</div>
        <div className="Agent-About">
          +8800553535
          <br />
          klassny_vv@surgu.ru
          <br />
        </div>
      </div>

      <button className="Agent-Delete">
        <CrossIcon/>
      </button>

    </div>
  );
}

function NewAgent() {
  return (
    <div className="Agent">
      <div className="Agent-AvatarContainer">
        <img src={usrImg} className="Agent-Avatar" />
      </div>

      <div className="Agent-Main">
        <input placeholder="ФИО"/>
        <input placeholder="Телефон"/>
        <input placeholder="Email"/>
      </div>
    </div>
  )
}

function RightPanel() {
  return (
    <div className="RightPanel">
      <div className="RightPanel-Profile">
        <div className="RightPanel-ProfileText"> ART LAB </div>
        <img className="RightPanel-ProfileImg" src={artLabUrl} />
      </div>
      <div className="RightPanel-Agents">
        <div>
          <h1> Представители </h1>
        </div>

        <NewAgent/>
        <div className="RightPanel-AgentsList">
          <Agent />
          <Agent />
          <Agent />
        </div>

        <button className="btn">
          Добавить представителя
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}

export default RightPanel;
