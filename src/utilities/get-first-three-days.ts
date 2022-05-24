export default (): {
  start: Date;
  firstDay: Date;
  secondDay: Date;
  thirdDay: Date;
  end: Date;
} => {
  const start =  new Date();
  const firstDay = new Date(start.setHours(0,0,0,0));
  const secondDay = new Date(start.setDate(start.getDate()+1));
  const thirdDay = new Date(start.setDate(start.getDate()+1));
  const end = new Date(start.setDate(start.getDate()+1));

  return {
    start,
    firstDay,
    secondDay,
    thirdDay,
    end,
  }
};
