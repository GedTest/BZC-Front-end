document.addEventListener('DOMContentLoaded', () => {    
    const calendar = document.querySelector('#calendar');
    const daysContainer = document.querySelector('.container');
    let currentDate = new Date();
    
    let currentMonth = 11;


    let lastDayOfMonth = 1;
    let firstDayOfMonth = 30;


    function showCalendar() {
        lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()+(currentMonth+1), 0);
        firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()+currentMonth, 1);


        const months = [
            "Leden","Únor","Březen",
            "Duben","Květen","Červen",
            "Červenec","Srpen","Září",
            "Říjen","Listopad","Prosinec"
        ];
        const month = document.querySelector('#monthYear')
        month.innerText = `${months[firstDayOfMonth.getMonth()]} ${firstDayOfMonth.getFullYear()}`;

        createCalendarGrid();
        colorCells();
    }

    function createCalendarGrid() {
        daysContainer.innerHTML = '';
        
        const weekday = ["NE","PO","ÚT","ST","ČT","PÁ","SO"];

        // header
        let weekdayCounter = 1;
        createCells(weekday.length, 'header').forEach(day => {
            day.innerText = weekday[weekdayCounter%7];
            weekdayCounter++;
            daysContainer.appendChild(day);
        });
        
                
        
        const rows = 6;
        const cols = weekday.length;
        const gridCellCount = rows*cols;
        const firstEmptyCellCount = (firstDayOfMonth.getDay() + 6) % 7;

        createCells(firstEmptyCellCount, 'empty').forEach(day => {
            daysContainer.appendChild(day);
        });

        let counter = 1;
        createCells(lastDayOfMonth.getDate(), 'day').forEach(day => {
            day.innerText = counter++;
            daysContainer.appendChild(day);
        });


        const c = gridCellCount - lastDayOfMonth.getDate() - firstEmptyCellCount;
        createCells(c, 'empty').forEach(day => {
            daysContainer.appendChild(day);
        });
    }
    
    function createCells(count, cssClass) {
        const cells = [];
        for(let i = 0; i < count; i++) {
            const day = document.createElement('div');
            day.classList.add(cssClass);
            if(cssClass === 'day') {
                day.addEventListener('click', onCellClick);
            }
            cells.push(day);
        }
        return cells;
    }
    showCalendar();

    const buttons = document.querySelectorAll('button');
    buttons[0].addEventListener('click', () => onCalendarButtonClick(true));
    buttons[1].addEventListener('click', () => onCalendarButtonClick(false));

    function onCalendarButtonClick(isLeft) {
        if(isLeft) { currentMonth--; }
        else { currentMonth++; }
        showCalendar();
    }








    let dayCell = null;
    function onCellClick() {
        
        const day = this.innerText;
        const year = firstDayOfMonth.getFullYear();
        const month = firstDayOfMonth.getMonth();
        const date = `${year}-${month}-${day}`;
        
        const event = localStorage.getItem(date);
        
        if (event) {
            showEvent();            
        }
        else {
            showForm();
            dayCell = this;
        }
        
    }

    function showForm() {
        const form = document.querySelector('.form');
        form.style.display = (form.style.display === 'block' && dayCell === this) ? '' : 'block';


        document.querySelector('#save').addEventListener('click', _ => {
            const eventNameInput = document.querySelector('#eventName');
            const eventName = eventNameInput.value;
            localStorage.setItem(date, eventName);

            dayCell.classList.add('event');
        });
    }

    function showEvent() {
        const eventDiv = document.querySelector('.event');
        const eventTitle = document.querySelector('#title');
        const eventDate = document.querySelector('#date');

        eventDiv.classList.remove('active');
        eventTitle.innerText = '';
        eventDate.innerText = '';

        eventDiv.classList.add('active');
        eventTitle.innerText = event;
        eventDate.innerText = date;
    }
    


    function colorCells() {
        for (let i = 0; i < lastDayOfMonth.getDate(); i++) {
            const year = firstDayOfMonth.getFullYear();
            const m = firstDayOfMonth.getMonth();
            const date = `${year}-${m}-${i + 1}`;

            
            const event = localStorage.getItem(date);
            if (event) {
                const dayElement = daysContainer.children[i + 7 + ((firstDayOfMonth.getDay() + 6) % 7)];
                dayElement.classList.add('event');
            }
        }
    }
    
});
