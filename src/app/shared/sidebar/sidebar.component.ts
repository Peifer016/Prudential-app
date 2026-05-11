import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router'; // 1. Importar esto

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  ngOnInit() {
    // Inicialización sin window
  }
}
