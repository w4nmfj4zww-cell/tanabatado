import React, { useState } from 'react';

type UIPosition = 'left' | 'center' | 'right';

const SettingsPage: React.FC = () => {
  const [uiSize, setUiSize] = useState(100); // in percentage
  const [uiPosition, setUiPosition] = useState<UIPosition>('center');
  const [dogAnimationOn, setDogAnimationOn] = useState(true);

  return (
    <div>
      <h1>設定</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>回答UIのカスタマイズ</h2>
        <div>
          <label htmlFor="ui-size">サイズ: {uiSize}%</label>
          <input
            id="ui-size"
            type="range"
            min="50"
            max="150"
            value={uiSize}
            onChange={(e) => setUiSize(Number(e.target.value))}
          />
        </div>
        <div>
          <label>配置:</label>
          <button onClick={() => setUiPosition('left')} disabled={uiPosition === 'left'}>左</button>
          <button onClick={() => setUiPosition('center')} disabled={uiPosition === 'center'}>中央</button>
          <button onClick={() => setUiPosition('right')} disabled={uiPosition === 'right'}>右</button>
        </div>
        <p>現在の設定: サイズ {uiSize}%, 配置 {uiPosition}</p>
        <p>（この設定はまだ実際のUIに反映されません）</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>犬アニメーション</h2>
        <div>
          <label>
            <input
              type="checkbox"
              checked={dogAnimationOn}
              onChange={(e) => setDogAnimationOn(e.target.checked)}
            />
            犬アニメーションの呼び出しを有効にする
          </label>
        </div>
        <p>（この設定はまだ実際のUIに反映されません）</p>
      </div>
    </div>
  );
};

export default SettingsPage;