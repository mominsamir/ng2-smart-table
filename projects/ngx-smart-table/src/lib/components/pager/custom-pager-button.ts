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
      let prevComponentFactory;
      switch (this.position) {
        case 'prev':
          prevComponentFactory = this.resolver.resolveComponentFactory(this.pagerSetting.prevComponent);
          this.dynamicTarget.createComponent(prevComponentFactory);
          break;
        case 'next':
          prevComponentFactory = this.resolver.resolveComponentFactory(this.pagerSetting.prevComponent);
          this.dynamicTarget.createComponent(prevComponentFactory);
          break;
        default:
          break;
      }
    }
  }
}
