export interface icategoria{
    id_cat:number,
    nombre_cat:string,
    max_gasto_cat:number,
    icono_cat:string,
    id_cat_padre?:number;
}

export function nuevacategoria():icategoria{
    return{
    id_cat:0,
    nombre_cat:"",
    max_gasto_cat:0,
    icono_cat:"",
    id_cat_padre:null,
    }
}