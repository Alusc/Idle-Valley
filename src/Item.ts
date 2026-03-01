
export enum ItemId {
    Hoe = "hoe",
    WateringCan = "wateringCan",
    Pickaxe = "pickaxe",
    Hand = "hand"
}

interface ItemData {
    sprite: string | null;
    width: number;
    height: number;
}

const ITEM_DATA: Record<ItemId, ItemData> = {
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
    constructor(public id: ItemId) {}

    get data(): ItemData {
        return ITEM_DATA[this.id];
    }
}