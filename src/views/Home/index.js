import React, { useState, useEffect } from 'react';
import * as S from './styles';

import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FilterCard from '../../components/FilterCard'
import TaskCard from '../../components/TaskCard'

function Home() {
  const [filterActived, setFilterActived] = useState('today');
  const [tasks, setTasks] = useState([]);
  const [lateCount, setLateCount] = useState();

  async function loadTasks() {
    await api.get(`/tasks/${filterActived}`, {
      headers: {
        macaddress: 1234
      }
    })
      .then(response => {
        setTasks(response.data);
        console.log(tasks)
      })
      .catch(error => {
        console.error(error);
      })
  }

  async function overdueVerify() {
    await api.get(`/tasks/overdue`, {
      headers: {
        macaddress: 1234
      }
    })
      .then(response => {
        setLateCount(response.data.length);
        console.log(response.data.length);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function Notification() {
    setFilterActived('overdue');
  }

  

  useEffect(() => {
    loadTasks();
    overdueVerify();
  }, [filterActived])

  return (
    <S.Container>
      <Header lateCount={lateCount} clickNotification={Notification} />

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

      <S.Title>
        <h3>{filterActived == 'overdue' ? 'TAREFAS ATRASADAS' : 'TAREFAS'}</h3>
      </S.Title>

      <S.Content>
        {
          tasks.map(t => (
            <TaskCard category={t.category} title={t.title} when={t.when} />
          ))
        }
      </S.Content>
      <Footer />
    </S.Container>
  )
}

export default Home;
