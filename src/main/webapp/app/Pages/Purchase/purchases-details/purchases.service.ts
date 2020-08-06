import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPurchases } from 'app/shared/model/purchases.model';
import {IInventory} from "app/shared/model/inventory.model";

type EntityResponseType = HttpResponse<IPurchases>;
type EntityArrayResponseType = HttpResponse<IPurchases[]>;

@Injectable({ providedIn: 'root' })
export class PurchasesService {
  public resourceUrl = SERVER_API_URL + 'api/purchases';

  constructor(protected http: HttpClient) {}

  create(purchases: IPurchases): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchases);
    return this.http
      .post<IPurchases>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(purchases: IPurchases): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(purchases);
    return this.http
      .put<IPurchases>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPurchases>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPurchases[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  getPurchasesByDate(date:string):Observable<EntityArrayResponseType>{
    return this.http.get<IPurchases[]>(`${this.resourceUrl+ "-get-by-date"}/${date}`, { observe: 'response' });
  }


  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(purchases: IPurchases): IPurchases {
    const copy: IPurchases = Object.assign({}, purchases, {
      dateOfPurchase:
        purchases.dateOfPurchase && purchases.dateOfPurchase.isValid() ? purchases.dateOfPurchase.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfPurchase = res.body.dateOfPurchase ? moment(res.body.dateOfPurchase) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((purchases: IPurchases) => {
        purchases.dateOfPurchase = purchases.dateOfPurchase ? moment(purchases.dateOfPurchase) : undefined;
      });
    }
    return res;
  }
}
