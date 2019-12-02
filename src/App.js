import React, { useState, useRef } from 'react';
import Card from './Card';
import FormGroup from './FormGroup';
import styles from './App.module.scss';

const defaultItems = [
  'Camel Cup',
  'MTG draft',
  'Star Wars Epic Duels (> 4 players)',
  'Terra Mystica',
  'Gizmos',
  '8 player Robo Rally',
  'Age of Steam',
  'Terraforming Mars',
  'Great Western Trail',
  'Wildcatters',
  'Bee Lives',
  'Blank #0',
  'Blank #1',
  'Blank #2',
  'Blank #3',
  'Blank #4',
  'Blank #5',
  'Blank #6',
  'Blank #7',
  'Blank #8',
  'Blank #9',
  'Blank #10',
  'Blank #11',
  'Blank #12',
  'Blank #13',
];

const App = () => {
  const [title, setTitle] = useState('Board Game Bingo');
  const [freeText, setFreeText] = useState('FREE');
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [items, setItems] = useState(defaultItems);
  const addInputRef = useRef(null);
  const clickHandler = () => {
    const item = addInputRef.current.value;
    if (item && !items.includes(item)) {
      setItems([ item, ...items ]);
      addInputRef.current.value = '';
    }
    addInputRef.current.focus();
  };
  const removeItem = (item) => {
    setItems([ ...items ].filter((x) => x !== item));
  };
  return (
    <div className={styles.App}>
      <div className={styles.Form}>
        <fieldset>
          <FormGroup label="Card title">
            <input type="text" className="form-control" value={title} onChange={(event) => setTitle(event.target.value)} />
          </FormGroup>
          <FormGroup label="Free space">
            <input type="text" className="form-control" value={freeText} onChange={(event) => setFreeText(event.target.value)} />
          </FormGroup>
          <FormGroup label="Board Width" after="spaces">
            <input type="number" min="1" className="form-control" value={width} onChange={(event) => setWidth(event.target.value)} />
          </FormGroup>
          <FormGroup label="Board Height" after="spaces">
            <input type="number" min="1" className="form-control" value={height} onChange={(event) => setHeight(event.target.value)} />
          </FormGroup>
        </fieldset>
        <div className={styles.Items}>
          <FormGroup label="Add item" after={<button type="button" onClick={clickHandler}>+</button>}>
            <input type="text" className="form-control" defaultValue="" onKeyUp={(event) => { if (event.key === 'Enter') clickHandler(); }} ref={addInputRef} />
          </FormGroup>
          <div>
            <div>
              <ul className="list-group">
                { items.map((item) =>
                  <li key={item} className="list-group-item">
                    <span>{item}</span>
                    <button type="button" onClick={() => removeItem(item)}>
                      &times;
                    </button>
                  </li>
                ) }
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Cards}>
        { [0, 1].map((seed) =>
          <Card
            items={items}
            title={title}
            freeText={freeText}
            seed={seed}
            width={width}
            height={height}
          />
        ) }
      </div>
    </div>
  );
};

export default App;
