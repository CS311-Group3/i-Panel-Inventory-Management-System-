import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IpanelTestModule } from '../../../test.module';
import { PurchasesComponent } from 'app/entities/purchases/purchases.component';
import { PurchasesService } from 'app/entities/purchases/purchases.service';
import { Purchases } from 'app/shared/model/purchases.model';

describe('Component Tests', () => {
  describe('Purchases Management Component', () => {
    let comp: PurchasesComponent;
    let fixture: ComponentFixture<PurchasesComponent>;
    let service: PurchasesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [PurchasesComponent],
      })
        .overrideTemplate(PurchasesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchasesComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchasesService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Purchases(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.purchases && comp.purchases[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
