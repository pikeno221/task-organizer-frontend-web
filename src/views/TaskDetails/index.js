import React, { useState, useEffect } from 'react';
import * as S from './styles';

import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategoryIcons from '../../utils/categoryIcons';

import iconCalendar from '../../assets/calendar.png'
import iconClock from '../../assets/clock.png'

function TaskDetails() {
    const [lateCount, setLateCount] = useState();
    const [category, setCategory] = useState();
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState()
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState('1234');


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

    async function Save() {
        await api.post('/tasks', {
            macaddress,
            category,
            title,
            description,
            when: `${date}T${hour}.000`,
            done
        }).then(() => alert('TASK CREATED!')
        )
    }

    useEffect(() => {
        overdueVerify();
    }, [])

    return (
        <S.Container>
            <Header lateCount={lateCount} />

            <S.Form>
                <S.CategoryIcons>
                    {
                        CategoryIcons.map((c, index) => (
                            index > 0 &&
                            <button type="button" onClick={() => setCategory(index)} >
                                <img src={c} alt="Category" className={category && category != index && 'inative'} />
                            </button>
                        ))
                    }

                </S.CategoryIcons>

                <S.Input>
                    <span> Title </span>
                    <input type="text" placeholder="Task title"
                        onChange={e => setTitle(e.target.value)} value={title} />
                </S.Input>

                <S.TextArea>
                    <span> Description </span>
                    <textarea rows={5} placeholder="Details of task"
                        onChange={e => setDescription(e.target.value)} value={description} />

                </S.TextArea>

                <S.Input>
                    <span> Date </span>
                    <input type="date"
                        onChange={e => setDate(e.target.value)} value={date} />
                    <img src={iconCalendar} alt="Calendar"></img>
                </S.Input>

                <S.Input>
                    <span> hora </span>
                    <input type="time"
                        onChange={e => setHour(e.target.value)} value={hour} />
                    <img src={iconClock} alt="clock"></img>
                </S.Input>

                <S.Options>
                    <div>
                        <input type="checkbox" checked={done} onChange={() => setDone(!done)} />
                        <span>DONE </span>
                    </div>
                    <button type="button">DELETE</button>
                </S.Options>

                <S.Save>
                    <button type="button" onClick={Save}>SAVE</button>
                </S.Save>
            </S.Form>

            <Footer />
        </S.Container>
    )
}

export default TaskDetails;
