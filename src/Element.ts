
export enum ElementId {
    Rock = "rock",
    TallGrass = "tallGrass",
    Empty = "empty"
}

interface ElementData {
    sprite: string | null;
    width: number;
    height: number;
}

const ELEMENT_DATA: Record<ElementId, ElementData> = {
    [ElementId.Rock]: {
        sprite: "sprites/Rock.png",
        width: 36,
        height: 36
    },
    [ElementId.TallGrass]: {
        sprite: "sprites/TallGrass.png",
        width: 64,
        height: 64
    },
    [ElementId.Empty]: {
        sprite: null,
        width: 0,
        height: 0
    }
};

export class Element {
    constructor(public id: ElementId) {}

    get data(): ElementData {
        return ELEMENT_DATA[this.id];
    }
}