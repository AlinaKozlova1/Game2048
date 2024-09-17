export class Cell{
    constructor (gridElement, x, y) {
        const cell = document.createElement("div"); // создаем пустой div элемент и кладём в cell
        cell.classList.add("cell"); //добавляем div элементу класс cell
        gridElement.append(cell);//div элемент добавляем внутрь div-gameboard
        this.x = x;
        this.y = y;
    }

    linkTile(tile) {//метод будет сохранять плиточку внутри ячейки
        tile.setXY(this.x, this.y);
        this.linkedTile = tile;
    }

    unlinkTile() {
        this.linkedTile = null;
    }

    isEmpty() { //возвращает false/true в зависимлсти есть привязанная плиточка или нет
        return !this.linkedTile;
    }


    linkTileForMerge(tile){ //меняет координаты плиточки
        tile.setXY(this.x, this.y);
        this.linkedTileForMerge = tile;
    }

    unlinkTileForMerge() {
        this.linkedTileForMerge = null;
    }

    hasTileForMerge() {
        return !!this.linkedTileForMerge;
    }

    canAccept(newTile) {
        return (
            this.isEmpty() || 
            (!this.hasTileForMerge() && this.linkedTile.value === newTile.value)
        );
    }

    mergeTiles() {
        this.linkedTile.setValue(this.linkedTile.value + this.linkedTileForMerge.value);
        this.linkedTileForMerge.removeFromDOM();
        this.unlinkTileForMerge();
    }
}