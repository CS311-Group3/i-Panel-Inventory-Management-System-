import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { PurchasesUpdateComponent } from 'app/entities/purchases/purchases-update.component';
import { PurchasesService } from 'app/entities/purchases/purchases.service';
import { Purchases } from 'app/shared/model/purchases.model';

describe('Component Tests', () => {
  describe('Purchases Management Update Component', () => {
    let comp: PurchasesUpdateComponent;
    let fixture: ComponentFixture<PurchasesUpdateComponent>;
    let service: PurchasesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [PurchasesUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PurchasesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchasesUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchasesService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Purchases(123);
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
        const entity = new Purchases();
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
