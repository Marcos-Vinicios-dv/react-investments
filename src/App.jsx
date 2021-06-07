import Investments from './components/Investments';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from './services/api';

export default function App() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    async function loadInvestiments() {
      const res = await api.get('investments', { cancelToken });

      const data = res.data.map(investment => ({
        ...investment,
      }));
      setInvestments(data);
    }

    loadInvestiments();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <>
      <Header>react-investments v1.0.1</Header>

      {investments.map(investment => (
        <Investments
          typeInvestment={investment.description}
          currentInvestmentId={investment.id}
          key={investment.id}
        ></Investments>
      ))}
    </>
  );
}
