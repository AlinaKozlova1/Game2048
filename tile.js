export class Tile {
    constructor(gridElement) { //чтобы мы могли добавить плиточку во внутрь div game-board
        this.tileElement = document.createElement("div"); //создадим пустой div элемент и сохраним его в tileElement
        this.tileElement.classList.add("tile"); //добавляем div элементу класс еile
        this.setValue(Math.random() > 0.5 ? 2 : 4);
        gridElement.append(this.tileElement); //добавляем созданный div эл внутрь game-board
    }
    
    setXY(x, y) { //меняет значения внутри х и у на новые
        this.x = x;  
        this.y = y;
        this.tileElement.style.setProperty("--x", x); // а еще будет менять значения --х и --у в ссs стилях
        this.tileElement.style.setProperty("--y", y);
    }
    
    setValue(value) {
        this.value = value;
        this.tileElement.textContent = value; // полученное значение нужно добавить текстом в div элементы
        const bgLightness = 100 - Math.log2(value) * 9; // 2 -> 100 - 1*9; 2048 -> 100 - 11*9 -> 1
        this.tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`); //записыванм получ згач
        this.tileElement.style.setProperty("--text-lightness", `${bgLightness < 50 ? 90 : 10}%`); // if bgLightness < 50 -> 90, else 10
    }

    removeFromDOM() {
        this.tileElement.remove();
    }

    waitForTransitionEnd() { //возвращает promise, который завершится, когда закончится анимация перемещения
        return new Promise(resolve => {
            this.tileElement.addEventListener("transitionend", resolve, { once: true });
        });
    }
    
    waitForAnimationEnd() { //возвращает promise, который завершится, когда закончится анимация перемещения
        return new Promise(resolve => {
            this.tileElement.addEventListener("animationend", resolve, { once: true });
        });
    }
    
    


}