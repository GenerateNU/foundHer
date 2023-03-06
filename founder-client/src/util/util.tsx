import './util.css';
import { Navigate, useNavigate } from 'react-router-dom';

export const BottomLine = () => {
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    return navigate('/login');
  };
  return (
    <>
      <div>
        <hr className='line' />
      </div>
      <div className='note'>
        <span className='note1'> Already Have an Account? </span>
        <span className='note2' onClick={handleNavigateLogin}>
          Sign In
        </span>
      </div>
    </>
  );
};

export const NeedHelpContactUs = () => {
  const navigate = useNavigate();
  const handleContactUs = () => {};
  return (
    <>
      <div></div>
      <div className='NeedHelpContactUs'>
        <span className='needHelp'>Need Help?</span>
        <span className='contactUs' onClick={handleContactUs}>
          Contact Us
        </span>
      </div>
    </>
  );
};
