import { experiments } from 'webpack';
import Ship from '../src/ship.js';

describe('Ship factory',()=>{
    test('created ship with correct length',()=>{
        const ship=Ship(4);
        expect(ship.length).toBe(4);
    });

    test('hit() record hits',()=>{
        const ship=Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.hits()).toBe(2);
    });

    test('isSunk() return true if all positions are hit',()=>{
        const ship=Ship(2);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe( true);
    });

    test('isSunk() return false if not all positions are hit',()=>{
        const ship=Ship(3);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    test('isSunk() return true if all positions are hit',()=>{
        const ship=Ship(3);
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(false);

        ship.hit();
        expect(ship.isSunk()).toBe(true);
    })

    test('A ship should not be hit more then its length',()=>{
        const ship=Ship(2);
        ship.hit();
        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(true);
        expect(ship.hits()).toBe(2);
    });
});