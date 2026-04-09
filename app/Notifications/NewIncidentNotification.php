<?php

namespace App\Notifications;

use App\Models\Incident;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewIncidentNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected $incident;

    public function __construct(Incident $incident)
    {
        $this->incident = $incident;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database','mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
        ->subject('Nouvel incident créé')
        ->line('Un nouvel incident a été créé.')
        ->line('Titre: ' . $this->incident->titre)
        ->line('Priorité: ' . $this->incident->priorite->nom)
        ->action('Voir l\'incident', url('/intervention/view/' . $this->incident->id))
        ->line('Merci de traiter cet incident rapidement.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'incident_id' => $this->incident->id,
            'incident_titre' => $this->incident->titre,
            'incident_priority' => $this->incident->priorite->nom,
            'created_by' => $this->incident->user->name ?? 'Inconnu',
            'message' => 'Un nouvel incident a été créé: ' . $this->incident->titre,
        ];
    }
}
