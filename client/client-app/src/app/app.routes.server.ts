import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'edit-product/:id',
    renderMode: RenderMode.Client // Disable pre-rendering for dynamic routes
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender // Pre-render all other routes
  }
];