import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.css'
})
export class SectionHeaderComponent {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() icono: string = '';
}