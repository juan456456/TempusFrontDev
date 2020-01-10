import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';    
    
@Injectable({    
  providedIn: 'root'    
})    
export class EmitterService {    
    
  invokeHoraRefreshEvents = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  onRefreshEventsHoraComponent() {    
    this.invokeHoraRefreshEvents.emit();    
  }    
}  