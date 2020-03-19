import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo = false;

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  constructor(
    private postsService: PostsService,
    private route: Router,
    private geolocation: Geolocation
  ) {}

  crearPost() {
    console.log(this.post);
    this.postsService.createPost( this.post );

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo(){

    if ( !this.post.posicion ) {
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;


    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.cargandoGeo = false;

        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        console.log(coords);
        this.post.coords = coords;
      })
      .catch(err => {
        this.cargandoGeo = false;
        console.log('Error getting location', err);
      });
  }

}
