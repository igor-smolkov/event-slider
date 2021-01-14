import '@/style.scss'
import EventSlider from '@comp/event-slider/event-slider'

const props = [
    {
        name: 'горячий прием',
        date: '01.01.2018'
    },
    {
        name: 'зло I',
        date: '01.02.2018'
    },
    {
        name: 'зло II',
        date: '01.03.2018'
    }
]

document.addEventListener("DOMContentLoaded", ()=>{
    const slider = new EventSlider(props);
});