<h1>Password reset for ClearSource!</h1>
You have requested to reset password for your account on ClearSource. <br />
@if ($user_updated)
Don't forget your new password: <br />
@else
We have generated new password for your account: <br />
@endif
<br />
<h5>
{{ $new_password }}
</h5>
