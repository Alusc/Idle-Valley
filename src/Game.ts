import { Terrain } from "./Terrain.js";

export class Game {

    private static readonly GRID_SIZE = 12;

    private terrains: Terrain[] = [];
    private day = 1;

    private grid = document.querySelector(".grid") as HTMLDivElement;
    private dayElement = document.querySelector(".day-div>p") as HTMLParagraphElement;
    private nextDayButton = document.querySelector(".day-div>button") as HTMLButtonElement;

    constructor() {
        this.createGrid();
        this.nextDayButton.addEventListener("click", () => this.nextDay());
    }

    private createGrid(): void {
        for (let i = 0; i < Game.GRID_SIZE * Game.GRID_SIZE; i++) {
            const terrain = new Terrain();
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