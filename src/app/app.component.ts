import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'stream-client';
  events: string[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('On init');
    const stream: EventSource = new EventSource('http://localhost:13000/stream');

    stream.addEventListener('message', (message: MessageEvent) => {
      this.events.push(message.data);
      console.log(message);
    });

    stream.addEventListener('streamEnd', (message: MessageEvent) => {
      this.events.push(`${message.data} (it was the last one)`);
      stream.close();
    });

    stream.addEventListener('hello', (message: MessageEvent) => {
      this.events.push(`Hello Message => ${message.data}`);
    });

    stream.addEventListener('open', (open: Event) => {
      console.log(open);
    });

    stream.addEventListener('error', (error: Event) => {
      console.log(error);
    });
  }
}
