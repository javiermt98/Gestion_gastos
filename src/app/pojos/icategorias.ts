export interface icategoria{
    id_cat:number,
    nombre_cat:string,
    max_gasto_cat:number,
    icono_cat:string,
    id_cat_padre?:number,
    id_cue:number,
    total_cat?:number,
}

export function categoriavacia():icategoria{
    return{
    id_cat:0,
    nombre_cat:"",
    max_gasto_cat:0,
    icono_cat:"",
    id_cat_padre:null,
    id_cue:0
    }
}

export function nuevacategoria(a,b,c,d,e,f):icategoria{
    return{
    id_cat:a,
    nombre_cat:b,
    max_gasto_cat:c,
    icono_cat:d,
    id_cat_padre:e,
    id_cue:f
    }
}


export function CategoriasToAJSON(data):any{
    return data["categoria"].records.map((val) => {
            return {
            id_cat:		        val[0],
            nombre_cat:	        val[1],
            max_gasto_cat:	    val[2],
            icono_cat:	        val[3],
            id_cat_padre:	    val[4],
            id_cue:             val[5],
            total_cat:          0,
            }
    });               
}