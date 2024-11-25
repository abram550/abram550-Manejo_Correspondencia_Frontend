import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorrespondenceI } from '../../models/Correspondence';
import { UserI } from '../../models/User';
import { EmployeeI } from '../../models/Employee';
import { CorrespondenceTypeI } from '../../models/CorrespondenceType';
import { CorrespondenceStateI } from '../../models/CorrespondenceState';
import { BranchI } from '../../models/Branch';
import { TransportI } from '../../models/Transport';

@Injectable({
  providedIn: 'root'
})
export class CorrespondenceService {
  private readonly api_uri_node = 'http://localhost:4000';
  private readonly base_path = `${this.api_uri_node}/correspondence`;
  private readonly users_path = `${this.api_uri_node}/users`;
  private readonly employees_path = `${this.api_uri_node}/employees`;
  private readonly correspondenceTypes_path = `${this.api_uri_node}/correspondence-types`;
  private readonly correspondenceStates_path = `${this.api_uri_node}/states`;
  private readonly branches_path = `${this.api_uri_node}/branches`;
  private readonly transports_path = `${this.api_uri_node}/transports`;

  constructor(private http: HttpClient) {}

  getAllCorrespondences(): Observable<{ correspondences: CorrespondenceI[] }> {
    return this.http.get<{ correspondences: CorrespondenceI[] }>(this.base_path);
  }

  getOneCorrespondence(id: number): Observable<{ correspondence: CorrespondenceI }> {
    return this.http.get<{ correspondence: CorrespondenceI }>(`${this.base_path}/${id}`);
  }

  createCorrespondence(data: CorrespondenceI): Observable<CorrespondenceI> {
    return this.http.post<CorrespondenceI>(this.base_path, data);
  }

  updateCorrespondence(id: number, data: CorrespondenceI): Observable<CorrespondenceI> {
    return this.http.put<CorrespondenceI>(`${this.base_path}/${id}`, data);
  }

  deleteCorrespondence(id: number): Observable<CorrespondenceI> {
    return this.http.delete<CorrespondenceI>(`${this.base_path}/${id}`);
  }

  getAllUsers(): Observable<{ users: UserI[] }> {
    return this.http.get<{ users: UserI[] }>(this.users_path);
  }
  
  getAllEmployees(): Observable<{ employees: EmployeeI[] }> {
    return this.http.get<{ employees: EmployeeI[] }>(this.employees_path);
  }

  getAllCorrespondenceTypes(): Observable<{ types: CorrespondenceTypeI[] }> {
    return this.http.get<{ types: CorrespondenceTypeI[] }>(this.correspondenceTypes_path);
  }
  
  getAllCorrespondenceStates(): Observable<{ states: CorrespondenceStateI[] }> {
    return this.http.get<{ states: CorrespondenceStateI[] }>(this.correspondenceStates_path);
  }
  
  getAllBranches(): Observable<{ branches: BranchI[] }> {
    return this.http.get<{ branches: BranchI[] }>(this.branches_path);
  }
  
  getAllTransports(): Observable<{ transports: TransportI[] }> {
    return this.http.get<{ transports: TransportI[] }>(this.transports_path);
  }
}