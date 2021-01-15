import './event-slider.scss'

export default class EventSlider {
    constructor(props) {
        this.elementSlider = document.querySelector('.event-slider');
        this.elementRange = this.elementSlider.querySelector('.event-slider__range');
        this.elementEvents = this.elementSlider.querySelector('.events');

        this.length = props.length;
        this.currentValue = this.length-1;
        this.isSlideStart = false;

        this.initRange(this.length);

        this.elementSlider.addEventListener('pointerdown', (e)=>this.pointerDown(e));
        this.elementSlider.addEventListener('pointerup', (e)=>this.pointerUp(e));
        this.elementSlider.addEventListener('pointermove', this.pointerMove.bind(this), true);
        this.elementSlider.addEventListener('keydown', (e)=>this.keydown(e));

        props.forEach((event, index) => {
            const eventElement = document.createElement('option');
            eventElement.value = index;
            eventElement.setAttribute('label', event.date);
            eventElement.setAttribute('data-name', event.name);
            this.elementEvents.append(eventElement);
            eventElement.style.left = (this.elementSlider.offsetWidth/this.length)*index+
                ((this.elementSlider.offsetWidth/this.length)-eventElement.offsetWidth)/2 + 'px';
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
    pointerDown(e) {
        this.isSlideStart = true;
        if (e.pointerType === 'mouse') {
            if (!e.target.classList.contains('event-slider__range')) {
                this.elementRange.classList.add('hover');
            }
        } else if (e.target.classList.contains('event-slider__range')) {
            this.elementRange.classList.add('hover');
            this.elementRange.focus();
        }
    }
    pointerUp(e) {
        this.isSlideStart = false;
        this.doMove(this.currentValue);
        this.elementRange.classList.remove('hover');
        if (e.pointerType === 'mouse') { this.elementRange.focus(); }
    }
    pointerMove() {
        if (!this.isSlideStart) return;
        this.currentValue = Math.round(this.elementRange.value);
        this.showValue(this.currentValue);
    }
    keydown(e) {
        if (document.activeElement.classList.contains('event-slider__range')) {
            if (e.code === 'ArrowLeft') {
                this.currentValue = this.currentValue - 1 < 0 ? 0 : this.currentValue - 1;
            }
            if (e.code === 'ArrowRight') {
                this.currentValue = this.currentValue + 1 > this.length-1 ? this.length-1 : this.currentValue + 1;
            }
            this.doMove(this.currentValue);
            this.showValue(this.currentValue);
        }
    }
    doMove() {
        this.elementRange.value = this.currentValue;
    }
    showValue(value){
        const currentEventScaleElement = this.elementEvents.querySelector(`option[value='${value}']`);

        const oldEventInfoElement = this.elementEvents.querySelector('.events__current');
        if (oldEventInfoElement) { oldEventInfoElement.remove() };

        const currentEventInfoElement = document.createElement('p');
        currentEventInfoElement.classList.add('events__current');
        currentEventInfoElement.innerText = currentEventScaleElement.dataset.name;
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