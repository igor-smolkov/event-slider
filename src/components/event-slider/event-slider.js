import './event-slider.scss'

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
    },
    {
        name: 'праздник',
        date: '01.01.2019'
    },
    {
        name: 'уголь',
        date: '01.02.2019'
    },
    {
        name: 'неявные отношения',
        date: '01.01.2020'
    },
    {
        name: 'уголь 20:20',
        date: '01.02.2020'
    }
]

export default function() {
    const eventSliderElement = document.querySelector('.event-slider')
    const rangeElement = eventSliderElement.querySelector('.event-slider__range')
    const eventsElement = eventSliderElement.querySelector('.events')
    let isSlideStart = false;
    let currentValue = props.length-1;

    rangeElement.min = 0;
    rangeElement.max = props.length-1;
    rangeElement.step = 0.01;
    rangeElement.value = props.length-1;
    rangeElement.addEventListener('mousedown', ()=>{ isSlideStart = true; });
    rangeElement.addEventListener('mouseup', ()=>{ 
        isSlideStart = false;
        rangeElement.value = currentValue;
    });
    rangeElement.addEventListener('mousemove', ()=>{ 
        if (!isSlideStart) return false;
        currentValue = Math.round(rangeElement.value);
        showValue(currentValue);
    });
    rangeElement.addEventListener('change', (e)=>{
        // const currentValue = Math.round(rangeElement.value);
        // rangeElement.value = currentValue;
        // showValue(currentValue);
    })

    props.forEach((event, index) => {
        const eventElement = document.createElement('option');
        eventElement.value = index;
        eventElement.setAttribute('label', event.date);
        eventsElement.append(eventElement);
    })

    showValue(currentValue);

    function showValue(value){
        const currentEventScaleElement = eventsElement.querySelector(`option[value='${value}']`);

        const oldEventInfoElement = eventsElement.querySelector('.events__current');
        if (oldEventInfoElement) { oldEventInfoElement.remove() };

        const currentEventInfoElement = document.createElement('p');
        currentEventInfoElement.classList.add('events__current');
        currentEventInfoElement.innerText = props[value].name;
        eventsElement.append(currentEventInfoElement);
        
        let calcLeft = (currentEventScaleElement.offsetWidth/2 + currentEventScaleElement.offsetLeft) - currentEventInfoElement.offsetWidth/2;
        if (calcLeft < 0) {
            calcLeft = 0;
        } else if (calcLeft+currentEventInfoElement.offsetWidth > eventsElement.offsetWidth) {
            calcLeft = eventsElement.offsetWidth - currentEventInfoElement.offsetWidth -1;
        }

        currentEventInfoElement.style.left = calcLeft + 'px';
    }
}