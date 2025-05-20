import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export enum NotificationType {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info',
    WARNING = 'warning'
}

export interface Notification {
    type: NotificationType;
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationSubject = new Subject<Notification>();

    constructor() { }

    // Observable que pueden subscribirse los componentes
    getNotifications(): Observable<Notification> {
        return this.notificationSubject.asObservable();
    }

    // Métodos para mostrar diferentes tipos de notificaciones
    success(message: string): void {
        this.showNotification(NotificationType.SUCCESS, message);
    }

    error(message: string): void {
        this.showNotification(NotificationType.ERROR, message);
    }

    info(message: string): void {
        this.showNotification(NotificationType.INFO, message);
    }

    warning(message: string): void {
        this.showNotification(NotificationType.WARNING, message);
    }

    private showNotification(type: NotificationType, message: string): void {
        this.notificationSubject.next({ type, message });
    }
}