import { addScript } from 'src/utils/add-script';
import {  Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-select-img',
  templateUrl: './select-img.component.html',
  styleUrls: ['./select-img.component.css']
})
export class SelectImgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    addScript('icon-select');
    addScript('icon-select-loader');
    addScript('iscroll');
  }
 
}
