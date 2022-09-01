import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { SignInContainer, ButtonsContainer } from './sign-in.styles.jsx';
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const dispatch = useDispatch();
  const handleGoogleSignIn = () => dispatch(googleSignInStart());

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  const handleSubmit = event => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password))
      resetFormFields();
    } catch (err) {
      console.log('user sign-in failed', err);
      // switch(err.code) {
      //   case 'auth/wrong-password':
      //     alert('incorrect password');
      //     break;
      //   case 'auth/user-not-found':
      //     alert('no user associated with this email');
      //     break;
      //   default:
      //     console.log(err);
      // };
    };
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button 
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={handleGoogleSignIn}
          >
            Google Sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
};

export default SignInForm;