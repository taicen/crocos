import React, { useState, useEffect } from 'react';

import Navigation from '../Navigation';
import Button from '../../modules/Button';

const Header = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Обновляем заголовок документа, используя API браузера
    document.title = `Вы нажали ${count} раз`;
  });

  return (
    <header className="x-header">
      <div className="is-navbar-container">
        <div className="is-brand">
            <b className="is-logo">Brand</b>
        </div>
        <div className="is-navbar">
          <Navigation />
        </div>
        <div>
          <p>Вы кликнули {count} раз</p>
          <button onClick={() => setCount(count + 1)}>
            Нажми на меня
          </button>
        </div>
        <div>
          <Button/>
        </div>
      </div>
    </header>
  );
};

export default Header;