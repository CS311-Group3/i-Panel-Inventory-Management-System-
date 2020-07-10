import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { ReturnItemsUpdateComponent } from 'app/entities/return-items/return-items-update.component';
import { ReturnItemsService } from 'app/entities/return-items/return-items.service';
import { ReturnItems } from 'app/shared/model/return-items.model';

describe('Component Tests', () => {
  describe('ReturnItems Management Update Component', () => {
    let comp: ReturnItemsUpdateComponent;
    let fixture: ComponentFixture<ReturnItemsUpdateComponent>;
    let service: ReturnItemsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [ReturnItemsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ReturnItemsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReturnItemsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReturnItemsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ReturnItems(123);
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
        const entity = new ReturnItems();
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
