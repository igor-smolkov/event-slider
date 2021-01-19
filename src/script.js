import '@/style.scss'
import EventSlider from '@comp/event-slider/event-slider'

const data = [
    [
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
    ],
    [
        {
            name: 'ивент',
            date: '20.10.2018'
        },
        {
            name: 'встреча',
            date: '16.03.2019'
        },
        {
            name: 'др',
            date: '05.04.2020'
        }
    ]
]

document.addEventListener("DOMContentLoaded", ()=>{
    const elementsSlider = document.querySelectorAll('.desktop__slider');
    elementsSlider.forEach((elementSlider, index) => {
        const slider = new EventSlider({id: index, element: elementSlider, data: data[index] });
    });
});