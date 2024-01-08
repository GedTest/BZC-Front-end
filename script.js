document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('#calendar');
    let currentDate = new Date();

    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);

    const weekday = ["NE","PO","ÚT","ST","ČT","PÁ","SO"];

    function createCalendarGrid() {
        const daysContainer = document.createElement('div');
        daysContainer.classList.add('days');


        const rows = 5;
        const cols = 7;
        const gridCellCount = rows*cols;
        const emptyCellCount = gridCellCount - lastDayOfMonth.getDate();

        console.log(firstDayOfMonth.getDay());
        console.log(weekday[firstDayOfMonth.getDay()]);

        let weekdayCounter = 1;
        createCells(7).forEach(day => {
            day.innerText = weekday[weekdayCounter%7];
            weekdayCounter++;
            daysContainer.appendChild(day);
        });


        createCells(emptyCellCount).forEach(day => {
            daysContainer.appendChild(day);
        });

        let counter = 1;
        createCells(lastDayOfMonth.getDate()).forEach(day => {
            day.innerText = counter++;
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
