"use client";

import { createUser } from "@/app/(portal)/kullanicilar/actions";


export default function UserForm(){

  return (

    <form
      action={createUser}
      className="user-form"
    >


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
            placeholder="ornek@firma.com"
            required
          />

        </label>




        <label>

          Kullanıcı Rolü


          <select
            name="role"
            defaultValue="BAYI"
          >

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


        </label>


      </div>




      <div className="form-actions">


        <button
          type="submit"
        >

          Kullanıcı Kaydet

        </button>


      </div>


    </form>

  );

}