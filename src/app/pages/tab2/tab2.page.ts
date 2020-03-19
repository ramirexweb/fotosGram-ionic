import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];

  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }

  constructor(
    private postsService: PostsService,
    private route: Router
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

}
