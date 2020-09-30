const Player = require('../lib/Player');
const Potion = require('../lib/Potion');
jest.mock('../lib/Potion');
console.log(new Potion());

test('creates a player object', () => {
    const player = new Player('Allison');

    expect(player.name).toBe('Allison');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test('gets a players stats as an object', () => {
    const player = new Player('Allison');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Allison');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test('gets players health value' , () => {
    const player = new Player('Allison');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

test('checks if a player is alive or not' , () => {
    const player = new Player('Allison');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test('subtracts from players health' , () => {
    const player = new Player('Allison');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);
    expect(player.health).toBe(0);
});

test('gets player attack value' , () => {
    const player = new Player ('Allison');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test('checks if potion was added correctly', () => {
    const player = new Player('Allison');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', ()=> {
    const player = new Player('Allison');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
})