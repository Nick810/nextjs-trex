import { useEffect, useState } from 'react';

const useRandomizeProducts = (arr) => {
  const [productLists, setProductLists] = useState();
  const getRandomItems = arr => {
    let m = arr.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = arr[m];
      arr[m] = arr[i];
      arr[i] = t;
    }
  
    return setProductLists(arr.slice(0, 4));
  }

  useEffect(() => {
    if (arr) return getRandomItems(arr);
  }, []);

  return productLists;
}

export default useRandomizeProducts;