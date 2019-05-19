const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const cancel = 'Cancelar';
const dateLocaleString = 'pt-BR';

const globals = {
  buefyOptions: {
    defaultDialogConfirmText: 'OK',
    defaultDialogCancelText: cancel,
    defaultDayNames: days,
    defaultMonthNames: months,
    defaultDateFormatter: date => date.toLocaleDateString(dateLocaleString),
    defaultIconPack: 'fas',
  },
};

export default globals;
