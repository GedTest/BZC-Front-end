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
    }
    function createCalendarGrid() {
        daysContainer.innerHTML = '';
        
        const weekday = ["NE","PO","ÚT","ST","ČT","PÁ","SO"];

        // header
        let weekdayCounter = 1;
        createCells(weekday.length).forEach(day => {
            day.innerText = weekday[weekdayCounter%7];
            weekdayCounter++;
            daysContainer.appendChild(day);
        });
        
                
        
        const rows = 6;
        const cols = 7;
        const gridCellCount = rows*cols;
        const firstEmptyCellCount = (firstDayOfMonth.getDay() + 6) % 7;

        createCells(firstEmptyCellCount).forEach(day => {
            day.classList.add('empty');
            daysContainer.appendChild(day);
        });

        let counter = 1;
        createCells(lastDayOfMonth.getDate()).forEach(day => {
            day.innerText = counter++;
            daysContainer.appendChild(day);
        });


        const c = gridCellCount - lastDayOfMonth.getDate() - firstEmptyCellCount;
        createCells(c).forEach(day => {
            day.classList.add('empty');
            daysContainer.appendChild(day);
        });

        calendar.appendChild(daysContainer);
    }
    

    function createCells(count) {
        const cells = [];
        for(let i = 0; i < count; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
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
        calendar.removeChild(daysContainer);
        showCalendar();
    }
});
