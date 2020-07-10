import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { PurchasesDetailComponent } from 'app/entities/purchases/purchases-detail.component';
import { Purchases } from 'app/shared/model/purchases.model';

describe('Component Tests', () => {
  describe('Purchases Management Detail Component', () => {
    let comp: PurchasesDetailComponent;
    let fixture: ComponentFixture<PurchasesDetailComponent>;
    const route = ({ data: of({ purchases: new Purchases(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [PurchasesDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PurchasesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchasesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load purchases on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchases).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
