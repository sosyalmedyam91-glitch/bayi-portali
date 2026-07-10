"use client";

import { createUser } from "@/app/(portal)/kullanicilar/actions";

export default function UserForm() {
  return (
    <form action={createUser} className="user-form">
      <div className="form-grid">
        <label>
          Ad Soyad
          <input
            name="name"
            type="text"
            placeholder="Kullanıcı adı soyadı"
            required
          />
        </label>

        <label>
          EYS Mail
          <input
            name="email"
            type="email"
            placeholder="isim@e-y-s.com"
            required
          />
        </label>

        <label>
          Departman
          <input
            name="department"
            type="text"
            placeholder="Arge, Satış, Üretim vb."
            required
          />
        </label>

        <label>
          Kullanıcı Rolü
          <select name="role" defaultValue="SPECIALIST">
            <option value="SUPER_ADMIN">Super Admin</option>

            <option value="ADMIN">Admin</option>

            <option value="SPECIALIST">Specialist</option>
          </select>
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">Kullanıcı Kaydet</button>
      </div>
    </form>
  );
}
