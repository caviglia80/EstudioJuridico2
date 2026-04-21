import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';
import { SocialButtonsComponent } from './shared/components';

@Component({
  selector: 'ej-root',
  imports: [RouterOutlet, SocialButtonsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly url = toSignal(
    inject(Router).events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
    ),
    { initialValue: '/' },
  );

  protected readonly isChatRoute = computed(() => this.url().startsWith('/gideon'));
  protected readonly showSocial = computed(() => !this.isChatRoute());
}
