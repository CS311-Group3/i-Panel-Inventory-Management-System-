import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { PurchaseItemsUpdateComponent } from 'app/entities/purchase-items/purchase-items-update.component';
import { PurchaseItemsService } from 'app/entities/purchase-items/purchase-items.service';
import { PurchaseItems } from 'app/shared/model/purchase-items.model';

describe('Component Tests', () => {
  describe('PurchaseItems Management Update Component', () => {
    let comp: PurchaseItemsUpdateComponent;
    let fixture: ComponentFixture<PurchaseItemsUpdateComponent>;
    let service: PurchaseItemsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [PurchaseItemsUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PurchaseItemsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseItemsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurchaseItemsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PurchaseItems(123);
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
        const entity = new PurchaseItems();
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
