import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface IItem {
  _id:  string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.css'],
})
export class TodoPageComponent implements OnInit {
  items: IItem[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.onRefresh();
  }

  onRefresh(): void {
    const url =
      'https://n3528wo07c.execute-api.us-east-1.amazonaws.com/dev/todo-items';
    this.http.get<any>(url).subscribe((data) => {
      this.items = data?.items as IItem[];
    });
  }
}
