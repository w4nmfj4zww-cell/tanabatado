import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const AdminPage: React.FC = () => {
  const [dogImage, setDogImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDogImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = useCallback(() => {
    if (dogImage) {
      // ここで画像の保存処理を実装します。
      // 例えば、localStorageに保存するか、サーバーにアップロードします。
      localStorage.setItem('dogImage', dogImage);
      alert('画像を保存しました。');
    }
  }, [dogImage]);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>管理者ページ</h1>
      <h2>犬の画像登録</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {dogImage && (
        <div style={{ marginTop: '20px' }}>
          <h3>プレビュー</h3>
          <img src={dogImage} alt="犬のプレビュー" style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '10px' }} />
        </div>
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSave} disabled={!dogImage} style={{ padding: '10px 20px', fontSize: '1em', marginRight: '10px' }}>
          保存
        </button>
        <Link to="/">
          <button>トップページに戻る</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
