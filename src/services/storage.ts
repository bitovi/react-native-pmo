import AsyncStorage from "@react-native-async-storage/async-storage"

export const getData = async <T>(location: string): Promise<T | undefined> => {
  const value = await AsyncStorage.getItem(location);
  const jsonValue = value ? JSON.parse(value) : undefined
  return jsonValue;
};

export const storeData = async <T>(location: string, value: T): Promise<void> => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(location, jsonValue);
};