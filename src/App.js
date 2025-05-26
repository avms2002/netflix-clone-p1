import React, { useEffect,useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';


//ao carregar a aplicação, será executada esta função
export default () => {
  const [movieList,setMovieList] = useState([]);
  const[FeaturedData,setFeatureData]= useState(null);
  
  useEffect(() => {
    const loadAll = async () => {
      //pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list); 

      let originals = list.filter((i) => i.slug === 'originals');
      let randowChosen = Math.floor(
         Math.random() * originals[0].items.results.length

      );

      let chosen = originals[0].items.results[randowChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo);
    };

    loadAll();
  }, []);

  return (
    <div className='page'>
      {FeaturedData && <FeaturedMovie item={FeaturedData}/>}




      <section className='Lists'>
        {movieList.map((item,key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        
        ))}
      </section>
    </div>
  )
};
