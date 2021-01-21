import '@/style.scss'
import EventSlider from '@comp/event-slider/event-slider'

const data = [
    [
        {
            name: 'событие',
            date: '01.02.18'
        },
        {
            name: 'праздник',
            date: '05.06.19'
        },
        {
            name: 'мероприятие',
            date: '07.08.20'
        },
        {
            name: 'туса',
            date: '11.12.21'
        }
    ],
    [
        {
            name: 'ивент',
            date: '20.10.18'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        },
        {
            name: 'др',
            date: '05.04.20'
        },
        {
            name: 'встреча',
            date: '16.03.19'
        }
    ],
    [
        {
            name: 'грифиндор',
            date: '06.02.21'
        },
        {
            name: 'коктевран',
            date: '13.02.21'
        },
        {
            name: 'слизерин',
            date: '20.02.21'
        },
        {
            name: 'пуфендуй',
            date: '27.02.21'
        }
    ]
]

// document.addEventListener("DOMContentLoaded", ()=>{
    const elementsSlider = document.querySelectorAll('.desktop__slider');
    elementsSlider.forEach((elementSlider, index) => {
        const slider = new EventSlider({id: index, element: elementSlider, data: data[index], current: 1 });

        const pull = [];
        elementSlider.addEventListener('eventchange', ()=>{
            pull[slider.currentValue] = pull[slider.currentValue] ? pull[slider.currentValue] : [getR(0, 255),getR(0, 255),getR(0, 255)];
            document.body.style.backgroundColor = `rgb(${pull[slider.currentValue][0]},${pull[slider.currentValue][1]},${pull[slider.currentValue][2]})`;
        });
    });
// });

function getR(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}