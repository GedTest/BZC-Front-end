document.addEventListener('DOMContentLoaded', () => {    
    const cellsContainer = document.querySelector('.container');
    const currentDate = new Date();
    const daysInWeek = 7;

    let currentMonth = currentDate.getMonth();
    let firstDayOfMonth = 1;
    let lastDayOfMonth = 30;


    function showCalendar() {
        firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1);
        lastDayOfMonth = new Date(currentDate.getFullYear(), currentMonth+1, 0);

        const months = [
            "Leden","Únor","Březen",
            "Duben","Květen","Červen",
            "Červenec","Srpen","Září",
            "Říjen","Listopad","Prosinec"
        ];

        const monthLabel = document.querySelector('#month-year');
        monthLabel.innerText = `${months[firstDayOfMonth.getMonth()]} ${firstDayOfMonth.getFullYear()}`;
        
        createCalendarGrid();
        colorCells();
    }

    function createCalendarGrid() {
        // clears previous calendar grid from HTML tree
        cellsContainer.innerHTML = '';
        
        const weekday = ["NE","PO","ÚT","ST","ČT","PÁ","SO"];

        // create header row with name of weekdays
        let weekdayIndex = 1;
        createCells(daysInWeek, 'header').forEach(cell => {
            cell.innerText = weekday[weekdayIndex % daysInWeek];
            weekdayIndex++;
            cellsContainer.appendChild(cell);
        });
                
        // create empty cells before the first day of month
        // is aligned with the corresponding weekday column
        const emptyCellCount = (firstDayOfMonth.getDay() + daysInWeek-1) % daysInWeek;
        createCells(emptyCellCount, 'empty').forEach(cell => {
            cellsContainer.appendChild(cell);
        });
        
        // create main grid of days
        let counter = 1;
        createCells(lastDayOfMonth.getDate(), 'day').forEach(cell => {
            cell.innerText = counter++;
            cellsContainer.appendChild(cell);
        });
        
        // create empty cells after the last day of month
        // until the end of grid
        const rows = 6;
        const cols = daysInWeek;
        const gridCellCount = rows*cols;
        const lastEmptyCellCount = gridCellCount - lastDayOfMonth.getDate() - emptyCellCount;
        createCells(lastEmptyCellCount, 'empty').forEach(cell => {
            cellsContainer.appendChild(cell);
        });
    }
    
    function createCells(count, cssClass) {
        const cells = [];
        for(let i = 0; i < count; i++) {
            const cell = document.createElement('div');
            cell.classList.add(cssClass);
            
            if(cssClass === 'day') {
                cell.addEventListener('click', onCellClick);
            }
            cells.push(cell);
        }
        return cells;
    }

    showCalendar();

    let lastCell = null;
    let date = null;

    function onCellClick() {
        const day = this.innerText;
        const year = firstDayOfMonth.getFullYear();
        const month = firstDayOfMonth.getMonth();
        date = `${year}-${month}-${day}`;
        
        const event = localStorage.getItem(date);

        if (event) {
            showEvent(event, date);
        }
        else {
            showForm(this);
        }
        lastCell = this;
    }

    function showEvent(event, date) {
        hideActiveElement('.form');
        
        document.querySelector('.event').classList.add('active');
        document.querySelector('#title').innerText = event;
        document.querySelector('#date').innerText = formatDate(date);

        makeEffectOn(document.querySelector('.event'), 'animate__fadeInDown', 0.4);
    }

    function hideActiveElement(element) {
        document.querySelector(element).classList.remove('active');
    }

    function formatDate(date) {
        const parts = date.split('-');
        const dateString = {
            year: parts[0],
            month: parseInt(parts[1]) + 1,
            day: parts[2]
        }
        return `${dateString.day}. ${dateString.month}. ${dateString.year}`;
    }
    
    function showForm(cell) {
        hideActiveElement('.event');
        const form = document.querySelector('.form');

        if(cell === lastCell) {
            if(form.classList.contains('active')) {
                form.classList.remove('active');
                return;
            }
        }
        
        form.classList.add('active');
        document.querySelector('#eventName').value = '';

        makeEffectOn(document.querySelector('.form'), 'animate__fadeInDown', 0.4);
    }

    function colorCells() {
        const year = firstDayOfMonth.getFullYear();
        const month = firstDayOfMonth.getMonth();
        const emptyCellCount = (firstDayOfMonth.getDay() + daysInWeek-1) % daysInWeek;
        const indexOfFirstDayCell = daysInWeek + emptyCellCount;
        let day = 1;

        for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
            const date = `${year}-${month}-${i + 1}`;
            const event = localStorage.getItem(date);

            if (event) {
                const dayElement = cellsContainer.children[i + indexOfFirstDayCell];
                dayElement.classList.add('has-event');
            }

            if (currentDate.getDate() === i + 1) { day = i; }
        }

        // add a cell pointer to the current day
        if(currentDate.getFullYear() === year && currentDate.getMonth() === month) {
            cellsContainer.children[day + indexOfFirstDayCell].classList.add('current-day');
        }
    }

    const buttons = document.querySelectorAll('.nav-row button');
    buttons[0].addEventListener('click', () => onCalendarButtonClick(true));
    buttons[1].addEventListener('click', () => onCalendarButtonClick(false));
    
    // list months in calendar
    function onCalendarButtonClick(isLeft) {
        currentMonth += isLeft ? -1 : 1;
        let directionClass = isLeft ? 'animate__fadeInLeft' : 'animate__fadeInRight';

        const object = document.querySelector('#calendar');
        object.style.animationDuration = '0.5s';
        object.classList.remove('animate__fadeInLeft', 'animate__fadeInRight');
        void object.offsetWidth;
        object.classList.add(directionClass);
        

        showCalendar();
        hideActiveElement('.event');
        hideActiveElement('.form');
    }

    function makeEffectOn(object, effect, duration) {
        object.style.animationDuration = `${duration}s`;
        object.classList.remove(effect);
        void object.offsetWidth;
        object.classList.add(effect);
    }

    document.querySelector('#save').addEventListener('click', () => {
        if(!lastCell) { return; }

        const eventName = document.querySelector('#eventName').value;
        localStorage.setItem(date, eventName);
        lastCell.classList.add('has-event');
        showEvent(eventName, date);
    });

    document.querySelector('#change').addEventListener('click', () => {
        hideActiveElement('.event');
        const eventNameInput = document.querySelector('#eventName');
        eventNameInput.value = localStorage.getItem(date);
        
        const form = document.querySelector('.form');
        form.classList.add('active');
    });

    document.querySelector('#delete').addEventListener('click', () => {
        if(!lastCell) { return; }

        hideActiveElement('.event');
        localStorage.removeItem(date);
        lastCell.classList.remove('has-event'); 
    });
});
