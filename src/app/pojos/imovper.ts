export interface imovper{
    id_movper:number,
    periodicidad:number,  
    fecha_movper:string,  
    cantidad_movper:number,  
    id_cat:number,
    tipo_movper:number,
    descripcion_movper:string,

}

export function movperVacio():imovper{
    return{
        id_movper:0,
        periodicidad:0,  
        fecha_movper:'01/01/1999',  
        cantidad_movper:1,  
        id_cat:0,
        tipo_movper:0,
        descripcion_movper:''
    }
}

export function nuevomovper(a,b,c,d,e,f,g):imovper{
    return{
        id_movper:a,
        periodicidad:b,  
        fecha_movper:c,  
        cantidad_movper:d,  
        id_cat:e,
        tipo_movper:f,
        descripcion_movper:g,

    }
}


export function MovPerToAJSON(data):imovper[]{
    return data["movimientoperiodico"].records.map((val) => {
        return {
            id_movper:		        val[0],
            periodicidad:	        val[1],
            fecha_movper:	        new Date(val[2]),
            cantidad_movper:	    val[3],
            id_cat:                 val[4],
            tipo_movper:            val[5],
            descripcion_movper:     val[6]
            }
    });               
}