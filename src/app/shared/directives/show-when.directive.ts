import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowWhen]',
})
export class ShowWhenDirective {
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  appShowWhen = input.required<boolean>();

  private hasView = false;

  constructor() {
    effect(() => {
      const condition = this.appShowWhen();

      if (condition && !this.hasView) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!condition && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    });
  }
}
