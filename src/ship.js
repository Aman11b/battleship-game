const Ship=(length)=>{
    let hits=0;

    const hit=()=>{
        hits++;
    };

    const isSunk=()=>hits>=length;

    return{
        length,
        hits:()=>hits,
        hit,
        isSunk
    };
};

export default Ship;