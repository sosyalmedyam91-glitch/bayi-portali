type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Mobil Geri Dönüşüm Makineleri",
    description: "Mobil Geri Dönüşüm Makineleri, atık malzemeleri geri dönüştürmek için kullanılan taşınabilir cihazlardır. Bu makineler, plastik, metal, cam ve kağıt gibi çeşitli atık türlerini işleyebilir ve yeniden kullanılabilir malzemelere dönüştürebilir. Mobil geri dönüşüm makineleri, çevre dostu bir yaklaşım sunar ve atık yönetimini daha verimli hale getirir.",
    price: 169.900,
    image: "images/eys-6-upper-right.jpg",
  },
  {
    id: 2,
    name: "EYS - 50",
    description: "Yeni nesil Kompost Makinesi, organik atıkları hızlı ve etkili bir şekilde kompost haline getirir. EYS - 50, enerji verimliliği yüksek motoru ve kullanıcı dostu arayüzü ile öne çıkar. Kompakt tasarımı sayesinde sınırlı alanlarda bile rahatlıkla kullanılabilir. EYS - 50, çevre bilincine sahip bireyler ve işletmeler için ideal bir çözümdür.",
    price: 19.999,
    image: "images/eys-50-front-up.jpg",
  },
  {
    id: 3,
    name: "Kompost Tamburu",
    description: "Kompost Tamburu, organik atıkları etkili bir şekilde kompost haline getirir. Kompakt tasarımı sayesinde sınırlı alanlarda bile rahatlıkla kullanılabilir. Kompost Tamburu, çevre bilincine sahip bireyler ve işletmeler için ideal bir çözümdür.",
    price: 2.499,
    image: "images/bedding-composter-11.jpg",
  },
];

export default function UrunlerPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Ürünler</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-xl border shadow-sm transition hover:shadow-lg"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>

              <p className="mt-2 text-gray-600">
                {product.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">
                  {product.price.toLocaleString("tr-TR")} ₺
                </span>

                <a className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" href="https://e-y-s.com/en/environmental-technology/mobile-recycling-machines/" target="_blank" rel="noopener noreferrer">
                  Ürün Detay
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}