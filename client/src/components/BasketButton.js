import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Currency from 'react-currency-formatter';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { primaryColor } from '../styles/colors';

const BasketButton = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);

  if (items.length === 0) return null;

  return (
    <View className='absolute bottom-8 w-full z-50'>
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className={`mx-4 bg-[${primaryColor}] p-4 rounded-lg flex-row items-center`}
      >
        <Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>
          {items.length}
        </Text>
        <Text className='flex-auto text-white font-extrabold text-lg text-center'>
          View Basket
        </Text>
        <Text className='text-ld text-white font-extrabold'>
          <Currency quantity={basketTotal} currency='USD' />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketButton;
