import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as S from './styles';
import { format } from 'date-fns';

import api from '../../services/api';

// COMPONENTS
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategoryIcons from '../../utils/categoryIcons';

import iconCalendar from '../../assets/calendar.png'
import iconClock from '../../assets/clock.png'

function TaskDetails({ match }) {
    const [redirect, setRedirect] = useState(false);
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

    async function loadTaskDetails() {
        await api.get(`/tasks/${match.params.id}`)
            .then(response => {
                setCategory(response.data.category)
                setTitle(response.data.title)
                setDone(response.data.done)
                setDescription(response.data.description)
                setDate(format(new Date(response.data.when), 'yyyy-MM-dd'))
                setHour(format(new Date(response.data.when), 'HH:mm'))
            })
    }

    async function Save() {

        if (!title) {
            return alert("You must need to input title");
        } else if (!description) {
            return alert("You must need to input description");
        } else if (!category) {
            return alert("You must need to input category");
        } else if (!date) {
            return alert("You must need to input date");
        } else if (!hour) {
            return alert("You must need to input hour");
        }

        if (match.params.id) {
            await api.put(`/tasks/${match.params.id}`, {
                macaddress,
                category,
                title,
                description,
                when: `${date}T${hour}:00.000`,
                done
            }).then(() => setRedirect(true))

        } else {


            await api.post('/tasks', {
                macaddress,
                category,
                title,
                description,
                when: `${date}T${hour}:00.000`,
                done
            }).then(() => setRedirect(true))
        }
    }

    useEffect(() => {
        overdueVerify();
        loadTaskDetails();
    }, [])

    return (
        <S.Container>
            {redirect && <Redirect to="/" />}
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
