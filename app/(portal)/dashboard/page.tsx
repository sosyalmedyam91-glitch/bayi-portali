export default function Dashboard() {

  const cards = [
    {
      title:"Toplam Ürün",
      value:"26",
      icon:"📦"
    },
    {
      title:"Toplam Kullanıcı",
      value:"252",
      icon:"👥"
    },
    {
      title:"Aktif Kullanıcı",
      value:"13",
      icon:"🟢"
    },
    {
      title:"Bekleyen Teklif",
      value:"37",
      icon:"📄"
    }
  ];


  return (
    <div className="dashboard-container">
      <div className="stats-grid">

        {
          cards.map((card,index)=>(
            <div 
              className="stat-card"
              key={index}
            >

              <div className="stat-icon">
                {card.icon}
              </div>

              <div>
                <p>{card.title}</p>
                <h2>{card.value}</h2>
              </div>

            </div>
          ))
        }

      </div>



      <div className="panel-grid">


        <div className="panel">

          <h3>
            Son Siparişler
          </h3>


          <table>

            <thead>
              <tr>
                <th>No</th>
                <th>Müşteri</th>
                <th>Tarih</th>
                <th>Durum</th>
                <th>Tutar</th>
              </tr>
            </thead>


            <tbody>

              <tr>
                <td>#10245</td>
                <td>Ahmet Yılmaz</td>
                <td>08.07.2026</td>
                <td>
                  <span className="success">
                    Hazırlanıyor
                  </span>
                </td>
                <td>
                  12.500 ₺
                </td>
              </tr>


              <tr>
                <td>#10244</td>
                <td>Mehmet Kaya</td>
                <td>07.07.2026</td>
                <td>
                  <span className="success">
                    Tamamlandı
                  </span>
                </td>
                <td>
                  8.750 ₺
                </td>
              </tr>

            </tbody>

          </table>

        </div>



        <div className="panel">

          <h3>
            Son Teklifler
          </h3>


          <table>

            <thead>

              <tr>
                <th>No</th>
                <th>Firma</th>
                <th>Tarih</th>
                <th>Durum</th>
              </tr>

            </thead>


            <tbody>

              <tr>
                <td>#T458</td>
                <td>ABC Teknoloji</td>
                <td>08.07.2026</td>
                <td>
                  <span className="warning">
                    Yeni
                  </span>
                </td>
              </tr>


              <tr>
                <td>#T457</td>
                <td>XYZ Ltd.</td>
                <td>07.07.2026</td>
                <td>
                  <span className="success">
                    Onaylandı
                  </span>
                </td>
              </tr>


            </tbody>

          </table>


        </div>


      </div>


    </div>
  );
}