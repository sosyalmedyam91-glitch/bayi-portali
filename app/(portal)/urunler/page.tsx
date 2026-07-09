"use client";

import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

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
  const [listView, setListView] = useState(true);
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl space-y-6">
<div className="flex items-start justify-between gap-4">
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
      Ürünler
    </h1>
    <p className="mt-1 text-sm text-[#53575A]">
      Çevre teknolojileri ve atık yönetimi çözümlerimizi inceleyin.
    </p>
  </div>

<div className="inline-flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
  <button
    onClick={() => setListView(false)}
    className={`flex items-center justify-center p-2 transition ${
      !listView
        ? "bg-[#EA0029] text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`}
    title="Kart Görünümü"
  >
    <LayoutGrid size={20} />
  </button>

  <button
    onClick={() => setListView(true)}
    className={`flex items-center justify-center p-2 transition ${
      listView
        ? "bg-[#EA0029] text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`}
    title="Liste Görünümü"
  >
    <List size={20} />
  </button>
</div>
</div>

      <hr className="border-gray-200" />

      <div
  className={
    listView
      ? "flex flex-col gap-5"
      : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
  }
>
        {products.map((product) => (
          <div
            key={product.id}
            className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg ${
  listView
    ? "flex flex-row items-stretch"
    : "flex flex-col justify-between"
}`}
          >
            <div className={listView ? "flex flex-1" : ""}>
<img
  src={product.image}
  alt={product.name}
  className={
    listView
      ? "w-72 h-auto object-cover"
      : "h-52 w-full object-cover bg-gray-50"
  }
/>

              <div className="p-4 flex-1 space-y-2">
                <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-sm text-[#53575A] leading-relaxed line-clamp-4">
                  {product.description}
                </p>
              </div>
            </div>

<div
  className={
    listView
      ? "w-56 border-l border-gray-200 p-6 flex flex-col items-center justify-center gap-5"
      : "p-4 pt-0 mt-auto"
  }
>
  {listView ? (
    <>
<span className="text-xl font-semibold text-[#EA0029]">
  {product.price.toLocaleString("tr-TR")} ₺
</span>

      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full rounded-lg bg-[#EA0029] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#c40022]"
      >
        Ürün Detay
      </a>
    </>
  ) : (
<div className="w-56 border-l border-gray-200 p-6 flex flex-col items-center justify-center gap-4">
  <span className="text-2xl font-bold text-[#EA0029]">
    {product.price.toLocaleString("tr-TR")} ₺
  </span>

  <a
    href={product.url}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full rounded-lg bg-[#EA0029] py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#c40022]"
  >
    Ürün Detay
  </a>
</div>
  )}
</div>
          </div>
        ))}
      </div>
    </main>
  );
}