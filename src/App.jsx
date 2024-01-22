import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Card from './components/Card.jsx';
import Loader from './components/Loader';
import {reqDate} from './utils/date'
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

 
  //Fetch most starred repos using Github Rest API
  const fetchData = async () => {
    try {
      const date=reqDate();
      console.log(date)
      const url=`https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${page}`
      const res = await fetch(url);
      const repoData = await res.json();
      console.log(repoData)
      const repos = await repoData.items;
      if (repos?.length == 0 || repos == undefined) {
        window.removeEventListener('scroll',controlScroll);
        return;
      }
      console.log(repos)
      setData((prevData) => [...prevData, ...repos]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  //Check for infinite scroll condition
  const controlScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight - 50 && !loading) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', controlScroll);
    return () => {
      window.removeEventListener('scroll', controlScroll);
    };
  }, []);

  return (
    <>
      <div className='content'>
        {data && data.map((el, idx) =>
        (
          <div key={idx}>
            <Card data={el} />
          </div>
        )
        )}
      </div>
      {loading && <Loader />}
    </>
  );
}

export default App;
