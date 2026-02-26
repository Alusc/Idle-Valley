import { Element, ElementId } from "./Element.js";

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

        this.elementDiv.addEventListener("click", () => this.click());
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

    private click(): void {
        if (this.currentElement.id === ElementId.Rock ||
            this.currentElement.id === ElementId.TallGrass) {

            this.currentElement = new Element(ElementId.Empty);
            
            this.render();
            return;
        }

        switch (this.currentStatus) {
            case TerrainStatus.Grassy:
                this.currentStatus = TerrainStatus.Dry;
                break;
            case TerrainStatus.Dry:
                this.currentStatus = TerrainStatus.Wet;
                break;
        }

        this.render();
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