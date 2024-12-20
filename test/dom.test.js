import { renderBoard } from "../src/dom";
describe('dom testing',()=>{
    test('render a 10X10 grid',()=>{
        const container=document.createElement('div');
        renderBoard(container);

        const rows=container.querySelectorAll('.row');
        expect(rows.length).toBe(10);

        rows.forEach(row=>{
            const cells=row.querySelectorAll('.cell');
            expect(cells.length).toBe(10);
        });
    });
})