import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  habilitado = true;

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.siguientes();
  }

  recargar( event: any ) {
    this.siguientes( event, true);
    this.posts = [];
    this.habilitado = true;
  }
  
  siguientes( event?: any, pull: boolean = false) {
    this.postsService.getPosts( pull )
      .subscribe( resp => {
        console.log(resp);
        this.posts.push(...resp.post);

        if ( event ) {
          event.target.complete();

          if ( resp.post.length === 0 ) {
            this.habilitado = false;
          }
        }
      });
  }
}
