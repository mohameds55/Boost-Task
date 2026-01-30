import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Post } from '../../core/services/data.service';
import { TextTransformPipe } from '../pipes/text-transform.pipe';

@Component({
  selector: 'app-post-card',
  template: `
    <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 class="font-semibold text-gray-900 mb-2 line-clamp-1">
        {{ post().title | textTransform }}
      </h3>
      <p class="text-sm text-gray-600 line-clamp-3">{{ post().body }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextTransformPipe],
})
export class PostCardComponent {
  post = input.required<Post>();
}
