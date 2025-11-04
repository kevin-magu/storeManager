import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HowItWorks } from '../how-it-works/how-it-works';
import { Technologies } from '../technologies/technologies';
import { Collaboration } from '../collaboration/collaboration';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HowItWorks, Technologies, Collaboration],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // Component logic can be added here later
}