import {AfterViewInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'ng2-custom-pager-button',
  styleUrls: ['./pager.component.scss'],
  template: `
    <ng-template #dynamicTarget></ng-template>`
})
export class CustomPagerButtonComponent implements AfterViewInit {
  @Input() pagerSetting;
  @Input() position;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  @ViewChild('dynamicTarget', {read: ViewContainerRef, static: true}) dynamicTarget: any;

  ngAfterViewInit() {
    if (this.pagerSetting.mode === 'custom') {
      let componentFactory;
      switch (this.position) {
        case 'prev':
          componentFactory = this.resolver.resolveComponentFactory(this.pagerSetting.prevComponent);
          this.dynamicTarget.createComponent(componentFactory);
          break;
        case 'next':
          componentFactory = this.resolver.resolveComponentFactory(this.pagerSetting.nextComponent);
          this.dynamicTarget.createComponent(componentFactory);
          break;
        default:
          break;
      }
    }
  }
}
