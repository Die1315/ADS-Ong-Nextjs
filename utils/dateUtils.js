export const formatDate = (date) => {
  console.log(typeof date, date)
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', options).format(new Date(date));
  };
  