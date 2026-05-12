import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  submenuOpen: boolean = false;

  toggleSubmenu() {
    this.submenuOpen = !this.submenuOpen;
  }

  cerrarSubmenu() {
    this.submenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const isClickInside = target.closest('.sidebar-menu-item');
    
    if (!isClickInside && this.submenuOpen) {
      this.submenuOpen = false;
    }
  }
}