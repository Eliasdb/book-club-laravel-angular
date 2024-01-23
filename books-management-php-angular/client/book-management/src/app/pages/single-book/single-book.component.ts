import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header/header.component';

@Component({
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  selector: 'app-single-book',
  template: `
   <section class="page">
    <app-header />
    <section class="book-container">
      <div class="img">
        <a class="back-link" routerLink="/books"> &larr; Back</a>
        <div class="img-container">
          <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="book" class="single-book-image">
        </div>
      </div>
     
       <div class="book-info-container">
        <h3>Title of Book: The Bookening</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ut odit officiis aut facere. Eveniet corporis sequi fuga debitis. Perspiciatis nihil sit quia minus accusantium? Minima ratione, non totam, placeat aliquid, delectus voluptatibus adipisci id consequuntur maxime neque nam quisquam.</p>
        <p><span class="bold-text">Book data:</span> data</p>
        <p><span class="bold-text">Book data:</span> data</p>
        <p><span class="bold-text">Book data:</span> data</p>
        <hr/>
        <button class="add-btn">Add to cart</button>
      </div>
    </section>
    <app-footer/>
  </section>
  `,
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent {

}
