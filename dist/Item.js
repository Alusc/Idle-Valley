export var ItemId;
(function (ItemId) {
    ItemId["Hoe"] = "hoe";
    ItemId["WateringCan"] = "wateringCan";
    ItemId["Pickaxe"] = "pickaxe";
    ItemId["Hand"] = "hand";
})(ItemId || (ItemId = {}));
const ITEM_DATA = {
    [ItemId.Hoe]: {
        sprite: "assets/sprites/Hoe.png",
        width: 48,
        height: 48
    },
    [ItemId.WateringCan]: {
        sprite: "assets/sprites/WateringCan.png",
        width: 48,
        height: 48
    },
    [ItemId.Pickaxe]: {
        sprite: "assets/sprites/Pickaxe.png",
        width: 48,
        height: 48
    },
    [ItemId.Hand]: {
        sprite: "assets/sprites/Hand.png",
        width: 32,
        height: 32
    }
};
export class Item {
    constructor(id) {
        this.id = id;
    }
    get data() {
        return ITEM_DATA[this.id];
    }
}
