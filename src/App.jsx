import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Card from './components/Card.jsx';
import Loader from './components/Loader';
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.github.com/search/repositories?q=created:>2023-10-22&sort=stars&order=desc&page=${page}`);
      const repoData = await res.json();
     
      const repos = await repoData.items;
      if(repos?.length==0 || repos==undefined){
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

  const controlScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight - 10 && !loading) {
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
             <Card data={el}/>
            </div>
          )
        )}
      </div>
      {loading && <Loader/>}
    </>
  );
}

export default App;
