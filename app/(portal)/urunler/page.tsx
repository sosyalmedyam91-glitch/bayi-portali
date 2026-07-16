"use client";

import React, { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  url: string;
  document?: string;
  category: "Atık Yönetimi" | "Geri Dönüşüm";
};

const products: Product[] = [
  {
    id: 1,
    name: "Mobil Geri Dönüşüm Makineleri",
    description:
      "Atık malzemeleri geri dönüştürmek için kullanılan taşınabilir geri dönüşüm çözümleri.",
    price: 169900,
    image: "/images/eys-6-upper-right.jpg",
    url: "https://e-y-s.com/en/environmental-technology/mobile-recycling-machines",
    document:
      "https://www.eys-gmbh.de/wp-content/uploads/T-14-01-Mobile-Recyclingmaschinen-Katalog.pdf",
    category: "Geri Dönüşüm",
  },
  {
    id: 2,
    name: "EYS - 50",
    description:
      "Organik atıkları hızlı ve verimli şekilde kompost haline getiren yeni nesil kompost makinesi.",
    price: 19999,
    image: "/images/eys-50-front-up.jpg",
    url: "https://e-y-s.com/en/environmental-technology/self-propelled-turner",
    document:
      "https://www.eys-gmbh.de/wp-content/uploads/T-14-01-Mobile-Recyclingmaschinen-Katalog.pdf#page=13",
    category: "Geri Dönüşüm",
  },
  {
    id: 3,
    name: "Kompost Tamburu",
    description:
      "Organik atıkların doğal süreçlerle kompostlaştırılmasını sağlayan çözüm.",
    price: 2499,
    image: "/images/bedding-composter-11.jpg",
    url: "https://e-y-s.com/en/environmental-technology/bedding-composter",
    document:
      "https://www.eys-gmbh.de/wp-content/uploads/EYS-Bedding-Composter.pdf",
    category: "Atık Yönetimi",
  },
  {
    id: 4,
    name: "Seperatör Makinesi",
    description: "Katı ve sıvı atıkları ayırarak etkin atık yönetimi sağlar.",
    price: 55000,
    image: "/images/vidali-pres-seperator.jpg",
    url: "https://e-y-s.com/en/products-industries/eys-screw-press-manure-separators",
    document:
      "https://www.eys-gmbh.de/wp-content/uploads/Screw-Press-Separators.pdf",
    category: "Atık Yönetimi",
  },
  {
    id: 5,
    name: "Karıştırıcı Makinesi",
    description:
      "Kompost sürecini hızlandırmak için organik malzemeleri karıştırır.",
    price: 44000,
    image: "/images/dalgic-karistirici.jpg",
    url: "https://e-y-s.com/en/manure-management/submersible-mixer/",
    document:
      "https://www.eys-gmbh.de/wp-content/uploads/Submersible-Mixers.pdf",
    category: "Atık Yönetimi",
  },
  {
    id: 6,
    name: "Sıyırıcı Makinesi",
    description: "Atıkların etkin şekilde toplanmasını ve işlenmesini sağlar.",
    price: 67000,
    image: "/images/gubre-siyirici.jpg",
    url: "https://e-y-s.com/en/products-industries/eys-manure-scraper",
    document: "https://www.eys-gmbh.de/wp-content/uploads/Scrapers.pdf",
    category: "Atık Yönetimi",
  },
];

export default function UrunlerPage() {
  const [listView, setListView] = useState(true);

  const categories = ["Atık Yönetimi", "Geri Dönüşüm"] as const;

  return (
    <main className="container mx-auto max-w-7xl space-y-8 px-4 py-8">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ürünler</h1>

          <p className="mt-2 text-sm text-[#53575A]">
            Atık yönetimi ve geri dönüşüm teknolojilerimizi inceleyin.
          </p>
        </div>

        {/* VIEW SWITCH */}
        <div className="flex overflow-hidden rounded-lg border bg-white shadow-sm">
          <button
            onClick={() => setListView(false)}
            className={`p-2 ${
              !listView
                ? "bg-[#EA0029] text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid size={20} />
          </button>

          <button
            onClick={() => setListView(true)}
            className={`p-2 ${
              listView
                ? "bg-[#EA0029] text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      <hr />

      {/* CATEGORIES */}

      {categories.map((category) => {
        const filteredProducts = products.filter(
          (item) => item.category === category,
        );

        return (
          <section key={category} className="space-y-5">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-[#53575A]">{category}</h2>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div
              className={
                listView
                  ? "flex flex-col gap-5"
                  : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              }
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`
overflow-hidden
rounded-xl
border
bg-white
shadow-sm
transition
hover:shadow-lg
${listView ? "flex" : "flex h-full flex-col"}
`}
                >
                  <div className={listView ? "flex flex-1" : ""}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={500}
                      height={350}
                      className={
                        listView
                          ? "h-56 w-72 object-cover"
                          : "h-52 w-full object-cover"
                      }
                    />

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-sm text-[#53575A] line-clamp-4">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={
                      listView
                        ? "flex w-56 shrink-0 flex-col items-center justify-center gap-5 border-l p-5"
                        : "mt-auto flex flex-col gap-4 p-5"
                    }
                  >
                    <span className="text-xl font-bold text-[#EA0029]">
                      {product.price.toLocaleString("tr-TR")} ₺
                    </span>

                    <div className="flex w-full gap-2">
                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
      flex-1
      flex
      h-11
      items-center
      justify-center
      rounded-lg
      bg-[#EA0029]
      text-sm
      font-semibold
      text-white
      transition
      hover:bg-[#c40022]
    "
                      >
                        Ürün Detay
                      </a>

                      {product.document && (
                        <a
                          href={product.document}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
        flex-1
        flex
        h-11
        items-center
        justify-center
        rounded-lg
        border
        border-[#EA0029]
        text-sm
        font-semibold
        text-[#EA0029]
        transition
        hover:bg-[#EA0029]
        hover:text-white
      "
                        >
                          Dokümanlar
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
