import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

export function useStorageData() {

  const encryptionKey = '2b7e151628aed2a6abf7158809cf4f3c';

  const saveData = (key: string, data: unknown) => {
    try {
      const iv = randomBytes(16);
      const cipher = createCipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);

      let encryptedData = cipher.update(JSON.stringify(data), 'utf8', 'hex');
      encryptedData += cipher.final('hex');
      const tag = cipher.getAuthTag();

      const encryptedDataWithIVAndTag = iv.toString('hex') + encryptedData + tag.toString('hex');

      localStorage.setItem(key, encryptedDataWithIVAndTag);
    } catch (error) {
      console.log(error);
    }

  };

  const retrieveData = (key: string): any => {
    const encryptedDataWithIVAndTag = localStorage.getItem(key);
    if (encryptedDataWithIVAndTag) {
      const iv = Buffer.from(encryptedDataWithIVAndTag.slice(0, 32), 'hex');
      const encryptedData = encryptedDataWithIVAndTag.slice(32, -32);
      const tag = Buffer.from(encryptedDataWithIVAndTag.slice(-32), 'hex');
      const decipher = createDecipheriv('aes-256-gcm', Buffer.from(encryptionKey), iv);
      decipher.setAuthTag(tag);

      let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
      decryptedData += decipher.final('utf8');
      return JSON.parse(decryptedData);
    }
    return null;
  }

  const clearData = (key: string) => {
    localStorage.removeItem(key)
  };

  const clearAllStorage = () => {
    localStorage.clear()
  };

  return {
    saveData,
    retrieveData,
    clearData,
    clearAllStorage,
  };
}
