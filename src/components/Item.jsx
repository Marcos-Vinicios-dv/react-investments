const Item = ({ children: investment, textColor = null }) => {
  const { month, year, valueFormated, percentMonth } = investment;
  return (
    <li className="border-b-2 m-2 flex flex-row justify-between">
      <div>
        <span className="font-bold text-md font-mono mr-5">{`${month}/${year}`}</span>
        <span className={`${textColor} font-semibold`}>{valueFormated}</span>
      </div>
      <span className={`${textColor} font-semibold`}>{`${percentMonth}%`}</span>
    </li>
  );
};

export default Item;
