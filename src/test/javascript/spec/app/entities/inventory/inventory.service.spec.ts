import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from 'app/Pages/Inventory/inventory/inventory.service';
import { IInventory, Inventory } from 'app/shared/model/inventory.model';
import { Category } from 'app/shared/model/enumerations/category.model';

describe('Service Tests', () => {
  describe('Inventory Service', () => {
    let injector: TestBed;
    let service: InventoryService;
    let httpMock: HttpTestingController;
    let elemDefault: IInventory;
    let expectedResult: IInventory | IInventory[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(InventoryService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Inventory(0, 'AAAAAAA', 'AAAAAAA', Category.CAT1, 'AAAAAAA', 0, 0, 0, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Inventory', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Inventory()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Inventory', () => {
        const returnedFromService = Object.assign(
          {
            itemCode: 'BBBBBB',
            itemName: 'BBBBBB',
            category: 'BBBBBB',
            description: 'BBBBBB',
            quantity: 1,
            reorderLevel: 1,
            sellingPrice: 1,
            buyingPrice: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Inventory', () => {
        const returnedFromService = Object.assign(
          {
            itemCode: 'BBBBBB',
            itemName: 'BBBBBB',
            category: 'BBBBBB',
            description: 'BBBBBB',
            quantity: 1,
            reorderLevel: 1,
            sellingPrice: 1,
            buyingPrice: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Inventory', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
