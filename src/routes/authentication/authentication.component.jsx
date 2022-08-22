import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/sign-up-form/sign-up.component-form';
import SignInForm from '../../components/sign-in-form/sign-in.component-form';
import { AuthContainer } from './authentication.styles.jsx';
import { UserContext } from '../../contexts/user.context';

const Authentication = () => {

  const { currentUser } = useContext(UserContext)
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