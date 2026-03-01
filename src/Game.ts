import { Terrain } from "./Terrain.js";
import { Item, ItemId } from "./Item.js";

class ItemElement extends HTMLImageElement {
    itemInstance: Item | null = null;
}

export class Game {

    private static readonly GRID_SIZE = 12;

    private terrains: Terrain[] = [];
    private day = 1;

    private readonly body = document.body;

    private grid = document.querySelector(".grid") as HTMLDivElement;
    private dayElement = document.querySelector(".day-div>p") as HTMLParagraphElement;
    private nextDayButton = document.querySelector(".day-div>button") as HTMLButtonElement;

    private itemsDiv = document.querySelector(".items-div") as HTMLDivElement;
    private currentItem: Item | null = null;

    constructor() {
        this.createInitialItems();
        this.createGrid();
        this.nextDayButton.addEventListener("click", () => this.nextDay());
    }

    private selectItemElement(elementItem: ItemElement): void {
        this.currentItem = elementItem.itemInstance;
        this.body.style.cursor = this.currentItem?.data.sprite
            ? `url(${this.currentItem.data.sprite}), auto`
            : "auto";
        console.log(`Item selecionado: ${this.currentItem?.id}`);
    }

    private createInitialItems(): void {
        const hand = new Item(ItemId.Hand);
        const hoe = new Item(ItemId.Hoe);
        const wateringCan = new Item(ItemId.WateringCan);
        const pickaxe = new Item(ItemId.Pickaxe);

        const items = [hand, hoe, wateringCan, pickaxe];
        
        items.forEach((item) => {
            const img = document.createElement("img") as ItemElement;
            img.src = item.data.sprite!;
            img.alt = item.id;
            img.style.cursor = "pointer";
            img.style.width = item.data.width + "px";
            img.style.height = item.data.height + "px";
            

            img.itemInstance = item;
            
            img.addEventListener("click", () => this.selectItemElement(img));
            if (item.id === ItemId.Hand) {
                this.selectItemElement(img);
            }
            
            this.itemsDiv.appendChild(img);
        });
    }

    private createGrid(): void {
        for (let i = 0; i < Game.GRID_SIZE * Game.GRID_SIZE; i++) {
            const terrain = new Terrain();
            terrain.html.addEventListener("click", () => {
                terrain.click(this.currentItem);
            });
            this.grid.appendChild(terrain.html);
            this.terrains.push(terrain);
        }
    }

    private nextDay(): void {
        this.day++;
        this.dayElement.textContent = `Day ${this.day}`;

        this.terrains.forEach(t => t.nextDay());
    }
}