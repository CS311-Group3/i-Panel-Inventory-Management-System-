import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPurchaseItems } from 'app/shared/model/purchase-items.model';
import {IPurchases} from "app/shared/model/purchases.model";

type EntityResponseType = HttpResponse<IPurchaseItems>;
type EntityArrayResponseType = HttpResponse<IPurchaseItems[]>;

@Injectable({ providedIn: 'root' })
export class PurchaseItemsService {
  public resourceUrl = SERVER_API_URL + 'api/purchase-items';

  constructor(protected http: HttpClient) {}

  create(purchaseItems: IPurchaseItems): Observable<EntityResponseType> {
    return this.http.post<IPurchaseItems>(this.resourceUrl, purchaseItems, { observe: 'response' });
  }

  update(purchaseItems: IPurchaseItems): Observable<EntityResponseType> {
    return this.http.put<IPurchaseItems>(this.resourceUrl, purchaseItems, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPurchaseItems>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getByPurchaseCode(code:IPurchases):Observable<EntityArrayResponseType>{
    return this.http.get<IPurchaseItems[]>(`${this.resourceUrl+ "-get-by-purchase-code"}/${code}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPurchaseItems[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
