import moment from 'moment';

export const formatMoney = (amount, locale = 'en-US', currency = 'USD') =>
  _.toNumber(amount).toLocaleString(locale, {
    style: 'currency',
    currency
  });

export const renderDateTime = (conditions, type = 'pick') => {
  if (type === 'pick') {
    return `${moment(conditions.pickDate).format('ll')} ${moment(
      conditions.pickTime,
      'hhmm'
    ).format('h:mm a')}`;
  }

  return `${moment(conditions.returnDate).format('ll')} ${moment(
    conditions.returnTime,
    'hhmm'
  ).format('h:mm a')}`;
};

export const getTotalDays = conditions => {
  if (!conditions) return;

  const { pickDate, pickTime, returnDate, returnTime } = conditions;
  const startDate = moment(
    `${pickDate} ${moment(pickTime, 'hhmm').format('HH:mm')}`
  );

  const endDate = moment(
    `${returnDate} ${moment(returnTime, 'hhmm').format('HH:mm')}`
  );

  return Math.ceil(endDate.diff(startDate, 'days', true));
};

export const validateEmail = email => {
  // check http://emailregex.com/
  const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};

export const validateCreditCard = num => {
  const re = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  return re.test(num);
};

export const validateCVV = num => {
  const re = /^[0-9]{3,4}$/;
  return re.test(num);
};
