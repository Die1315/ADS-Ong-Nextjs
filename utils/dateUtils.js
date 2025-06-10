export const formatDate = (date, time = false) => {
  let options = { year: "numeric", month: "long", day: "numeric" };
  if (time) {
    options.hour = "numeric";
    options.minute = "numeric";
  }
  return new Intl.DateTimeFormat("es-ES", options).format(new Date(date));
};
