import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
const App = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [check, setCheck] = useState(false)

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
    <main className="w-[400px] main h-[600px] relative">
      {/*header*/}
      <header className="flex justify-between items-center shadow py-5 px-10 top-bar">
        <h1 className="text-xl">Prices</h1>
        {check ? <input type={'text'} placeholder='search...' className='outline-none border' value={search} onChange={e => { setSearch(e.target.value) }} /> : <AiOutlineSearch className='cursor-pointer' onClick={() => setCheck(!check)} />}
      </header>
      <section>
        {data.filter((crypto) => {
          if (search === '') {
            return crypto;
          }
          else if (crypto.name.toLowerCase().includes(search.toLowerCase())) {
            return crypto;
          }
        }).map((crypto) => (
          <div key={crypto.id} className="flex justify-between items-center py-5 px-10">
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