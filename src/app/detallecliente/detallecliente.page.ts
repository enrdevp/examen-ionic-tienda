import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detallecliente',
  templateUrl: './detallecliente.page.html',
  styleUrls: ['./detallecliente.page.scss'],
})
export class DetalleclientePage implements OnInit {
  respuesta: any;
  item: any;


  constructor(public navParams: NavParams,
              public http: HttpClient,
              public modalController: ModalController,
              public alertController: AlertController) {
                this.item = navParams.get('dato');}

  ngOnInit() {
  }

  actualizarCliente(item) {
    // const uri = 'https://bdpromo1.000webhostapp.com/api.php?comando=editar&nombre=' + item.nombre
    // + '&descripcion=' + item.descripcion
    // + '&preciodecosto=' + item.preciodecosto +
    // '&preciodeventa=' + item.preciodeventa +
    // '&cantidad=' + item.cantidad +
    // '&fotografia=' + item.fotografia +
    // '&id=' + item.id;

    const uri = 'https://appinventor2020.000webhostapp.com/tienda_api/clientes.php?comando=editar&id='+item.id+'&nombre='
    +item.nombre+'&direccion='
    +item.direccion+'&telefono='
    +item.telefono+'&correo='
    +item.correo;

    this.http.get(uri).subscribe(async data => {
      this.respuesta = data;
      const mensaje = this.respuesta.mensaje;
      if (!!mensaje) {
      {
        const alert = await this.alertController.create({
          header: 'Alerta',
          subHeader: 'Actualizar',
          message: mensaje,
          buttons: ['OK']
        });
        await alert.present();
        this.modalController.dismiss();
      }
    }

  });
  }

   eliminarCliente(id) {
    const uri = 'https://appinventor2020.000webhostapp.com/tienda_api/clientes.php?comando=eliminar&id='+id;
    this.http.get(uri).subscribe(async data => {
      this.respuesta = data;
      const mensaje = this.respuesta.mensaje;
      if (!!mensaje) {
      {
        const alert = await this.alertController.create({
          header: 'Alerta',
          subHeader: 'Eliminar',
          message: mensaje,
          buttons: ['OK']
        });
        await alert.present();
        this.modalController.dismiss();
      }
    }

  });
  }

   regresar() {
    this.modalController.dismiss();
    }

}