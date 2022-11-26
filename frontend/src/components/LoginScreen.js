import './LoginScreen.css'
import Logo from './Logo/Logo';

function Regestration() {
  return (
    <div className='Regestration'>
      <div className='Regestration-Form'>
        <h1>Регистрация в личном кабинете</h1>
        <input placeholder='ФИО'/>
        <input placeholder='ИНН'/>
        <input placeholder='Название компании'/>
        <input placeholder='Телефон'/><br/>
        
        <input placeholder='Email'/>
        <input type='password' placeholder='Пароль'/>
        <input type='password' placeholder='Подтверждение'/><br/>

        <button className='btn'>Зарегистрироваться</button>
      </div>
    </div>
  )
}

function LoginScreen() {
  return ( 
    <div>
      <Regestration/>
      <div className='LoginScreen'>
        <div className='LoginScreen-Left'>
          <div className='LoginScreen-Left-SignUpForm'>
            <div className='LoginScreen-Left-SignUpForm-Inner'>
              <h1>Вход</h1>
              <input placeholder='Электронная почта'></input>
              <input type='password' placeholder='Пароль'></input>
              <button className='btn'>Войти</button>
              <button className='btn btn-secondary'>Зарегистрироваться</button>
            </div>
          </div>
        </div>
        <div className='LoginScreen-Right'>
          <div className='LoginScreen-RightInner'> 
            <Logo/>
          </div>
        </div>
      </div>
    </div>
   );
}

export default LoginScreen;