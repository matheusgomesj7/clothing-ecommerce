import SignUpForm from '../../components/sign-up-form/sign-up.component-form';
import SignInForm from '../../components/sign-in-form/sign-in.component-form';
import './authentication.styles.scss';

const Authentication = () => {
  
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  )
};

export default Authentication;