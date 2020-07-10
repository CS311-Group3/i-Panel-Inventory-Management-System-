import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IpanelTestModule } from '../../../test.module';
import { ReturnsDataComponent } from 'app/entities/returns-data/returns-data.component';
import { ReturnsDataService } from 'app/entities/returns-data/returns-data.service';
import { ReturnsData } from 'app/shared/model/returns-data.model';

describe('Component Tests', () => {
  describe('ReturnsData Management Component', () => {
    let comp: ReturnsDataComponent;
    let fixture: ComponentFixture<ReturnsDataComponent>;
    let service: ReturnsDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [ReturnsDataComponent],
      })
        .overrideTemplate(ReturnsDataComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReturnsDataComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReturnsDataService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ReturnsData(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.returnsData && comp.returnsData[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
