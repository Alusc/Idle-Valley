import { Terrain } from "./Terrain.js";
export class Game {
    constructor() {
        this.terrains = [];
        this.day = 1;
        this.grid = document.querySelector(".grid");
        this.dayElement = document.querySelector(".day-div>p");
        this.nextDayButton = document.querySelector(".day-div>button");
        this.createGrid();
        this.nextDayButton.addEventListener("click", () => this.nextDay());
    }
    createGrid() {
        for (let i = 0; i < Game.GRID_SIZE * Game.GRID_SIZE; i++) {
            const terrain = new Terrain();
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
