const cache: Record<string, any> = {};

export const getFromLocalStorage = (key: string): any => {
   if (cache[key] !== undefined) {
      return cache[key];
   }

   const value = localStorage.getItem(key);
   try {
      cache[key] = value ? JSON.parse(value) : null;
   } catch {
      cache[key] = value;
   }
   return cache[key];
};

export const setToLocalStorage = (key: string, value: any): void => {
   cache[key] = value;
   localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromLocalStorage = (key: string): void => {
   delete cache[key];
   localStorage.removeItem(key);
};
