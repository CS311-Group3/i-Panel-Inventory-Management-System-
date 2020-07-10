import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReturnItems } from 'app/shared/model/return-items.model';

type EntityResponseType = HttpResponse<IReturnItems>;
type EntityArrayResponseType = HttpResponse<IReturnItems[]>;

@Injectable({ providedIn: 'root' })
export class ReturnItemsService {
  public resourceUrl = SERVER_API_URL + 'api/return-items';

  constructor(protected http: HttpClient) {}

  create(returnItems: IReturnItems): Observable<EntityResponseType> {
    return this.http.post<IReturnItems>(this.resourceUrl, returnItems, { observe: 'response' });
  }

  update(returnItems: IReturnItems): Observable<EntityResponseType> {
    return this.http.put<IReturnItems>(this.resourceUrl, returnItems, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IReturnItems>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IReturnItems[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
