export interface icuenta{
    num_cue:number,  
    propietario:string,  
    nombre_cue:string,  
    saldo_cue:number
}

export function cuentaVacia():icuenta{
    return{
        num_cue:0,  
        propietario:'',  
        nombre_cue:'',  
        saldo_cue:0
    }
}

export function nuevacuenta(a,b,c,d):icuenta{
    return{
        num_cue:a,  
        propietario:b,  
        nombre_cue:c,  
        saldo_cue:d
    }
}


export function CategoriasToAJSON(data):any{
    return data["productos"].records.map((val) => {
            return {
            id_cat:		val[0],
            nombre_cat:	        val[1],
            max_gasto_cat:	    val[2],
            icono_cat:	        val[3],
            id_cat_padre:	    val[5],
            }
    });               
}