const auth = {
  signUp: {
    welcome: 'Welcome! Please enter your email adress and we will send you a link to complete your register',
    actionButton: 'Create new account',
    goBack: [
      'Already a user?',
      'Log in',
    ],
    response: {
      title: 'Thank you!',
      notification: 'We have sent you an email to complete your registration',
      instruction: 'Please, go to your inbox and click the link we\'ve sent you',
      goHome: 'Go back',
    },
  },
  completeSignUp: {
    placeholder: {
      names: 'Names',
      surnames: 'Surnames',
      password: 'Your password',
      confirmPassword: 'Rewrite your password',
    },
    actionButton: 'Complete registration!',
    description: [
      'Hi! Thanks for signing up!',
      'Please complete your registration!',
    ],
  },
};

export default auth;
