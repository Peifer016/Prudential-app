import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isClientesSubmenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isMenuOpen) {
      this.isClientesSubmenuOpen = false; // Cerrar submenú al cerrar el menú principal
    }
  }

  toggleClientesSubmenu(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isClientesSubmenuOpen = !this.isClientesSubmenuOpen;
  }

  cerrarMenu() {
    this.isMenuOpen = false;
    this.isClientesSubmenuOpen = false;
  }
}