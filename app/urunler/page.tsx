// app/products/page.tsx
"use client";

import React from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  url: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Mobil Geri Dönüşüm Makineleri",
    description: "Mobil Geri Dönüşüm Makineleri, atık malzemeleri geri dönüştürmek için kullanılan taşınabilir cihazlardır. Bu makineler, plastik, metal, cam ve kağıt gibi çeşitli atık türlerini işleyebilir ve yeniden kullanılabilir malzemelere dönüştürebilir. Mobil geri dönüşüm makineleri, çevre dostu bir yaklaşım sunar ve atık yönetimini daha verimli hale getirir.",
    price: 169900, // .toLocaleString ile düzgün biçimlenmesi için number formatı düzeltildi
    image: "images/eys-6-upper-right.jpg",
    url: "https://e-y-s.com/en/environmental-technology/mobile-recycling-machines/"
  },
  {
    id: 2,
    name: "EYS - 50",
    description: "Yeni nesil Kompost Makinesi, organik atıkları hızlı ve etkili bir şekilde kompost haline getirir. EYS - 50, enerji verimliliği yüksek motoru ve kullanıcı dostu arayüzü ile öne çıkar. Kompakt tasarımı sayesinde sınırlı alanlarda bile rahatlıkla kullanılabilir. EYS - 50, çevre bilincine sahip bireyler ve işletmeler için ideal bir çözümdür.",
    price: 19999,
    image: "images/eys-50-front-up.jpg",
    url: "https://e-y-s.com/en/environmental-technology/mobile-recycling-machines/"
  },
  {
    id: 3,
    name: "Kompost Tamburu",
    description: "Kompost Tamburu, organik atıkları etkili bir şekilde kompost haline getirir. Kompakt tasarımı sayesinde sınırlı alanlarda bile rahatlıkla kullanılabilir. Kompost Tamburu, çevre bilincine sahip bireyler ve işletmeler için ideal bir çözümdür.",
    price: 2499,
    image: "images/bedding-composter-11.jpg",
    url: "https://e-y-s.com/en/environmental-technology/mobile-recycling-machines/"
  },
  {
    id: 4,
    name: "Seperatör Makinesi",
    description: "Seperatör Makinesi, atık malzemeleri ayırarak geri dönüştürme işlemi yapar. Kompakt tasarımı sayesinde sınırlı alanlarda bile rahatlıkla kullanılabilir. Seperatör Makinesi, çevre bilincine sahip bireyler ve işletmeler için ideal bir çözümdür.",
    price: 55000,
    image: "images/vidali-pres-seperator.jpg",
    url: "https://e-y-s.com/en/products-industries/eys-screw-press-manure-separators/"
  },
  {
    id: 5,
    name: "Karıştırıcı Makinesi",
    description: "Karıştırıcı Makinesi, organik atıkları etkili bir şekilde karıştırarak kompost sürecini hızlandırır. Kompakt tasarımı sayesinde sınırlı alanlarda bile rahatlıkla kullanılabilir. Karıştırıcı Makinesi, çevre bilincine sahip bireyler ve işletmeler için ideal bir çözümdür.",
    price: 44000,
    image: "images/dalgic-karistirici.jpg",
    url: "https://e-y-s.com/en/manure-management/submersible-mixer/"
  },
  {
    id: 6,
    name: "Sıyırıcı Makinesi",
    description: "Sıyırıcı Makinesi, atık malzemeleri etkili bir şekilde sıyırarak geri dönüştürme işlemi yapar. Kompakt tasarımı sayesinde sınırlı alanlarda bile rahatlıkla kullanılabilir. Sıyırıcı Makinesi, çevre bilincine sahip bireyler ve işletmeler için ideal bir çözümdür.",
    price: 67000,
    image: "images/gubre-siyirici.jpg",
    url: "https://e-y-s.com/en/products-industries/eys-manure-scraper/"
  },
];

export default function UrunlerPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ürünler</h1>
        <p className="mt-1 text-sm text-[#53575A]">Çevre teknolojileri ve atık yönetimi çözümlerimizi inceleyin.</p>
      </div>

      <hr className="border-gray-200" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="h-52 w-full object-cover bg-gray-50"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-sm text-[#53575A] leading-relaxed line-clamp-4">
                  {product.description}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 mt-auto">
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xl font-extrabold text-[#EA0029]">
                  {product.price.toLocaleString("tr-TR")} ₺
                </span>

                <a 
                  className="inline-flex items-center justify-center rounded-lg bg-[#EA0029] hover:bg-[#c40022] px-4 py-2 text-sm font-medium text-white transition-colors shadow-sm outline-none focus:ring-2 focus:ring-[rgba(234,0,41,0.15)]" 
                  href={product.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                >
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