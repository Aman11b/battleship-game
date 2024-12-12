const Ship=(length)=>{
    let hits=0;

    const hit=()=>{
        if(hits<length){
            hits+=1;
        }
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