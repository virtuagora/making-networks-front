const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const cancel = 'Cancel';
const dateLocaleString = 'en-US';

const globals = {
  buefyOptions: {
    defaultDialogConfirmText: 'OK',
    defaultDialogCancelText: cancel,
    defaultDayNames: days,
    defaultMonthNames: months,
    defaultDateFormatter: date => date.toLocaleDateString(dateLocaleString),
    defaultIconPack: 'fas',
    defaultToastDuration: 3500,
  },
  title: 'Creating networks',
  errors: {
    error: 'The server responded with an error. Try again later',
    formNotValid: 'Invalid data, please check the fields',
    invalidData: 'The data is invalid',
  },
};

export default globals;
