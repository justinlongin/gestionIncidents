// resources/js/Components/NotificationDropdown.jsx
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Notification } from '@/types';

type Props = {
    notifications: Notification[]
}
export function NotificationDropdown({ notifications }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const markAsRead = (id: number) => {
        router.post(`/notifications/${id}/read`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100"
            >
                🔔
                {notifications.filter(n => !n.read_at).length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        {notifications.filter(n => !n.read_at).length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-gray-500 text-center">
                                Aucune notification
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div 
                                    key={notification.id}
                                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                        !notification.read_at ? 'bg-blue-50' : ''
                                    }`}
                                    onClick={() => {
                                        markAsRead(notification.id);
                                        router.visit(`/incidents/${notification.data.incident_id}`);
                                    }}
                                >
                                    <p className="text-sm font-medium">{notification.data.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {new Date(notification.created_at).toLocaleString('fr-FR')}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}