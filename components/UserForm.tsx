"use client";

import { createUser } from "@/app/(portal)/kullanicilar/actions";

export default function UserForm(){

return (

<form action={createUser}>

<input
name="name"
placeholder="Ad Soyad"
/>

<input
name="email"
placeholder="Microsoft Email"
/>

<select name="role">

<option value="BAYI">
Bayi
</option>

<option value="DEPO">
Depo
</option>

<option value="FINANS">
Finans
</option>

<option value="ADMIN">
Admin
</option>

</select>

<button type="submit">

Kaydet

</button>

</form>

);

}