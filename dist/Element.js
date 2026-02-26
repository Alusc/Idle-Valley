export var ElementId;
(function (ElementId) {
    ElementId["Rock"] = "rock";
    ElementId["TallGrass"] = "tallGrass";
    ElementId["Empty"] = "empty";
})(ElementId || (ElementId = {}));
const ELEMENT_DATA = {
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
    constructor(id) {
        this.id = id;
    }
    get data() {
        return ELEMENT_DATA[this.id];
    }
}
