import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Horarios, Cupo, Compromiso, Modelo, RegistroCS, Usuarios } from 'src/app/models/models';
import { FirebaseauthService } from 'src/app/services/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-vspiscina',
  templateUrl: './vspiscina.component.html',
  styleUrls: ['./vspiscina.component.scss'],
})
export class VspiscinaComponent implements OnInit {

  @Input() modelos: Modelo;

  horarios: Horarios[]=[];

  usuarios: Usuarios[]=[];
  usuario: Usuarios = {
    nombres: '',
    apellidos: '',
    email: '',
    password: '',
    casa: '',
    fechanacimiento: '',
    foto: '',
    uid: '',
    numidenti: null,
    posi: null
  };

  resi: number = null;

  invi: number = null;

  cuponuevo = false;

  constructor(
    public firestoreService: FirestoreService,
    private interaction: InteractionService,
    public alertController: AlertController,
    public firebaseauthService: FirebaseauthService,
    ) { }

  ngOnInit() {
    this.loadCupo();
    this.getHorarios();
    this.getUsuario();
  }

  getHorarios(){
    const path = 'Horarios';
    const service = 'Piscina';
    this.firestoreService.getCollectionUnicDesc<Horarios>(path, 'tipo', service).subscribe( res =>{
      this.horarios = res;
      console.log(res);
    });
  }

  async getUsuario(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'Usuarios';
    this.firestoreService.getCollectionUnic<Usuarios>(path, 'uid', uid).subscribe(res => {
      this.usuarios = res;
    });
  }

  async apartarCupo(nuevos: Modelo, resi: number, invi: number, nuevo: Usuarios){
    const uid = await this.firebaseauthService.getUid();
    const path = 'MoldeHorarios/Piscina/cupo';
    const data: Cupo = {
      uid,
      hcupo: nuevos.hinicial+' - '+nuevos.hfinal,
      tipo: 'Piscina',
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      tiempo: new Date(),
      hinicial: nuevos.hinicial,
      hfinal: nuevos.hfinal,
      cupos: !this.cuponuevo
    };
    if(nuevos.hinicial===''){
      this.interaction.presentToast('Digite la Hora de Entrada');
    }else if(nuevos.hfinal===''){
      this.interaction.presentToast('Digite la hora de Salida');
    }else  if(resi===null){
      this.interaction.presentToast('Digite la cantidad de residentes que iran');
    }else if(resi<invi){
      this.interaction.presentToast('Los invitados deben ser menos o igual que residentes');
    }else if(resi>=invi){
      this.interaction.presentLoading('Apartando cupos...');
      this.firestoreService.createDoc(data, path, uid).then( async res => {
        if(data.cupos == true){
          let numinvi = 0;
          if(invi!=null){
            numinvi = invi;
          }
          const sum = resi + numinvi
          this.interaction.closeLoading();
          this.interaction.presentToast('Aparto '+sum+' cupos');
        }
        console.log('Inicio', data.hinicial);
        console.log('Final', data.hfinal);
        console.log('Subido con exito', res);
      }).catch( error => {
        this.interaction.presentToast('Un error ha ocurrido');
        console.log('Un error ha ocurrido: ', error);
      });
      this.addCompromisos(data.cupos, nuevos, resi, invi, nuevo);
      this.addCompromisoRegis(data.cupos, nuevos, resi, invi, nuevo);
      this.addCupo(data.cupos, resi, invi,);
    }
  }

  async loadCupo(){
    const uid = await this.firebaseauthService.getUid();
    const path = 'MoldeHorarios/Piscina/cupo';
    this.firestoreService.getDoc<Cupo>(path, uid).subscribe( res => {
      if (res){
        this.cuponuevo = res.cupos;
      }
    });
  };

  addCupo(estado: boolean, resi: number, invi: number,){
    const path = 'MoldeHorarios/';
    let numcupo = 0;
    let numinvi = 0;
    if(invi!=null){
      numinvi = invi;
    }
    const sum = resi + numinvi
    if(this.modelos.cupo){
      numcupo = this.modelos.cupo;
    }
    const data = {
      cupo: !this.cuponuevo ? numcupo + sum: numcupo - sum,
    };
    if(data.cupo < 0){
      data.cupo = 0;
    }
    this.firestoreService.updateDoc(path, 'Piscina', data).then(res =>{
      console.log('Se realizo -> ', res);
    });
  }

  async addCompromisos(estado: boolean, nuevos: Modelo, resi: number, invi: number, nuevo: Usuarios){
    const uid = await this.firebaseauthService.getUid();
    const path = 'CompromisosPiscina';
    let numinvi = 0;
    if(invi!=null){
      numinvi = invi;
    }
    const invitados = numinvi;
    const residentes = resi;
    const hora = this.modelos.hinicial+' - '+this.modelos.hfinal;
    const id = uid+hora;
    const sum = resi + invi;
    const data: Compromiso = {
      id,
      idcupo: this.modelos.id,
      uid,
      hcupo: nuevos.hinicial+' - '+nuevos.hfinal,
      fecha: new Date().toLocaleDateString('es-GB'),
      hora: new Date().toLocaleTimeString('en-US'),
      tiempo: new Date(),
      hinicial: nuevos.hinicial,
      hfinal: nuevos.hfinal,
      cant: sum,
      nombres: nuevo.nombres,
      apellidos: nuevo.apellidos,
      resi: residentes,
      invi: invitados,
      numcasa: nuevo.casa
    };
    if(estado==true){
      this.firestoreService.createDoc(data, path, uid);
    }else if(estado==false){
      const path1 = 'MoldeHorarios/Piscina/cupo/';
      this.firestoreService.deleteDoc(path, id).then(res=>{
        console.log('Se elimino ',res);
      }).catch(err =>{
        console.log('Ocurrio un error ',err);
      });

      this.firestoreService.deleteDoc(path1, uid).then(res=>{
        console.log('Se elimino',res);
      }).catch(err =>{
        console.log('Ocurrio un error ',err);
      });
    }
  }

  async addCompromisoRegis(estado: boolean, nuevos: Modelo, resi: number, invi: number, nuevo: Usuarios){
    const uid = await this.firebaseauthService.getUid();
    const path = 'RegistroCS';
    let numinvi = 0;
    const dateObj = new Date();
    const dia = dateObj.getUTCDate();
    const mes = dateObj.getUTCMonth() + 1;
    const año = dateObj.getUTCFullYear();
    if(invi!=null){
      numinvi = invi;
    }
    const sum = resi + numinvi;
    const invitados = numinvi;
    const residentes = resi;
    if(estado==true){
      const data: RegistroCS = {
        id: this.firestoreService.getId(),
        uid,
        fecha: new Date().toLocaleDateString('es-GB'),
        hora: new Date().toLocaleTimeString('en-US'),
        tiempo: new Date(),
        hinicial: nuevos.hinicial,
        hfinal: nuevos.hfinal,
        cant: sum,
        nombres: nuevo.nombres,
        apellidos: nuevo.apellidos,
        services: 'Piscina',
        apartasino: 'Aparto Cupo',
        resi: residentes,
        invi: invitados,
        numcasa: nuevo.casa,
        dia,
        mes,
        año,
        sem: mes>6 ? 2: 1,
        qui: dia>15 ? 2: 1,
      };
      this.firestoreService.createDoc(data, path, data.id);
    }else if(estado==false){
      const data: RegistroCS = {
        id: this.firestoreService.getId(),
        uid,
        fecha: new Date().toLocaleDateString('es-GB'),
        hora: new Date().toLocaleTimeString('en-US'),
        tiempo: new Date(),
        hinicial: nuevos.hinicial,
        hfinal: nuevos.hfinal,
        cant: sum,
        nombres: nuevo.nombres,
        apellidos: nuevo.apellidos,
        services: 'Piscina',
        apartasino: 'Desaparto Cupo',
        resi: residentes,
        invi: invitados,
        numcasa: nuevo.casa,
        dia,
        mes,
        año,
        sem: mes>6 ? 2: 1,
        qui: dia>15 ? 2: 1,
      };
      this.firestoreService.createDoc(data, path, data.id);
    }
  }

}
