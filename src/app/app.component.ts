import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@env/environment';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'jest-extended-angular';

  readonly emitter = new ReplaySubject<boolean>();

  ngOnInit(): void {
    const { production } = environment;
    this.emitter.next(production);
    console.log('Is production mode: ', production); 
  }
}
