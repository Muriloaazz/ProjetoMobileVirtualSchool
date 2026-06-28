import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_PREFIX = 'virtualschool:user';

export const getUserStorageKey = (userEmail) => {
  const normalizedEmail = String(userEmail || '').trim().toLowerCase();
  return `${STORAGE_PREFIX}:${normalizedEmail || 'guest'}`;
};

export const saveUserPublicacoes = async (userEmail, publicacoes) => {
  try {
    const storageKey = getUserStorageKey(userEmail);
    const payload = JSON.stringify(publicacoes);
    await AsyncStorage.setItem(storageKey, payload);
  } catch (error) {
    console.error('Erro ao salvar publicações do usuário:', error);
  }
};

export const getUserPublicacoes = async (userEmail) => {
  try {
    const storageKey = getUserStorageKey(userEmail);
    const stored = await AsyncStorage.getItem(storageKey);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Erro ao buscar publicações do usuário:', error);
    return [];
  }
};
