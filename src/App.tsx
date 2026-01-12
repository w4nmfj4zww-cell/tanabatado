import { useState } from "react";

interface Product {
  id: number;
  imageUrl: string;
  price: number;
}

function App() {
  const [products] = useState<Product[]>([
    { id: 1, imageUrl: "https://placehold.jp/150x150.png", price: 1000 },
    { id: 2, imageUrl: "https://placehold.jp/150x150.png", price: 2500 },
    { id: 3, imageUrl: "https://placehold.jp/150x150.png", price: 5000 },
  ]);

  return (
    <main>
      <h1>商品一覧</h1>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
            <img src={product.imageUrl} alt="商品画像" />
            <p>価格: ¥{product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
