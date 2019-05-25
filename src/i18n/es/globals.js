const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const cancel = 'Cancelar';
const dateLocaleString = 'es-AR';

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
};

export default globals;
