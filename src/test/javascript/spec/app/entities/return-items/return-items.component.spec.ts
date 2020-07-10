import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IpanelTestModule } from '../../../test.module';
import { ReturnItemsComponent } from 'app/entities/return-items/return-items.component';
import { ReturnItemsService } from 'app/entities/return-items/return-items.service';
import { ReturnItems } from 'app/shared/model/return-items.model';

describe('Component Tests', () => {
  describe('ReturnItems Management Component', () => {
    let comp: ReturnItemsComponent;
    let fixture: ComponentFixture<ReturnItemsComponent>;
    let service: ReturnItemsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [ReturnItemsComponent],
      })
        .overrideTemplate(ReturnItemsComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReturnItemsComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReturnItemsService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReturnItems(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.returnItems && comp.returnItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
