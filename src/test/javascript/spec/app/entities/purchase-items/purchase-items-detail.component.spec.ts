import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { PurchaseItemsDetailComponent } from 'app/entities/purchase-items/purchase-items-detail.component';
import { PurchaseItems } from 'app/shared/model/purchase-items.model';

describe('Component Tests', () => {
  describe('PurchaseItems Management Detail Component', () => {
    let comp: PurchaseItemsDetailComponent;
    let fixture: ComponentFixture<PurchaseItemsDetailComponent>;
    const route = ({ data: of({ purchaseItems: new PurchaseItems(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [PurchaseItemsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PurchaseItemsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchaseItemsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load purchaseItems on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchaseItems).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
