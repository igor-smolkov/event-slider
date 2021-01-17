import '@/style.scss'
import EventSlider from '@comp/event-slider/event-slider'

const props = [
    {
        name: 'событие',
        date: '01.02.2018'
    },
    {
        name: 'праздник',
        date: '05.06.2019'
    },
    {
        name: 'мероприятие',
        date: '07.08.2020'
    },
    {
        name: 'туса',
        date: '11.12.2021'
    }
]

document.addEventListener("DOMContentLoaded", ()=>{
    const slider = new EventSlider(props);
});