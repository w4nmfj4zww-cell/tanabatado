import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { uploadData, getUrl } from 'aws-amplify/storage';
import type { Schema } from "../../amplify/data/resource";

// generate your data client
const client = generateClient<Schema>();

interface Product {
  id: string;
  name: string;
  description: string;
  imageKey: string;
  imageUrl?: string;
}

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImageFile, setProductImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    // fetch all products
    const { data: products } = await client.models.Product.list();
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        if (product.imageKey) {
          const url = await getUrl({ key: product.imageKey });
          product.imageUrl = url.url.toString();
        }
        return product;
      })
    );
    setProducts(productsWithImages);
  }

  async function createProduct(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!productImageFile || !productName || !productDescription) {
      alert('Please provide a name, description, and an image.');
      return;
    }

    try {
      const result = await uploadData({
        path: `public/product-images/${Date.now()}-${productImageFile.name}`,
        data: productImageFile,
      }).result;
      console.log('Succeeded: ', result);

      await client.models.Product.create({
        name: productName,
        description: productDescription,
        imageKey: result.path,
      });

      setProductName('');
      setProductDescription('');
      setProductImageFile(null);
      // After creating a new product, refetch the list of products
      fetchProducts();
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  return (
    <main>
      <h1>商品登録</h1>
      <form onSubmit={createProduct}>
        <div>
          <label>
            商品名:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            商品説明:
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            商品画像:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProductImageFile(e.target.files ? e.target.files[0] : null)}
            />
          </label>
        </div>
        <button type="submit">商品を登録する</button>
      </form>

      <h1>商品一覧</h1>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} style={{ width: "150px", height: "150px" }} />}
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProductPage;
