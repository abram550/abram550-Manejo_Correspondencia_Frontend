// src/app/services/branches/branches.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchI } from '../../models/Branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  api_uri_node = 'http://localhost:4000';
  base_path = `${this.api_uri_node}/branches`;

  constructor(private http: HttpClient) {}

  /**
   * Retrieves all branches
   * @returns Observable containing an array of BranchI objects
   */
  getAllBranches(): Observable<{ branches: BranchI[] }> {
    return this.http.get<{ branches: BranchI[] }>(this.base_path);
  }

  /**
   * Retrieves a branch by ID
   * @param id - Branch ID to retrieve
   * @returns Observable containing a BranchI object
   */
  getOneBranch(id: number): Observable<{ branch: BranchI }> {
    return this.http.get<{ branch: BranchI }>(`${this.base_path}/${id}`);
  }

  /**
   * Creates a new branch
   * @param data - Branch data to create
   * @returns Observable of the created BranchI
   */
  createBranch(data: any): Observable<BranchI> {
    return this.http.post<BranchI>(this.base_path, data);
  }

  /**
   * Updates an existing branch
   * @param id - ID of the branch to update
   * @param data - Updated branch data
   * @returns Observable of the updated BranchI
   */
  updateBranch(id: number, data: any): Observable<BranchI> {
    return this.http.put<BranchI>(`${this.base_path}/${id}`, data);
  }

  /**
   * Deletes a branch by ID
   * @param id - Branch ID to delete
   * @returns Observable of the deleted BranchI
   */
  deleteBranch(id: number): Observable<BranchI> {
    return this.http.delete<BranchI>(`${this.base_path}/${id}`);
  }
}
