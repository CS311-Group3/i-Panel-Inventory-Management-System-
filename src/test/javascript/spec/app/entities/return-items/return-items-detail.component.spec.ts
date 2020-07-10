import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { ReturnItemsDetailComponent } from 'app/entities/return-items/return-items-detail.component';
import { ReturnItems } from 'app/shared/model/return-items.model';

describe('Component Tests', () => {
  describe('ReturnItems Management Detail Component', () => {
    let comp: ReturnItemsDetailComponent;
    let fixture: ComponentFixture<ReturnItemsDetailComponent>;
    const route = ({ data: of({ returnItems: new ReturnItems(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [ReturnItemsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ReturnItemsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReturnItemsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load returnItems on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.returnItems).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
