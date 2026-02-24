var TerrainStatus;
(function (TerrainStatus) {
    TerrainStatus["Grassy"] = "grassy";
    TerrainStatus["Dry"] = "dry";
    TerrainStatus["Wet"] = "wet";
})(TerrainStatus || (TerrainStatus = {}));
var TerrainElement;
(function (TerrainElement) {
    TerrainElement["Rock"] = "rock";
    TerrainElement["TallGrass"] = "tallGrass";
    TerrainElement["Empty"] = "empty";
})(TerrainElement || (TerrainElement = {}));
export class Terrain {
    constructor() {
        this.element = document.createElement("div");
        this.element.classList.add("terrain");
        this._status = TerrainStatus.Grassy;
        this._element = this.randomElement();
        this.render();
        this.element.addEventListener("click", () => this.click());
    }
    get html() {
        return this.element;
    }
    get status() {
        return this._status;
    }
    randomElement() {
        const rand = Math.random();
        if (rand < 0.2)
            return TerrainElement.Rock;
        if (rand < 0.4)
            return TerrainElement.TallGrass;
        return TerrainElement.Empty;
    }
    click() {
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
    nextDay() {
        if (this._status === TerrainStatus.Wet) {
            this._status = TerrainStatus.Dry;
            this.render();
        }
    }
    render() {
        this.element.dataset.status = this._status;
        this.element.dataset.element = this._element;
    }
}
