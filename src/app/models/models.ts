export interface Noticias{
    mensaje: string;
    encabezado: string;
    tiempo: Date;
    fecha: string;
    hora: string;
    id: string;
}

export interface Ingreso{
    email: string;
    password: string;
    id: string;
}

export interface RegistroN{
    titulo: string
    cuerpo: string
    id: string;
    data: string;
    tipo: string;
    tiempo: Date;
    fecha: string;
    hora: string
}

export interface Usuarios{
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    casa: string;
    fechanacimiento: string;
    foto: string;
    numidenti: string;
    uid: string;
    posi: boolean
}

export interface CardData {
  imageId: string;
  state: 'default' | 'flipped' | 'matched';
}

export interface Pagos{
    id: string;
    numcomprob: number;
    identifi: number;
    canti: number;
    tiempo: Date;
    estado: boolean;
    fecha: string;
    hora: string;
    uid: string;
    nombres: string;
    apellidos: string;
    motiv: string;
    causa: string
}

export interface Invitados{
    id: string;
    tiempo: Date;
    estado: boolean;
    fecha: string;
    hora: string;
    residente: string;
    rnombres: string;
    rapellidos: string;
    inombres: string;
    iapellidos: string;
    finvitado: boolean;
    cedula: number;
    tipo: string;
}

export interface RegistroPPrincipalInvi{
    id: string;
    uid: string;
    tiempo: Date;
    fecha: string;
    hora: string;
    nombres: string;
    apellidos: string;
    entrasali: string;
    auto?: string;
    cedula: number;
    tipo: string;
    tinvitado: string;
    finvitado: boolean,
    dia?: number;
    mes?: number;
    año?: number;
    sem?: number;
    wee?: number;
    qui?: number;
}

export interface RegistroPPrincipalResi{
    id: string;
    uid: string;
    tiempo: Date;
    fecha: string;
    hora: string;
    nombres: string;
    apellidos: string;
    tipo: string;
    entrasali: string;
    auto?: string;
    dia?: number;
    mes?: number;
    año?: number;
    sem?: number;
    wee?: number;
    qui?: number;
    numcasa: string
}

export interface Registro{
    id: string;
    uid: string;
    tiempo: Date;
    fecha: string;
    hora: string;
    nombres: string;
    apellidos: string;
    tipo: string;
    entrasali: string;
    auto?: string;
    cedula?: number;
    tinvitado?: string;
    finvitado: boolean;
    dia: number;
    mes: number;
    año: number;
    sem: number;
    wee: number;
    qui: number;
    numcasa?: string
}

export interface Horarios{
    id: string;
    tipo: string;
    tiempo: Date;
    cupo?: number;
    hinicial: string;
    hfinal: string;
}

export interface Modelo{
    id: string;
    hora: string;
    tipo: string;
    cupo: number;
    hinicial: string;
    hfinal: string;
}

export interface CupoDisponible{
    id: string;
    cupo: string;
    tipo: string;
}

export interface HorariosEsca{
    id: string;
    uid: string;
    idcupo: string;
    fecha: string;
    hora: string;
    tiempo: Date;
    hcupo: string;
    dispo: number;
    auto?: string;
    cant: number;
    hinicial: string;
    hfinal: string;
    nombres: string;
    apellidos: string;
    numcasa: string;
    resi: number;
    invi: number;
}

export interface Cupo{
    uid: string;
    hcupo: string;
    hora: string;
    fecha: string;
    tipo: string;
    tiempo: Date;
    cupos: boolean;
    hinicial: string;
    hfinal: string;
}

export interface Contador{
    cupo: number;
}

export interface Compromiso{
    id: string;
    idcupo: string;
    uid: string;
    hcupo: string;
    hora: string;
    fecha: string;
    tiempo: Date;
    cupo?: number;
    hinicial: string;
    hfinal: string;
    cant: number;
    nombres: string;
    apellidos: string;
    resi: number;
    invi: number;
    numcasa: string
}

export interface RegistroSResi{
    id: string;
    uid: string;
    tiempo: Date;
    fecha: string;
    hora: string;
    services: string;
    entrasali: string;
    auto?: string;
    nombres: string;
    apellidos: string;
    numcasa: string;
    resi: number;
    invi: number;
    dia: number;
    mes: number;
    año: number;
    sem: number;
    qui: number;

}

export interface RegistroCS{
    id: string;
    uid: string;
    tiempo: Date;
    fecha: string;
    hora: string;
    services: string;
    apartasino: string;
    nombres: string;
    apellidos: string;
    hinicial: string;
    hfinal: string;
    cant: number;
    resi: number;
    invi: number;
    numcasa: string;
    dia: number;
    mes: number;
    año: number;
    sem: number;
    qui: number;
}

export interface RePagos{
    id: string;
    estado: boolean;
    causa?: string;
    residente: string;
    canti: number;
    motiv: string;
    numcomprob: number;
    fechap: string;
    horap: string;
    tiempo: Date;
    fecha: string;
    hora: string;
}

export interface Dudas{
    id: string;
    uidresi: string;
    nomresi: string;
    apellresi: string;
    pregunta: string;
    respuesta: string;
    estado: boolean;
    fecha: string;
    hora: string;
    tiempo: Date;
}
