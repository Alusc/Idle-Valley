import { Terrain } from "./Terrain.js";
import { Item, ItemId } from "./Item.js";
class ItemElement extends HTMLImageElement {
    constructor() {
        super(...arguments);
        this.itemInstance = null;
    }
}
export class Game {
    constructor() {
        this.terrains = [];
        this.day = 1;
        this.body = document.body;
        this.grid = document.querySelector(".grid");
        this.dayElement = document.querySelector(".day-div>p");
        this.nextDayButton = document.querySelector(".day-div>button");
        this.itemsDiv = document.querySelector(".items-div");
        this.currentItemElement = null;
        this.currentItem = null;
        this.coinsElement = document.querySelector(".coin-div>.coins");
        this.coins = 0;
        this.createInitialItems();
        this.createGrid();
        this.nextDayButton.addEventListener("click", () => this.nextDay());
    }
    selectItemElement(elementItem) {
        if (this.currentItemElement) {
            this.currentItemElement.classList.remove("selected-item");
        }
        this.currentItemElement = elementItem;
        this.currentItemElement.classList.add("selected-item");
        this.currentItem = elementItem.itemInstance;
        this.body.style.cursor = this.currentItem?.data.sprite
            ? `url(${this.currentItem.data.sprite}), auto`
            : "auto";
        console.log(`Item selecionado: ${this.currentItem?.id}`);
    }
    createInitialItems() {
        const hand = new Item(ItemId.Hand);
        const hoe = new Item(ItemId.Hoe);
        const wateringCan = new Item(ItemId.WateringCan);
        const pickaxe = new Item(ItemId.Pickaxe);
        const items = [hand, hoe, wateringCan, pickaxe];
        items.forEach((item) => {
            const img = document.createElement("img");
            img.src = item.data.sprite;
            img.alt = item.id;
            img.itemInstance = item;
            img.addEventListener("click", () => this.selectItemElement(img));
            if (item.id === ItemId.Hand) {
                this.selectItemElement(img);
            }
            this.itemsDiv.appendChild(img);
        });
    }
    createGrid() {
        for (let i = 0; i < Game.GRID_SIZE * Game.GRID_SIZE; i++) {
            const terrain = new Terrain();
            terrain.html.addEventListener("click", () => {
                terrain.click(this.currentItem);
            });
            this.grid.appendChild(terrain.html);
            this.terrains.push(terrain);
        }
    }
    nextDay() {
        this.day++;
        this.dayElement.textContent = `Day ${this.day}`;
        this.terrains.forEach(t => t.nextDay());
    }
}
Game.GRID_SIZE = 12;
