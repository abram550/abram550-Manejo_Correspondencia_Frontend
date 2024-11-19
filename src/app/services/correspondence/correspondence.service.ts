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
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/correspondence`;
  users_path = `${this.api_uri_node}/users`;
  employees_path = `${this.api_uri_node}/employees`;
  correspondenceTypes_path = `${this.api_uri_node}/correspondence-types`;
  correspondenceStates_path = `${this.api_uri_node}/states`;
  branches_path = `${this.api_uri_node}/branches`;
  transports_path = `${this.api_uri_node}/transports`;

  constructor(private http: HttpClient) {}

  /** 
   * Retrieves all correspondences
   * @returns Observable containing an array of CorrespondenceI objects
   */
  getAllCorrespondences(): Observable<{ correspondences: CorrespondenceI[] }> {
    return this.http.get<{ correspondences: CorrespondenceI[] }>(this.base_path);
  }

  /** 
   * Retrieves a correspondence by ID
   * @param id - Correspondence ID to retrieve
   * @returns Observable containing a single CorrespondenceI object
   */
  getOneCorrespondence(id: number): Observable<{ correspondence: CorrespondenceI }> {
    return this.http.get<{ correspondence: CorrespondenceI }>(`${this.base_path}/${id}`);
  }

  /** 
   * Creates a new correspondence record
   * @param data - Correspondence data to create
   * @returns Observable of the created CorrespondenceI
   */
  createCorrespondence(data: CorrespondenceI): Observable<CorrespondenceI> {
    return this.http.post<CorrespondenceI>(this.base_path, data);
  }

  /** 
   * Updates an existing correspondence
   * @param id - ID of the correspondence to update
   * @param data - Updated correspondence data
   * @returns Observable of the updated CorrespondenceI
   */
  updateCorrespondence(id: number, data: CorrespondenceI): Observable<CorrespondenceI> {
    return this.http.put<CorrespondenceI>(`${this.base_path}/${id}`, data);
  }

  /** 
   * Deletes a correspondence by ID
   * @param id - Correspondence ID to delete
   * @returns Observable of the deleted CorrespondenceI
   */
  deleteCorrespondence(id: number): Observable<CorrespondenceI> {
    return this.http.delete<CorrespondenceI>(`${this.base_path}/${id}`);
  }

  /** 
   * Retrieves all users
   * @returns Observable containing an array of UserI objects
   */
  getAllUsers(): Observable<UserI[]> {
    return this.http.get<UserI[]>(this.users_path);
  }

  /** 
   * Retrieves a user by ID
   * @param id - User ID to retrieve
   * @returns Observable containing a single UserI object
   */
  getOneUser(id: number): Observable<{ user: UserI }> {
    return this.http.get<{ user: UserI }>(`${this.users_path}/${id}`);
  }

  /** 
   * Retrieves all employees
   * @returns Observable containing an array of EmployeeI objects
   */
  getAllEmployees(): Observable<EmployeeI[]> {
    return this.http.get<EmployeeI[]>(this.employees_path);
  }

  /** 
   * Retrieves an employee by ID
   * @param id - Employee ID to retrieve
   * @returns Observable containing a single EmployeeI object
   */
  getOneEmployee(id: number): Observable<{ employee: EmployeeI }> {
    return this.http.get<{ employee: EmployeeI }>(`${this.employees_path}/${id}`);
  }

  /** 
   * Retrieves all correspondence types
   * @returns Observable containing an array of CorrespondenceTypeI objects
   */
  getAllCorrespondenceTypes(): Observable<CorrespondenceTypeI[]> {
    return this.http.get<CorrespondenceTypeI[]>(this.correspondenceTypes_path);
  }

  /** 
   * Retrieves a correspondence type by ID
   * @param id - Correspondence type ID to retrieve
   * @returns Observable containing a single CorrespondenceTypeI object
   */
  getOneCorrespondenceType(id: number): Observable<{ correspondenceType: CorrespondenceTypeI }> {
    return this.http.get<{ correspondenceType: CorrespondenceTypeI }>(`${this.correspondenceTypes_path}/${id}`);
  }

  /** 
   * Retrieves all correspondence states
   * @returns Observable containing an array of CorrespondenceStateI objects
   */
  getAllCorrespondenceStates(): Observable<CorrespondenceStateI[]> {
    return this.http.get<CorrespondenceStateI[]>(this.correspondenceStates_path);
  }

  /** 
   * Retrieves a correspondence state by ID
   * @param id - Correspondence state ID to retrieve
   * @returns Observable containing a single CorrespondenceStateI object
   */
  getOneCorrespondenceState(id: number): Observable<{ correspondenceState: CorrespondenceStateI }> {
    return this.http.get<{ correspondenceState: CorrespondenceStateI }>(`${this.correspondenceStates_path}/${id}`);
  }

  /** 
   * Retrieves all branches
   * @returns Observable containing an array of BranchI objects
   */
  getAllBranches(): Observable<BranchI[]> {
    return this.http.get<BranchI[]>(this.branches_path);
  }

  /** 
   * Retrieves a branch by ID
   * @param id - Branch ID to retrieve
   * @returns Observable containing a single BranchI object
   */
  getOneBranch(id: number): Observable<{ branch: BranchI }> {
    return this.http.get<{ branch: BranchI }>(`${this.branches_path}/${id}`);
  }

  /** 
   * Retrieves all transports
   * @returns Observable containing an array of TransportI objects
   */
  getAllTransports(): Observable<TransportI[]> {
    return this.http.get<TransportI[]>(this.transports_path);
  }

  /** 
   * Retrieves a transport by ID
   * @param id - Transport ID to retrieve
   * @returns Observable containing a single TransportI object
   */
  getOneTransport(id: number): Observable<{ transport: TransportI }> {
    return this.http.get<{ transport: TransportI }>(`${this.transports_path}/${id}`);
  }
}
