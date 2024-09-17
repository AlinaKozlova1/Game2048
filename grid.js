import { Cell } from "./cell.js";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
    constructor(gridElement) { //вызывается один раз в начале
        this.cells = [];
        for (let i = 0; i < CELLS_COUNT; i++) {
            this.cells.push(
                new Cell(gridElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE)) // gridElement нужен, чтобы мы могли добавить ячейку внутрь div game-board
            );           
        }

        this.cellsGroupedByColumn = this.groupCellsByColumn();
        this.cellsGroupedByReversedColumn = this.cellsGroupedByColumn.map(column => [...column].reverse());
        this.cellsGroupedByRow = this.groupCellsByRow();
        this.cellsGroupedByReversedRow = this.cellsGroupedByRow.map(row => [...row].reverse());
    }

    getRandomEmptyCell() {
        const emptyCells = this.cells.filter(cell => cell.isEmpty());//это ещё шо за синтаксис
        const randomIndex = Math.floor(Math.random() * emptyCells.length); //получаем рандомное число 0 до длины массива, не включая длину массива
        return emptyCells[randomIndex];
    }

    groupCellsByColumn() {
        return this.cells.reduce((groupedCells, cell) => { //https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
            groupedCells[cell.x] = groupedCells[cell.x] || []; //сделали массив с массивами
            groupedCells[cell.x][cell.y] = cell;
            return groupedCells;
        }, []); //
    }

    groupCellsByRow() {
        return this.cells.reduce((groupedCells, cell) => { 
            groupedCells[cell.y] = groupedCells[cell.y] || []; 
            groupedCells[cell.y][cell.x] = cell;
            return groupedCells;
        }, []); //
    }
}
