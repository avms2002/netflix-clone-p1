import React, { useEffect,useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';

//ao carregar a aplicação, será executada esta função
export default () => {
  const [movieList,setMovieList] = useState([]);
  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list); 
    };

    loadAll();
  }, []);

  return (
    <div className='page'>
      <section className='Lists'>
        {movieList.map((item,key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        
        ))}
      </section>
    </div>
  )
};
