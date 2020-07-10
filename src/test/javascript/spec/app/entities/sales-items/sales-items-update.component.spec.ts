import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { SalesItemsUpdateComponent } from 'app/entities/sales-items/sales-items-update.component';
import { SalesItemsService } from 'app/entities/sales-items/sales-items.service';
import { SalesItems } from 'app/shared/model/sales-items.model';

describe('Component Tests', () => {
  describe('SalesItems Management Update Component', () => {
    let comp: SalesItemsUpdateComponent;
    let fixture: ComponentFixture<SalesItemsUpdateComponent>;
    let service: SalesItemsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [SalesItemsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SalesItemsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SalesItemsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SalesItemsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SalesItems(123);
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
        const entity = new SalesItems();
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
