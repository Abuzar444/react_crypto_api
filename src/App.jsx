import { useState, useEffect } from 'react';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const newApi = await res.json();
      setLoading(false);
      setData(newApi);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="loading">
      <h1>Loading...</h1>
    </div>
  }


  return (
    <main className="w-[400px] main h-[600px]">
      {/*header*/}
      <header className="flex justify-between shadow py-5 px-10 top">
        <h1 className="text-xl">Prices</h1>
        <h1 className="text-xl">search</h1>
      </header>
      <section>
        {data.map((crypto) => (
          <div className="flex justify-between items-center py-5 px-10">
            {/*image and name*/}
            <div className='flex items-center'>
              <img src={crypto.image} alt={crypto.name} className="w-[50px] rounded-full pr-2" />
              <h1 className='font-semibold'>{crypto.name}</h1>
            </div>
            {/*preasent price in percentages*/}
            <div className="flex">
              <p className="text-sm">${crypto.current_price.toLocaleString()}</p>
              {crypto.price_change_percentage_24h < 0 ? <p className='text-sm pl-2 text-red-500'>{crypto.price_change_percentage_24h}%</p>
                : <p className='text-sm pl-2 text-green-500'>{crypto.price_change_percentage_24h}%</p>}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;