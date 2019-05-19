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
  },
  title: 'Creating networks',
  formNotValid: 'Invalid data, please check the fields',
};

export default globals;
