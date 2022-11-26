import '../../Common.css'
import './Logo.css'

import { ReactComponent as SurguLogo} from './SurguLogo.svg'


function Logo() {
  return (  
    <div className='Logo'>
      <SurguLogo className='LogoImg'/>
      <div className='LogoText'>SURGU EVENTS</div>
    </div>
  );
}

export default Logo;