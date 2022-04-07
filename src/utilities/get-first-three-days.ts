import * as moment from 'moment';

export default (): {
  start: number;
  firstDay: number;
  secondDay: number;
  thirdDay: number;
  end: number;
} => {
  const start =  Math.floor(moment(new Date()).valueOf() / 1000);
  const firstDay = moment(start * 1000).startOf('day').toDate().valueOf() / 1000;
  const secondDay = moment(start * 1000).add(1, 'days').startOf('day').toDate().valueOf() / 1000;
  const thirdDay = moment(start * 1000).add(2, 'days').startOf('day').toDate().valueOf() / 1000;
  const end = moment(start * 1000).add(3, 'days').startOf('day').toDate().valueOf() / 1000;

  return {
    start,
    firstDay,
    secondDay,
    thirdDay,
    end,
  }
};
