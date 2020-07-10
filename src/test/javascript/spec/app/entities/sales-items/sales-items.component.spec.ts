import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IpanelTestModule } from '../../../test.module';
import { SalesItemsComponent } from 'app/entities/sales-items/sales-items.component';
import { SalesItemsService } from 'app/entities/sales-items/sales-items.service';
import { SalesItems } from 'app/shared/model/sales-items.model';

describe('Component Tests', () => {
  describe('SalesItems Management Component', () => {
    let comp: SalesItemsComponent;
    let fixture: ComponentFixture<SalesItemsComponent>;
    let service: SalesItemsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [SalesItemsComponent],
      })
        .overrideTemplate(SalesItemsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SalesItemsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SalesItemsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new SalesItems(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.salesItems && comp.salesItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
