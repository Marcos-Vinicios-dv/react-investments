import axios from 'axios';
import { useEffect, useState } from 'react';
import orgByMonth from '../util/orgByMonth';
import api from '../services/api';
import Item from './Item';
import { formatInvestment } from '../util/format';
import ListaInvestments from '../components/ListaInvestments';
import HeaderInvestments from './HeaderInvestments';

const Investments = ({
  typeInvestment = 'Tipo_de_Investimento',
  currentInvestmentId = 'id_do_Investimento',
}) => {
  const [investmentFund, setInvestmentFund] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  let textColor = 'text-green-500';

  useEffect(() => {
    const source = axios.CancelToken.source();
    const cancelToken = source.token;

    async function loadFunds() {
      const res = await api.get('reports', { cancelToken });
      const data = orgByMonth(
        res.data.filter(
          ({ investmentId }) => investmentId === currentInvestmentId
        )
      );

      let i = 0;
      const formattedData = data.map(inv => {
        const percent =
          i !== 0
            ? (data[i].value.toFixed(2) / data[i - 1].value.toFixed(2)) * 100 -
              100
            : i;
        i++;
        return {
          ...inv,
          valueFormatted: formatInvestment(inv.value.toFixed(2)),
          percentMonth: percent.toFixed(2),
        };
      });

      setTotalIncome(
        (formattedData[11].value.toFixed(2) /
          formattedData[0].value.toFixed(2)) *
          100 -
          100
      );

      setInvestmentFund(formattedData);
    }

    loadFunds();

    return () => {
      source.cancel();
    };
  }, [currentInvestmentId]);

  if (totalIncome < 0) {
    textColor = 'text-red-500';
  }

  return (
    <div className="container mx-auto p-4 border my-3 flex flex-col items-center space-x-2">
      <HeaderInvestments>
        <h1 className="text-2xl font-semibold ">{typeInvestment}</h1>
        <h2 className="font-semibold text-lg ">
          Rendimento Total:{' '}
          <span className={`${textColor}`}>{`${formatInvestment(
            totalIncome
          )} (${totalIncome.toFixed(2)}%)`}</span>
        </h2>
      </HeaderInvestments>

      <ListaInvestments>
        {investmentFund.map(investment => {
          const incomeExpense =
            investment.percentMonth >= 0 ? 'text-green-500' : 'text-red-500';
          return (
            <Item key={investment.id} textColor={incomeExpense}>
              {investment}
            </Item>
          );
        })}
      </ListaInvestments>
    </div>
  );
};

export default Investments;
