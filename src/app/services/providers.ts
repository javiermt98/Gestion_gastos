import { Injectable, Output, EventEmitter } from '@angular/core';
import { icuenta } from '../pojos/icuenta';

@Injectable()

export class providers{

    public cuentaactiva = [
        {num_cue:123,  propietario:"Javier",  nombre_cue:"Cuenta Principal",  saldo_cue:10000}
    ]

    @Output() changecuentaactiva: EventEmitter<icuenta> = new EventEmitter<icuenta>();

}