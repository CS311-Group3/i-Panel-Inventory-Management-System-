import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISalesItems } from 'app/shared/model/sales-items.model';

type EntityResponseType = HttpResponse<ISalesItems>;
type EntityArrayResponseType = HttpResponse<ISalesItems[]>;

@Injectable({ providedIn: 'root' })
export class SalesItemsService {
  public resourceUrl = SERVER_API_URL + 'api/sales-items';

  constructor(protected http: HttpClient) {}

  create(salesItems: ISalesItems): Observable<EntityResponseType> {
    return this.http.post<ISalesItems>(this.resourceUrl, salesItems, { observe: 'response' });
  }

  update(salesItems: ISalesItems): Observable<EntityResponseType> {
    return this.http.put<ISalesItems>(this.resourceUrl, salesItems, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISalesItems>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISalesItems[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
