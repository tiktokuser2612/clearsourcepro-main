<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;

    public $new_password;
    public $user_updated;

    /**
     * Create a new message instance.
     *
     * @param $new_password
     * @param bool $user_updated
     */
    public function __construct($new_password, $user_updated = false)
    {
        $this->new_password = $new_password;
        $this->user_updated = $user_updated;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.passwordreset')->subject('Password reset for ClearSource');
    }
}
