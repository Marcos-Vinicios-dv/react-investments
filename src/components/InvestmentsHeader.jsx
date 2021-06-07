import { formatInvestment } from '../util/format';

const InvestmentsHeader = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold ">Fundo de {typeInvestment}</h1>
      <h2 className="font-semibold text-lg ">
        Rendimento Total:{' '}
        <span className="text-green-500">{formatInvestment(totalIncome)}</span>
      </h2>
    </>
  );
};

export default InvestmentsHeader;
