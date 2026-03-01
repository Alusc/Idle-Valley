import { Element, ElementId } from "./Element.js";
import { ItemId } from "./Item.js";
var TerrainStatus;
(function (TerrainStatus) {
    TerrainStatus["Grassy"] = "grassy";
    TerrainStatus["Dry"] = "dry";
    TerrainStatus["Wet"] = "wet";
})(TerrainStatus || (TerrainStatus = {}));
export class Terrain {
    ;
    constructor() {
        this.grassGrowthCounter = 0;
        this.elementDiv = document.createElement("div");
        this.elementDiv.classList.add("terrain");
        this.imageElement = document.createElement("img");
        this.imageElement.classList.add("overlay");
        this.elementDiv.appendChild(this.imageElement);
        this.currentStatus = TerrainStatus.Grassy;
        this.currentElement = this.randomElement();
        this.render();
    }
    get html() {
        return this.elementDiv;
    }
    get status() {
        return this.currentStatus;
    }
    randomElement() {
        const rand = Math.random();
        if (rand < 0.2)
            return new Element(ElementId.Rock);
        if (rand < 0.4)
            return new Element(ElementId.TallGrass);
        return new Element(ElementId.Empty);
    }
    click(usedItem) {
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
    clickOnEmpty(usedItem) {
        switch (this.status) {
            case TerrainStatus.Grassy:
                if (usedItem.id === ItemId.Hoe) {
                    this.currentStatus = TerrainStatus.Dry;
                }
            case TerrainStatus.Dry:
                if (usedItem.id === ItemId.WateringCan) {
                    this.currentStatus = TerrainStatus.Wet;
                }
        }
    }
    clickOnElement(usedItem) {
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
    clearElement() {
        this.currentElement = new Element(ElementId.Empty);
    }
    nextDay() {
        if (this.currentStatus === TerrainStatus.Wet) {
            this.currentStatus = TerrainStatus.Dry;
            this.render();
            return;
        }
        if (this.currentStatus === TerrainStatus.Dry) {
            this.grassGrowthCounter++;
            if (this.grassGrowthCounter >= 3) {
                this.currentStatus = TerrainStatus.Grassy;
                this.grassGrowthCounter = 0;
            }
            this.render();
            return;
        }
    }
    render() {
        this.imageElement.src = this.currentElement.data.sprite || "";
        const tileSize = 32; // Corresponde a --tile-size
        const widthRatio = this.currentElement.data.width / tileSize;
        const heightRatio = this.currentElement.data.height / tileSize;
        this.imageElement.style.width = `calc(var(--tile-size) * ${widthRatio})`;
        this.imageElement.style.height = `calc(var(--tile-size) * ${heightRatio})`;
        this.elementDiv.dataset.status = this.currentStatus;
    }
}
