import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { SalesItemsDetailComponent } from 'app/entities/sales-items/sales-items-detail.component';
import { SalesItems } from 'app/shared/model/sales-items.model';

describe('Component Tests', () => {
  describe('SalesItems Management Detail Component', () => {
    let comp: SalesItemsDetailComponent;
    let fixture: ComponentFixture<SalesItemsDetailComponent>;
    const route = ({ data: of({ salesItems: new SalesItems(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [SalesItemsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SalesItemsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SalesItemsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load salesItems on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.salesItems).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
