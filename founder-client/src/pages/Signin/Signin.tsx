import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../user/thunks';
import { Navigate, useNavigate } from 'react-router-dom';
import './signin.css';
import { NeedHelpContactUs } from '../../util/util';
import MultiRangeSlider from '../../components/SlidingScale/sliding_scale';


const Login = () => {
  const { currentUser } = useSelector((state: any) => state.users);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const handleLoginBtn = () => {
    try {
      dispatch(loginThunk({ username, password }));
    } catch (e) {}
  };

  const handleRegisterBtn = () => {
    return navigate('/preregister');
  };
  if (currentUser) {
    localStorage.setItem('access_token', currentUser.access_token);
    localStorage.setItem('currentUserID', currentUser.id);
    return <Navigate to={'/profile'} />;
  }
  return (
    <div className='formContainer'>
      <h1 className='signinTitle'>Sign In</h1>

      <input
        className='usernameField form-control'
        onChange={e => setUsername(e.target.value)}
        placeholder='username'
        value={username}
      />

      <input
        onChange={e => setPassword(e.target.value)}
        className='form-control passwordField'
        placeholder='password'
        type='password'
        value={password}
      />
      <div className='forgotPassword'>Forgot Password?</div>
      <button className='btn btn-primary signinButton' onClick={handleLoginBtn}>
        Sign In
      </button>

      <MultiRangeSlider min={10} max={90} onChange={({ min, max }: { min: number; max: number }) =>
        console.log(`min = ${min}, max = ${max}`)}/>

      <div className='newto'>
        <span className='newToFoundHer'> New to Foundher? </span>
        <span className='createAnAccount' onClick={handleRegisterBtn}>
          Create an Account
        </span>
      </div>

      <NeedHelpContactUs />
    </div>
  );
};
export default Login;
