import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IpanelTestModule } from '../../../test.module';
import { PurchaseItemsComponent } from 'app/entities/purchase-items/purchase-items.component';
import { PurchaseItemsService } from 'app/entities/purchase-items/purchase-items.service';
import { PurchaseItems } from 'app/shared/model/purchase-items.model';

describe('Component Tests', () => {
  describe('PurchaseItems Management Component', () => {
    let comp: PurchaseItemsComponent;
    let fixture: ComponentFixture<PurchaseItemsComponent>;
    let service: PurchaseItemsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [PurchaseItemsComponent],
      })
        .overrideTemplate(PurchaseItemsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseItemsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseItemsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PurchaseItems(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.purchaseItems && comp.purchaseItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
