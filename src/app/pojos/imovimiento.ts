export interface imovimiento{
    id_mov:number,
    descripcion_mov:string,  
    fecha_mov:string,  
    cantidad_mov:number,  
    id_cue:number,
    id_cat:number,
    tipo_mov:number,

}

export function movimientoVacio():imovimiento{
    return{
        id_mov:0,
        descripcion_mov:'',  
        fecha_mov:'01/01/1999',  
        cantidad_mov:1,  
        id_cue:0,
        id_cat:0,
        tipo_mov:0
    }
}

export function nuevomovimiento(a,b,c,d,e,f,g):imovimiento{
    return{
        id_mov:a,
        descripcion_mov:b,  
        fecha_mov:c,  
        cantidad_mov:d,  
        id_cue:e,
        id_cat:f,
        tipo_mov:g,

    }
}


export function MovimientoToAJSON(data):any{
    return data["movimiento"].records.map((val) => {
        return {
            id_mov:		        val[0],
            descripcion_mov:	val[1],
            fecha_mov:	        val[2],
            cantidad_mov:	    val[3],
            id_cue:	            val[4],
            id_cat:             val[5],
            tipo_mov:           val[6]
            }
    });               
}