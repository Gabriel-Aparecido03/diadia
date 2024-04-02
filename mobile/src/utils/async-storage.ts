import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItemFromAsyncStorage = async (keyName : string) => {
  let ret = "";

  await AsyncStorage.getItem(keyName).then((value) => {
    if (value) ret = value;
  });

  return ret;
};

export const setItemToAsyncStorage = async (key: string, value: string) => {
  return await AsyncStorage.setItem(key, value);
};
