import {OnInit, Component, ComponentFactoryResolver, Input, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'ng2-custom-pager-button',
  styleUrls: ['./pager.component.scss'],
  template: `
    <ng-template #dynamicTarget1></ng-template>
    <ng-template #dynamicTarget2></ng-template>
  `
})
export class CustomPagerButtonComponent implements OnInit {
  @Input() pagerSetting;
  @Input() position;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  @ViewChild('dynamicTarget1', {read: ViewContainerRef, static: true}) dynamicTarget1: any;
  @ViewChild('dynamicTarget2', {read: ViewContainerRef, static: true}) dynamicTarget2: any;

  ngOnInit() {
    if (this.pagerSetting.mode === 'custom') {
      let componentFactory;
      switch (this.position) {
        case 'prev':
          componentFactory = this.resolver.resolveComponentFactory(this.pagerSetting.prevComponent);
          this.dynamicTarget1.createComponent(componentFactory);
          break;
        case 'next':
          componentFactory = this.resolver.resolveComponentFactory(this.pagerSetting.nextComponent);
          this.dynamicTarget2.createComponent(componentFactory);
          break;
        default:
          break;
      }
    }
  }
}

