import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission, NinjaStats } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMissions(): Observable<{ data: Mission[] }> {
    return this.http.get<{ data: Mission[] }>(`${this.apiUrl}/missions`);
  }

  acceptMission(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/missions/${id}/accept`, {});
  }

  reportMission(id: string, reportText: string, evidenceUrl: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/missions/${id}/report`, {
      reportText,
      evidenceImageUrl: evidenceUrl
    });
  }

  getStats(): Observable<NinjaStats> {
    return this.http.get<NinjaStats>(`${this.apiUrl}/ninjas/me/stats`);
  }
}