import "./LeftPanel.css"

import {ReactComponent as Logo1} from "./1.svg"
import {ReactComponent as Logo2} from "./2.svg"
import {ReactComponent as Logo3} from "./3.svg"

function LeftPanel() {

  return ( 
    <div className="LeftPanel">
      <div className="menuBtn"><Logo1/></div>
      <div className="menuBtn"><Logo2/></div>
      <div className="menuBtn"><Logo3/></div>
    </div>
  );
}

export default LeftPanel;