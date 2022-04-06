import * as moment from 'moment';

export default (start: number): {
  firstDay: number;
  secondDay: number;
  thirdDay: number;
  end: number;
} => {
  const firstDay = start;
  const secondDay = moment(start * 1000).add(1, 'days').toDate().valueOf() / 1000;
  const thirdDay = moment(start * 1000).add(2, 'days').toDate().valueOf() / 1000;
  const end = moment(start * 1000).add(3, 'days').toDate().valueOf() / 1000;
  return {
    firstDay,
    secondDay,
    thirdDay,
    end,
  }
};
