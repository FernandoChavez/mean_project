import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //    {title: 'First post', content: 'This is the fisrt post\'s content'},
    //    {title: 'Second post', content: 'This is the second post\'s content'},
    //    {title: 'Third post', content: 'This is the third post\'s content'},
    // ];

    // @Input() posts: Post[] = [];
    posts: Post[] = [];
    isLoading = false;
    // postsService: PostsService;
    private postsSub: Subscription;


    constructor(public postsService: PostsService) {
      // this.postsService = PostsService;

    }

    ngOnInit() {
      // this.posts = this.postsServices.getPosts();
      this.isLoading = true;
      this.postsService.getPosts();
      this.postsSub = this.postsService.getPostsUpdateListener().subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });

    }


    onDelete(postId: string) {
      this.postsService.deletePost(postId);
    }

    ngOnDestroy() {
      this.postsSub.unsubscribe();
    }
}
