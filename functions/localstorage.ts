import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      return
    }
  }