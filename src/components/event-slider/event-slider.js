import './event-slider.scss'

const props = [
    {
        name: 'горячий прием',
        date: 1234
    },
    {
        name: 'зло I',
        date: 1235
    },
    {
        name: 'зло II',
        date: 1236
    },
    {
        name: 'праздник',
        date: 1237
    },
    {
        name: 'уголь',
        date: 1238
    },
    {
        name: 'неявные отношения',
        date: 1239
    },
    {
        name: 'уголь 20:20',
        date: 1240
    }
]

export default function() {
    const eventSliderElement = document.querySelector('.event-slider')
    const rangeElement = eventSliderElement.querySelector('.event-slider__range')
    const eventsElement = eventSliderElement.querySelector('.event-slider__events')
    const valueElement = eventSliderElement.querySelector('.event-slider__value')

    rangeElement.min = 0;
    rangeElement.max = props.length-1;
    rangeElement.step = 0.01;
    rangeElement.value = props.length-1;
    rangeElement.addEventListener('change', (e)=>{
        const currentValue = Math.round(rangeElement.value);
        rangeElement.value = currentValue;
        showValue(currentValue);
    })

    props.forEach((event, index) => {
        const eventElement = document.createElement('option');
        eventElement.value = index;
        eventElement.setAttribute('label', event.name);
        eventsElement.append(eventElement);
    })

    showValue(props.length-1);
    function showValue(value){
        valueElement.innerText = props[value].name;
    }
}