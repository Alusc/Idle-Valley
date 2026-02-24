enum TerrainStatus {
    Grassy = "grassy",
    Dry = "dry",
    Wet = "wet"
}

enum TerrainElement {
    Rock = "rock",
    TallGrass = "tallGrass",
    Empty = "empty"
}


export class Terrain {

    private element: HTMLDivElement;
    private _status: TerrainStatus;
    private _element: TerrainElement;

    constructor() {
        this.element = document.createElement("div");
        this.element.classList.add("terrain");

        this._status = TerrainStatus.Grassy;
        this._element = this.randomElement();

        this.render();
        this.element.addEventListener("click", () => this.click());
    }

    get html(): HTMLDivElement {
        return this.element;
    }

    get status(): TerrainStatus {
        return this._status;
    }

    private randomElement(): TerrainElement {
        const rand = Math.random();
        if (rand < 0.2) return TerrainElement.Rock;
        if (rand < 0.4) return TerrainElement.TallGrass;
        return TerrainElement.Empty;
    }

    private click(): void {
        if (this._element === TerrainElement.Rock ||
            this._element === TerrainElement.TallGrass) {

            this._element = TerrainElement.Empty;
            this.render();
            return;
        }

        switch (this._status) {
            case TerrainStatus.Grassy:
                this._status = TerrainStatus.Dry;
                break;
            case TerrainStatus.Dry:
                this._status = TerrainStatus.Wet;
                break;
        }

        this.render();
    }

    public nextDay(): void {
        if (this._status === TerrainStatus.Wet) {
            this._status = TerrainStatus.Dry;
            this.render();
        }
    }

    private render(): void {
        this.element.dataset.status = this._status;
        this.element.dataset.element = this._element;
    }
}