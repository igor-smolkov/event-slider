import './event-slider.scss'

export default class EventSlider {
    constructor(props) {
        this.props = props; //убрать

        this.elementSlider = document.querySelector('.event-slider');
        this.elementRange = this.elementSlider.querySelector('.event-slider__range');
        this.elementEvents = this.elementSlider.querySelector('.events');

        this.currentValue = props.length-1;
        this.isSlideStart = false;

        this.initRange(props.length);

        this.elementSlider.addEventListener('mousedown', this.mouseDown.bind(this));
        this.elementSlider.addEventListener('mouseup', this.mouseUp.bind(this));
        this.elementSlider.addEventListener('mousemove', this.mouseMove.bind(this));

        props.forEach((event, index) => {
            const eventElement = document.createElement('option');
            eventElement.value = index;
            eventElement.setAttribute('label', event.date);
            this.elementEvents.append(eventElement);
            eventElement.style.left = (this.elementSlider.offsetWidth/props.length)*index+
                ((this.elementSlider.offsetWidth/props.length)-eventElement.offsetWidth)/2 + 'px';
        })

        this.showValue(this.currentValue);
    }
    initRange(length) {
        this.elementRange.min = 0;
        this.elementRange.max = length-1;
        this.elementRange.step = 0.01;
        this.elementRange.value = length-1;
        this.elementRange.style.marginLeft = `${(this.elementSlider.offsetWidth/length)/2-9}px`;
        this.elementRange.style.width = `${(this.elementSlider.offsetWidth-this.elementSlider.offsetWidth/length)+20}px`;
    }
    mouseDown() {
        this.isSlideStart = true;
    }
    mouseUp() {
        this.isSlideStart = false;
        this.elementRange.value = this.currentValue;
    }
    mouseMove() {
        if (!this.isSlideStart) return false;
        this.currentValue = Math.round(this.elementRange.value);
        this.showValue(this.currentValue);
    }
    showValue(value){
        const currentEventScaleElement = this.elementEvents.querySelector(`option[value='${value}']`);

        const oldEventInfoElement = this.elementEvents.querySelector('.events__current');
        if (oldEventInfoElement) { oldEventInfoElement.remove() };

        const currentEventInfoElement = document.createElement('p');
        currentEventInfoElement.classList.add('events__current');
        currentEventInfoElement.innerText = this.props[value].name;
        this.elementEvents.append(currentEventInfoElement);
        
        let calcLeft = (currentEventScaleElement.offsetWidth/2 + currentEventScaleElement.offsetLeft) - currentEventInfoElement.offsetWidth/2;
        if (calcLeft < 0) {
            calcLeft = 0;
        } else if (calcLeft+currentEventInfoElement.offsetWidth > this.elementEvents.offsetWidth) {
            calcLeft = this.elementEvents.offsetWidth - currentEventInfoElement.offsetWidth -1;
        }

        currentEventInfoElement.style.left = calcLeft + 'px';
    }
}