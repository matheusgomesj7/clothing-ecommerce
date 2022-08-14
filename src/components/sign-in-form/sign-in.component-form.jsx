import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user.context'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => setFormFields(defaultFormFields);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    // setCurrentUser(user);
    createUserDocumentFromAuth(user);
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    try {

      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
      // setCurrentUser(user);
      console.log(user);
      
    } catch(err) {

      switch(err.code) {
        case 'auth/wrong-password':
          alert('incorrect password');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(err);

      }
    };
  };

  return (
    <div className="sign-up-container">
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button 
            type="button"
            buttonType="google"
            onClick={signInWithGoogle}
          >
            Google Sign in
          </Button>
        </div>
      </form>
    </div>
  )
};

export default SignInForm;