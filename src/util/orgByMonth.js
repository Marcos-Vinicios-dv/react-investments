const orgByMonth = (array = []) => {
  const arrayOrg = array.sort((a, b) => {
    return a.month < b.month ? -1 : a.month > b.month ? 1 : 0;
  });
  return arrayOrg;
};

export default orgByMonth;
