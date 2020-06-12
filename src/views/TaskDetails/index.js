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
                    <input type="text" placeholder="Task title"></input>
                </S.Input>

                <S.TextArea>
                    <span> Title </span>
                    <textarea rows={5} placeholder="Details of task"></textarea>
                </S.TextArea>

                <S.Input>
                    <span> Date </span>
                    <input type="date"></input>
                    <img src={iconCalendar} alt="Calendar"></img>
                </S.Input>

                <S.Input>
                    <span> Hour </span>
                    <input type="time"></input>
                    <img src={iconClock} alt="clock"></img>
                </S.Input>

                <S.Options>
                    <div>
                        <input type="checkbox" />
                        <span>DONE</span>
                    </div>
                    <button type="button">DELETE</button>
                </S.Options>

                <S.Save>
                    <button type="button">SAVE</button>
                </S.Save>
            </S.Form>

            <Footer />
        </S.Container>
    )
}

export default TaskDetails;
