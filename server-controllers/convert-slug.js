const nameDashToSpace=(str)=>{
    return str.trim().replace(/-/g, ' ').toLowerCase();
}
const convertNameUpperFirst=(str)=>{
    var arrS= str.split(" ") ;
    var rs ="" ;
    for(let i=0 ; i < arrS.length ; i++){
        for(let j=0 ; j<  arrS[i].length ; j++){
            if(j==0) rs+= arrS[i][0].toUpperCase() ;
            else{
                rs+= arrS[i][j].toLowerCase();
            }
        }
        rs+= " ";
    }
    rs=rs.trim();
    return rs ;
}

module.exports={
    nameDashToSpace,
    convertNameUpperFirst
}