import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { TruncateEllipsisPipe } from '../../../pipes/truncate-ellipsis-pipe';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  standalone: true,
  imports: [TruncateEllipsisPipe, NgIf],
})
export class ListItemComponent {
  @Input() payload!: {
    name: string;
    description: string;
    id: string;
    jiraTicketId?: string;
  };
  @Input() tag!: string;
}
