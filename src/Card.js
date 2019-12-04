/* eslint-disable no-mixed-operators */
import React from 'react';
import styles from './Card.module.scss';

// We need to seed our random number generator so that we get consistently
// ordered output for each card. Otherwise, each state change results in
// shuffled output.
// Source of functions: https://stackoverflow.com/a/47593316/379160
const xmur3 = (str) => {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  }
};
const sfc32 = (a, b, c, d) => {
  return function() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
};

const Card = ({ title, freeText, freeTextCentered, items, seed, width, height, fontSize }) => {
  // Seed the PRNG with the card index so that the order of output is always
  // randomized the same way per card
  const seedGenerator = xmur3(String(seed));
  const rand = sfc32(seedGenerator(), seedGenerator(), seedGenerator(), seedGenerator());

  // Write the items into a new `randomized` array that can be "sorted" by the
  // output of the PRNG
  const randomized = [];
  const arrSize = width * height;
  while (randomized.length < arrSize) {
    items.forEach((item) => randomized.push(item));
  }
  randomized.sort((a, b) => rand() < .5 ? -1 : 1);

  // Add a "FREE" cell in either a random or static location
  const freeTextRandom = rand();
  if (freeText) {
    const freeTextLocation = freeTextCentered ?
      (Math.floor(height / 2) * width) + Math.floor(width / 2) :
      Math.floor(freeTextRandom * arrSize);
    randomized.splice(freeTextLocation, 0, freeText);
  }

  return (
    <div className={styles.Center}>
      <div className={styles.Card}>
        <h1>{title}</h1>
        <div className={styles.Grid} style={{ gridTemplateColumns: `repeat(${width}, 1fr)`, fontSize: `${fontSize}%` }}>
          { randomized.slice(0, arrSize).map((item, index) =>
            <div key={rand()}>
              <div>{item}</div>
            </div>
          ) }
        </div>
      </div>
    </div>
  );
};

export default Card;
