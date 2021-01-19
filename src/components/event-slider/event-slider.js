import './event-slider.scss'

export default class EventSlider {
    constructor(props) {
        this.id = props.id;
        this.elementSlider = props.element;
        this.elementRange;
        this.elementEvents;

        this.length = props.data.length;
        this.currentValue = this.length-1;
        this.isSlideStart = false;

        this.renderSlider();
        this.initRange(this.length);

        this.elementSlider.addEventListener('pointerdown', (e)=>this.pointerDown(e));
        this.elementSlider.addEventListener('pointerup', (e)=>this.pointerUp(e));
        this.elementSlider.addEventListener('pointermove', this.pointerMove.bind(this), true);
        this.elementSlider.addEventListener('keydown', (e)=>this.keydown(e));

        props.data.forEach((event, index) => {
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
    renderSlider() {
        this.elementSlider.classList.add('event-slider');

        this.elementEvents = document.createElement('datalist');
        this.elementEvents.classList.add('events');
        this.elementEvents.id = 'event-marks-' + this.id;

        this.elementRange = document.createElement('input');
        this.elementRange.classList.add('event-slider__range');
        this.elementRange.type = 'range';
        this.elementRange.setAttribute('list', 'event-marks-' + this.id);

        this.elementSlider.append(this.elementEvents);
        this.elementSlider.append(this.elementRange);
    }
    initRange(length) {
        this.elementRange.min = 0;
        this.elementRange.max = length-1;
        this.elementRange.step = 0.01;
        this.elementRange.value = length-1;
        this.elementRange.style.marginLeft = `${(this.elementSlider.offsetWidth/length)/2-9}px`;
        this.elementRange.style.width = `${(this.elementSlider.offsetWidth-this.elementSlider.offsetWidth/length)+20}px`;
        this.elementRange.addEventListener('pointerup', (e)=>{ 
            console.log('r'+this.elementRange.value)
            
        })
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

        if (e.target.classList.contains('event-slider__range')) {
            this.currentValue = Math.round(this.elementRange.value); 
            this.showValue(this.currentValue);
        }

        this.doMove(this.currentValue);
        this.elementRange.classList.remove('hover');
        if (e.pointerType === 'mouse') { this.elementRange.focus(); }
        
        this.elementEvents.querySelector('.events__current').classList.remove('events__current_active');
    }
    pointerMove() {
        if (!this.isSlideStart) return;
        this.currentValue = Math.round(this.elementRange.value);
        this.showValue(this.currentValue);

        this.elementEvents.querySelector('.events__current').classList.add('events__current_active');
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

        let currentEventInfoElement = this.elementEvents.querySelector('.events__current');
        if (!currentEventInfoElement) { 
            currentEventInfoElement = document.createElement('p');
            currentEventInfoElement.classList.add('events__current');
            currentEventInfoElement.innerText = currentEventScaleElement.dataset.name;
            this.elementEvents.append(currentEventInfoElement);
        } else {
            currentEventInfoElement.innerText = currentEventScaleElement.dataset.name;
        }
        
        let calcLeft = (currentEventScaleElement.offsetWidth/2 + currentEventScaleElement.offsetLeft) - currentEventInfoElement.offsetWidth/2;
        if (calcLeft < 0) {
            calcLeft = 0;
        } else if (calcLeft+currentEventInfoElement.offsetWidth > this.elementEvents.offsetWidth) {
            calcLeft = this.elementEvents.offsetWidth - currentEventInfoElement.offsetWidth -1;
        }

        currentEventInfoElement.style.left = calcLeft + 'px';
    }
}