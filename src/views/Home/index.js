import React, { useState } from 'react';
import * as S from './styles';

// COMPONENTS
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FilterCard from '../../components/FilterCard'

function Home() {
  const [filterActived, setFilterActived] = useState();

  return (
    <S.Container>
      <Header />

      <S.FilterArea>
        <button type="button" onClick={() => setFilterActived("all")}>
          <FilterCard title="All" actived={filterActived === 'all'} />
        </button>
        <button type="button" onClick={() => setFilterActived("today")}>
          <FilterCard title="Today" actived={filterActived === 'today'} onClick={() => setFilterActived("today")} />
        </button>
        <button type="button" onClick={() => setFilterActived("week")}>
          <FilterCard title="Week" actived={filterActived === 'week'} onClick={() => setFilterActived("week")} />
        </button>
        <button type="button" onClick={() => setFilterActived("month")}>
          <FilterCard title="Month" actived={filterActived === 'month'} onClick={() => setFilterActived("month")} />
        </button>
        <button type="button" onClick={() => setFilterActived("year")}>
          <FilterCard title="Year" actived={filterActived === 'year'} onClick={() => setFilterActived("year")} />
        </button>




      </S.FilterArea>
      <Footer />
    </S.Container>
  )
}

export default Home;
