import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Mission } from '../models/mission';
import { CreateMissionDto } from '../models/Dto/CreateMission.Dto';

@Injectable({
  providedIn: 'root',
})
export class MissionService {
  private baseUrl = 'http://localhost:3000/missions';
  isTblLoading = true;
  public dataChange: BehaviorSubject<Mission[]> = new BehaviorSubject<
    Mission[]
  >([]);
  dialogData!: Mission;
  constructor(private http: HttpClient) {}

  assignUserToMission(missionId: string, userId: string): Observable<Mission> {
    const data = { missionId, userId };
    return this.http.post<Mission>(`${this.baseUrl}/assign-user`, data);
  }
  getDialogData() {
    return this.dialogData;
  }

  createMission(createMissionDto: CreateMissionDto): Observable<Mission> {
    return this.http.post<Mission>(`${this.baseUrl}/create`, createMissionDto);
  }

  updateDataChange(missions: Mission[]): void {
    this.dataChange.next(missions);
  }

  getDataChange(): Observable<Mission[]> {
    return this.dataChange.asObservable();
  }
  get data(): Mission[] {
    return this.dataChange.value;
  }

  addMission(missions: Mission): void {}

  deleteMission(missionId: string): Observable<void> {
    const url = `${this.baseUrl}/${missionId}`;
    return this.http.delete<void>(url);
  }
  updateMission(
    missionId: string,
    updateMissionDto: CreateMissionDto
  ): Observable<Mission> {
    const url = `${this.baseUrl}/${missionId}`;
    return this.http.put<Mission>(url, updateMissionDto);
  }
  deleteMultipleMissions(missionIds: (string | undefined)[]): Observable<void> {
    const url = `${this.baseUrl}/delete-multiple`;
    return this.http.delete<void>(url);
  }

  getAllMissions(): void {}

  createAndAssignMission(
    createMissionDto: CreateMissionDto
  ): Observable<Mission> {
    const clientId = this.getTokenFromCookie();
    const url = `${this.baseUrl}/${clientId}`;
    return this.http.post<Mission>(url, createMissionDto);
  }
}
