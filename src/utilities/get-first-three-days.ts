import * as moment from 'moment';

export default (start: number): {
  firstDay: number;
  secondDay: number;
  thirdDay: number;
  end: number;
} => {
  const startDay = moment(start * 1000);
  const firstDay = start;
  const secondDay = startDay.add(1, 'days').toDate().valueOf() / 1000;
  const thirdDay = startDay.add(2, 'days').toDate().valueOf() / 1000;
  const end = startDay.add(3, 'days').toDate().valueOf() / 1000;
  return {
    firstDay,
    secondDay,
    thirdDay,
    end,
  }
};
