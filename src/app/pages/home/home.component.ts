import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  public flipped: boolean = false;

  public toggleFlip() {
    this.flipped = !this.flipped
  }
  constructor(private HomeService: HomeService, private router: Router) { }

  articles: any[] = [];
  ngOnInit(): void {
    this.HomeService.getArtical(1, 10).subscribe((data) => {
      this.articles.length = 0;
      for (let article of data) {
        this.articles.push(article)
        this.HomeService.getById(article.id).subscribe((value) => {
          article['body'] = value['body_html']
        });
      }
    });
    // this.HomeService.getArtical(1,20).subscribe((data)=>{
    //   this.articles.length = 0;
    //   for(let article of data){
    //     this.articles.push(article);
    //     console.log(this.articles);
    //   }
    // });
  }
  toLink() {
    this.router.navigate(['/home/news']);
  }
}
