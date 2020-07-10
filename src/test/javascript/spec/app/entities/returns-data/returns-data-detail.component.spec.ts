import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IpanelTestModule } from '../../../test.module';
import { ReturnsDataDetailComponent } from 'app/entities/returns-data/returns-data-detail.component';
import { ReturnsData } from 'app/shared/model/returns-data.model';

describe('Component Tests', () => {
  describe('ReturnsData Management Detail Component', () => {
    let comp: ReturnsDataDetailComponent;
    let fixture: ComponentFixture<ReturnsDataDetailComponent>;
    const route = ({ data: of({ returnsData: new ReturnsData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IpanelTestModule],
        declarations: [ReturnsDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ReturnsDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReturnsDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load returnsData on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.returnsData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
