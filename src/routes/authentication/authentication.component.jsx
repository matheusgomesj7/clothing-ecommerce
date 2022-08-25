import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import SignUpForm from '../../components/sign-up-form/sign-up.component-form';
import SignInForm from '../../components/sign-in-form/sign-in.component-form';
import { AuthContainer } from './authentication.styles.jsx';


const Authentication = () => {

  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    const navigateToShop = () => navigate('/clothing-ecommerce/shop');
    setTimeout(() => {
      if (currentUser) {
      navigateToShop();
      }
    }, 500);
  }, [currentUser, navigate]);
  
  return (
    <AuthContainer>
      <SignInForm />
      <SignUpForm />
    </AuthContainer>
  )
};

export default Authentication;