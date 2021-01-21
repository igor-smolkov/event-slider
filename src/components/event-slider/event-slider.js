import './event-slider.scss'

export default class EventSlider {
    constructor(props) {
        this.id = props.id;
        // this.data = props.data;

        this.elementSlider = props.element;
        this.elementRange;
        this.elementEvents;

        this.length = props.data.length;
        this.currentValue = props.current ? props.current-1 : this.length-1;
        this.isSlideStart = false;
        this.sliderWidthPadding = 10;
        this.sliderWidth = this.elementSlider.offsetWidth-this.sliderWidthPadding*2;

        this.renderSlider();
        this.initRange(this.length);
        this.initEvents(props.data);
        this.initEvents(props.data); //лагбаг
        this.showValue(this.currentValue);

        this.elementSlider.addEventListener('pointerdown', (e)=>this.pointerDown(e));
        this.elementSlider.addEventListener('pointerup', (e)=>this.pointerUp(e));
        this.elementSlider.addEventListener('pointermove', this.pointerMove.bind(this), true);
        this.elementSlider.addEventListener('keydown', (e)=>this.keydown(e));

        this.eventChange = new Event('eventchange', {bubbles: true});

        window.addEventListener('resize', ()=>{
            this.sliderWidth = this.elementSlider.offsetWidth-this.sliderWidthPadding*2;
            this.initRange(this.length);
            this.initEvents(props.data);
            this.showValue(this.currentValue);
        })
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
        this.elementRange.value = this.currentValue;
        this.elementRange.style.marginLeft = `${(this.sliderWidth/length)/2-9}px`;
        this.elementRange.style.width = `${(this.sliderWidth-this.sliderWidth/length)+20}px`;
        this.elementRange.style.marginRight = '0';
    }
    initEvents(data){
        this.elementEvents.innerHTML = '';
        let biggestEventElement = null;
        data.forEach((event, index) => {
            const eventElement = document.createElement('option');
            eventElement.value = index;
            eventElement.setAttribute('label', event.date);
            eventElement.setAttribute('data-name', event.name);
            this.elementEvents.append(eventElement);
            eventElement.style.left = (this.sliderWidth/this.length)*index+
                ((this.sliderWidth/this.length)-eventElement.offsetWidth)/2 + 'px';

            biggestEventElement = biggestEventElement === null ? eventElement : biggestEventElement;
            biggestEventElement = biggestEventElement.offsetWidth < eventElement.offsetWidth ? eventElement : biggestEventElement;
        });
        this.elementEvents.classList.remove('events_smaller');
        this.elementEvents.classList.remove('events_smallest');
        if(this.sliderWidth/this.length < biggestEventElement.offsetWidth/2+biggestEventElement.offsetWidth/8) {
            this.elementEvents.classList.add('events_smallest');
        }
        if(this.sliderWidth/this.length < biggestEventElement.offsetWidth+biggestEventElement.offsetWidth/4) {
            this.elementEvents.classList.add('events_smaller');
        }
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
            this.updateCurentValue(this.elementRange.value);
            this.showValue(this.currentValue);
        }

        this.doMove(this.currentValue);
        this.elementRange.classList.remove('hover');
        if (e.pointerType === 'mouse') { this.elementRange.focus(); }
        
        this.elementEvents.querySelector('.events__current').classList.remove('events__current_active');
    }
    pointerMove() {
        if (!this.isSlideStart) return;
        this.updateCurentValue(this.elementRange.value);
        this.showValue(this.currentValue);

        this.elementEvents.querySelector('.events__current').classList.add('events__current_active');
    }
    keydown(e) {
        if (document.activeElement.classList.contains('event-slider__range')) {
            if (e.code === 'ArrowLeft') {
                if (this.currentValue - 1 < 0) { 
                    this.updateCurentValue(0);
                } else { 
                    this.updateCurentValue(this.currentValue - 1);
                }
            }
            if (e.code === 'ArrowRight') {
                if (this.currentValue + 1 > this.length-1) { 
                    this.updateCurentValue(this.length-1) 
                } else {
                    this.updateCurentValue(this.currentValue + 1);
                }
            }
            this.doMove(this.currentValue);
            this.showValue(this.currentValue);
        }
    }
    updateCurentValue(value) {
        const oldValue = this.currentValue;
        this.currentValue = Math.round(value);
        if (oldValue !== this.currentValue) {
            this.elementSlider.dispatchEvent(this.eventChange);
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