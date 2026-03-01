import { Element, ElementId } from "./Element.js";
import { Item, ItemId } from "./Item.js";

enum TerrainStatus {
    Grassy = "grassy",
    Dry = "dry",
    Wet = "wet"
}

export class Terrain {


    private elementDiv: HTMLDivElement;
    private imageElement: HTMLImageElement;;
    private currentStatus: TerrainStatus;
    private currentElement: Element;

    private grassGrowthCounter = 0;

    constructor() {
        this.elementDiv = document.createElement("div");
        this.elementDiv.classList.add("terrain");

        this.imageElement = document.createElement("img");
        this.imageElement.classList.add("overlay");
        this.elementDiv.appendChild(this.imageElement);

        this.currentStatus = TerrainStatus.Grassy;
        this.currentElement = this.randomElement();

        this.render();

    }

    get html(): HTMLDivElement {
        return this.elementDiv;
    }

    get status(): TerrainStatus {
        return this.currentStatus;
    }

    private randomElement(): Element {
        const rand = Math.random();
        if (rand < 0.2) return new Element(ElementId.Rock);
        if (rand < 0.4) return new Element(ElementId.TallGrass);
        return new Element(ElementId.Empty);
    }

    public click(usedItem: Item | null): void {
        if (usedItem) {

            if (this.currentElement.id === ElementId.Empty) {

                this.clickOnEmpty(usedItem);
            }
            else {

                this.clickOnElement(usedItem);

            }

            
            this.render();
            return;
        }
    }

    private clickOnEmpty(usedItem: Item): void {

        switch (this.status) {
            case TerrainStatus.Grassy:
                if (usedItem.id === ItemId.Hoe) {
                    this.currentStatus = TerrainStatus.Dry;
                }
                break;
            case TerrainStatus.Dry:
                if (usedItem.id === ItemId.WateringCan) {
                    this.currentStatus = TerrainStatus.Wet;
                }
                break;
        }

    }

    private clickOnElement(usedItem: Item): void {
        switch (usedItem.id) {
            case ItemId.Hoe:
                if (this.currentElement.id === ElementId.TallGrass) {
                    this.clearElement();  
                }
                break;
            case ItemId.Pickaxe:
                if (this.currentElement.id === ElementId.Rock) {
                    this.clearElement();
                }
                break;
            }
    }

    private clearElement(): void {
        this.currentElement = new Element(ElementId.Empty);
    }

    public nextDay(): void {
        if (this.currentStatus === TerrainStatus.Wet) {
            this.currentStatus = TerrainStatus.Dry;
            this.render();
            return
        }
        if (this.currentStatus === TerrainStatus.Dry) {
            this.grassGrowthCounter++;
            if (this.grassGrowthCounter >= 3) {
                this.currentStatus = TerrainStatus.Grassy;
                this.grassGrowthCounter = 0;
            }
            this.render();
            return
        }

    }

    private render(): void {
        this.imageElement.src = this.currentElement.data.sprite || "";
        
        const tileSize = 32; // Corresponde a --tile-size
        const widthRatio = this.currentElement.data.width / tileSize;
        const heightRatio = this.currentElement.data.height / tileSize;
        
        this.imageElement.style.width = `calc(var(--tile-size) * ${widthRatio})`;
        this.imageElement.style.height = `calc(var(--tile-size) * ${heightRatio})`;
        this.elementDiv.dataset.status = this.currentStatus;
    }
}