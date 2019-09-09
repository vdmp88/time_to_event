let eventTimer = (function () {

    let date,
        countdown,
        dateNow,
        difference,
        modal,
        timeToLeft,
        timerWrapper,
        timerMarkUp;


    // set date for end discount
    function init(year, month, day) {

        if (year && month && day) {
            dateNow = new Date();
            date = new Date(year, month, day);
            if (date <= dateNow) {
                console.log('Enter new date');
                reset();
                showModal();
            } else {
                difference = date - dateNow;
                start(difference, year, month, day);
            }
        } else {
            return new Error('enter date');
        }

        return this;
    }

    function start(difference = 0, year = 0, month = 0, day = 0) {
        // get difference between old date and new date

        if (!difference) {
            return null;
        } else {
            reset();
            countdown = setInterval(() => {
                init(year, month, day);
                timeToLeft = convertTime();
                displayTimer(timeToLeft);
            }, 1000);
        }

        return this;
    }

    function convertTime() {
        // convert time to years, days, hours, minutes, seconds
        const years = Math.floor((difference) / 1000 / 60 / 60 / 24 / 365);
        const days = Math.floor((difference) / 1000 / 60 / 60 / 24) % 365;
        const hours = Math.floor((difference) / 1000 / 60 / 60) % 24;
        const minutes = Math.floor((difference) / 1000 / 60) % 60;
        const seconds = Math.floor((difference) / 1000) % 60;

        return {
            years,
            days,
            hours,
            minutes,
            seconds
        };

    }

    function displayTimer(timeToLeft) {
        timerWrapper = document.querySelector('.time-to-left');
        timerWrapper.innerHTML = '';
        const timeToLeftSecondsNext = (timeToLeft.seconds - 1) >= 0 ? timeToLeft.seconds - 1 : 59;
        timerMarkUp = `
            <h2>Time left: </h2>
            <div class="timer-wrapper">
                <div class="time-card">
                    <div class="unit-of-time">_years
                        <div class="current-time">
                            ${timeToLeft.years}
                        </div>
                    </div>
                </div>
                <div class="time-card">
                    <div class="unit-of-time">_days
                        <div class="current-time">
                            ${timeToLeft.days}
                        </div>
                    </div>
                </div>
                <div class="time-card">
                    <div class="unit-of-time">_hours
                        <div class="current-time">
                            ${timeToLeft.hours < 10 ? '0' + timeToLeft.hours : timeToLeft.hours}
                        </div>
                    </div>
                </div>
                <div class="time-card">
                    <div class="unit-of-time">_minutes
                        <div class="current-time ${timeToLeft.minutes === 0}">
                            ${timeToLeft.minutes < 10 ? '0' + timeToLeft.minutes : timeToLeft.minutes}
                        </div>
                    </div>
                </div>
                <div class="time-card">
                    <div class="future-time animation-future">
                        ${timeToLeftSecondsNext < 10 ? '0' + timeToLeftSecondsNext : timeToLeftSecondsNext}
                    </div>
                    <div class="unit-of-time">_seconds
                        <div class="current-time animation-current time-second">
                            ${timeToLeft.seconds < 10 ? '0' + timeToLeft.seconds : timeToLeft.seconds} 
                        </div>
                    </div>
                </div>
            </div>
        `;
        timerWrapper.insertAdjacentHTML('afterbegin', timerMarkUp);
    }

    function reset() {
        clearInterval(countdown);
    }

    function showModal() {

        modal = document.body.querySelector('.modal-overlay');
        modal.classList.add('show');

        document.body.classList.add('active-overflow');

        return this;
    }

    function hideModal() {

        modal = document.querySelector('.modal-overlay');
        modal.classList.remove('show');

        document.body.classList.remove('active-overflow');

        return this;
    }

    function getDateValue() {
        let currentValue = datePicker.value.split('-');
        eventTimer.init(currentValue[0], currentValue[1] - 1, currentValue[2]);
        let initDateInput = new Date(currentValue[0], currentValue[1] - 1, currentValue[2]);
        initDateInput <= new Date() ? showModal() : hideModal();
        
    }

    function message(textMessage) {
        return {
            success: `<div>${textMessage}</div>`,
            error: `<div>${textMessage}</div>`,
        }
    }

    return {
        init,
        showModal,
        hideModal,
        getDateValue,
        message
    };

}());


eventTimer.init(2019, 8, 22);

let pushShow = document.querySelector('.enter-date-svg');
let datePicker = document.querySelector('.date-input');
let modal = document.querySelector('.modal-overlay');
let closeModal = document.querySelector('.close-modal-btn');
let acceptButton = document.querySelector('.accept');


modal.addEventListener('click', (e) => {
    
    e.target === closeModal ? eventTimer.hideModal()
        : e.target === acceptButton
        ? eventTimer.getDateValue()
        : console.log('wuzzup bro?');

});
pushShow.addEventListener('click', (e) => {
    eventTimer.showModal();
})

