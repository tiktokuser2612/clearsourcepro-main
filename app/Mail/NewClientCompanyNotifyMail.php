<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewClientCompanyNotifyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $clientCompany;
    public $user_updated;
    public $clientUser;
    /**
     * Create a new message instance.
     *
     * @param $new_password
     * @param bool $user_updated
     */
    public function __construct($clientCompany, $user_updated = false , $clientUser)
    {
        $this->clientCompany = $clientCompany;
        $this->user_updated = $user_updated;
        $this->clientUser = $clientUser;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.newClientCompanyNotify')->subject('New client company added');
    }
}
