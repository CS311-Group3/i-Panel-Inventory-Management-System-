import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { ReturnsDataUpdateComponent } from 'app/entities/returns-data/returns-data-update.component';
import { ReturnsDataService } from 'app/entities/returns-data/returns-data.service';
import { ReturnsData } from 'app/shared/model/returns-data.model';

describe('Component Tests', () => {
  describe('ReturnsData Management Update Component', () => {
    let comp: ReturnsDataUpdateComponent;
    let fixture: ComponentFixture<ReturnsDataUpdateComponent>;
    let service: ReturnsDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [ReturnsDataUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ReturnsDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReturnsDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReturnsDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReturnsData(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReturnsData();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
