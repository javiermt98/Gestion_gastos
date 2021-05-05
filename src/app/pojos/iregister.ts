export interface iregister{
    id_login:number,
    nombre_log:string,
    apellidos_log:string,
    correo_log:string,
    nacimiento_log:Date;
    pwd_log:string;
}

export function registrovacio():iregister{
    return{
        id_login:0,
        nombre_log:'',
        apellidos_log:'',
        correo_log:'',
        nacimiento_log:new Date('1900/01/01'),
        pwd_log:''
    }
}

export function nuevoregistro(a,b,c,d,e,f):iregister{
    return{
        id_login:a,
        nombre_log:b,
        apellidos_log:c,
        correo_log:d,
        nacimiento_log:e,
        pwd_log:f
    }
}


export function RegistrosToAJSON(data):any{
    return data["login"].records.map((val) => {
        return {
            id_login:		    val[0],
            nombre_log:	        val[1],
            apellidos_log:	    val[2],
            correo_log:	        val[3],
            nacimiento_log:	    val[4],
            pwd_log:            val[5]
        }
    });               
}