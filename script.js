document.addEventListener('DOMContentLoaded', () => {    
    const calendar = document.querySelector('#calendar');
    let currentDate = new Date();
    
    let currentMonth = 2;
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()+(currentMonth+1), 0);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()+currentMonth, 1);

    const weekday = ["NE","PO","ÚT","ST","ČT","PÁ","SO"];

    function createCalendarGrid() {
        const daysContainer = document.createElement('div');
        daysContainer.classList.add('days');

        // header
        let weekdayCounter = 1;
        createCells(7).forEach(day => {
            day.innerText = weekday[weekdayCounter%7];
            weekdayCounter++;
            daysContainer.appendChild(day);
        });
        
                
        
        const rows = 6;
        const cols = 7;
        const gridCellCount = rows*cols;
        const firstEmptyCellCount = (firstDayOfMonth.getDay() + 6) % 7;

        console.log(firstDayOfMonth.getDay());
        console.log(firstEmptyCellCount);
        console.log(firstDayOfMonth)

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
    createCalendarGrid();

    function createCells(count) {
        const cells = [];
        for(let i = 0; i < count; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            cells.push(day);
        }
        return cells;
    }
});
