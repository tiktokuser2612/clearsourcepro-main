<b>Hi {{$clientUser->username}}</v>
<br />

<p>You have associated with following client/company</p>

@if ($user_updated && $clientCompany)
    Name : {{ $clientCompany->company_name }}<br />
    Location : {{ $clientCompany->locations }}<br />
    Type : {{ $clientCompany->company_type }}<br />
    Website : {{ $clientCompany->company_website }}<br />
@endif
<br />

<p>
Thank You,
ClearSourceRPO
</p>