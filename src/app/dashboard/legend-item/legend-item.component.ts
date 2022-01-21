import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-legend-item',
  templateUrl: './legend-item.component.html',
  styleUrls: ['./legend-item.component.scss'],
})
export class LegendItemComponent implements OnInit {
  @Input() color: String = '';
  @Input() title: String = '';

  constructor() {}

  ngOnInit(): void {}
}
