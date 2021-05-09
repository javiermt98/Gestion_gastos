export interface icuenta{
    id_cue:number,
    num_cue:number,  
    propietario:string,  
    nombre_cue:string,  
    saldo_cue:number,
    id_login:number;
}

export function cuentaVacia():icuenta{
    return{
        id_cue:0,
        num_cue:0,  
        propietario:'',  
        nombre_cue:'',  
        saldo_cue:0,
        id_login:0
    }
}

export function nuevacuenta(a,b,c,d,e,f):icuenta{
    return{
        id_cue:a,
        num_cue:b,  
        propietario:c,  
        nombre_cue:d,  
        saldo_cue:e,
        id_login:f
    }
}


export function CuentasToAJSON(data):any{
    return data["cuenta"].records.map((val) => {
            return {
            id_cue:		        val[0],
            num_cue:	        val[1],
            propietario:	    val[2],
            nombre_cue:	        val[3],
            saldo_cue:	        val[4],
            id_login:           val[5]
            }
    });               
}