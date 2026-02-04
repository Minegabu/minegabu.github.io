import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-component-viewer',
    imports: [],
    templateUrl: './viewer.component.html',
    styleUrl: './viewer.component.scss',
})
export class ViewerComponent {
    @Input() imageUrl?: string;
    @Input() description?: string;
}
