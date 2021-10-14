export const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function getToday() {
  const data = new Date();
  const year = data.getFullYear();
  const month = data.getMonth();
  const day = data.getDate();
  const completeDate = `${year}-${(month + 1)
    .toString()
    .padStart(2, '0')}-${day}`;
  return completeDate;
}

export function formatMonth(isoMonth: string) {
  const [year, month] = isoMonth.split('-');
  return `${MONTHS[parseInt(month) - 1]} de ${year}`;
}

export function prevMonth(month: string) {
  const jsDate = new Date(month + '-01T12:00:00');
  jsDate.setMonth(jsDate.getMonth() - 1);
  return `${jsDate.getFullYear()}-${jsDate.getMonth() + 1}`;
}

export function addMonths(month: string, increment: number) {
  const jsDate = new Date(month + '-01T12:00:00');
  jsDate.setMonth(jsDate.getMonth() + increment);
  return `${jsDate.getFullYear()}-${(jsDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;
}
