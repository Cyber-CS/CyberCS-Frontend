export function useStorageData() {
  const encryptionKey = "2b7e151628aed2a6abf7158809cf4f3c";

  const saveData = (key: string, data: string) => {
    try {
      localStorage.setItem(key, data);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveData = (key: string): any => {
    const encryptedDataWithIVAndTag = localStorage.getItem(key);
    if (encryptedDataWithIVAndTag) {
      return JSON.parse(encryptedDataWithIVAndTag);
    }
    return null;
  };

  const clearData = (key: string) => {
    localStorage.removeItem(key);
  };

  const clearAllStorage = () => {
    localStorage.clear();
  };

  return {
    saveData,
    retrieveData,
    clearData,
    clearAllStorage,
  };
}
