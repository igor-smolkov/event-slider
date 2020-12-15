import './event-slider.scss'

const props = {
    eventsTotal: 2
}

export default function() {
    const eventSliderElement = document.querySelector('.event-slider')
    const rangeElement = eventSliderElement.querySelector('.event-slider__range')
    const valueElement = eventSliderElement.querySelector('.event-slider__value')

    rangeElement.min = 0;
    rangeElement.max = props.eventsTotal;
    rangeElement.step = 0.1;
    rangeElement.value = props.eventsTotal;

    valueElement.innerText = rangeElement.value

    rangeElement.addEventListener('change', ()=>{
        const currentValue = Math.round(rangeElement.value)
        rangeElement.value = currentValue
        valueElement.innerText = currentValue
    })
}