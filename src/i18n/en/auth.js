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
  recover: {
    welcome: 'Lost your password? Don\'t worry! Enter your email address and we will send you a link to recover your account',
    actionButton: 'Reset password',
    goBack: [
      'Already a user?',
      'Log in',
    ],
    response: {
      title: 'Thank you!',
      notification: 'We have sent you an email to reset your password',
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
    response: {
      title: 'Thank you!',
      notification: 'You\'ve successfully completed your registration!',
      instruction: 'Now you can log in into your account and start collaborating',
      login: 'Log In',
    },
  },
  completeRecover: {
    placeholder: {
      password: 'Your new password',
      confirmPassword: 'Rewrite your new password',
    },
    actionButton: 'Submit new password',
    description: [
      'Hi! Let\'s reset your password!!',
      'Please complete the following fields!',
    ],
    response: {
      title: 'Thank you!',
      notification: 'You\'ve successfully reseted your password!',
      instruction: 'Now you can log in into your account with your new password',
      login: 'Log In',
    },
  },
};

export default auth;
