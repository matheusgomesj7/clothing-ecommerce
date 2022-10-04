import { useState, FormEvent, ChangeEvent } from "react";
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { SignUpContainer } from './sign-up.styles';
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const dispatch = useDispatch();
  
  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    };

    try {
      dispatch(signUpStart(displayName, email, password));
      resetFormFields();
    } catch (err) {
      if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert('Email already in use! Please use another one');
      } else {
        console.log('user creation encountered an error', err);
      }
    };
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />

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

        <FormInput
          label="Confirm Password"
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm;