import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Currency from 'react-currency-formatter';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeAll,
  selectBasketItems,
  selectBasketTotal
} from '../features/basketSlice';
import { selectRestaurant } from '../features/restaurantSlice';
import { urlFor } from '../sanity';
import { primaryColor } from '../styles/colors';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupItemsInBasket, setGroupItemsInBasket] = useState([]);
  const dispatch = useDispatch();
  const color = `text-[${primaryColor}]`;

  useEffect(() => {
    const groupItems = items.reduce((results, item) => {
      //   (results[item.id] = results[item.id] || []).push(item);
      const { id } = item;
      results[id] = [...(results[id] ?? []), item];
      return results;
    }, {});

    setGroupItemsInBasket(groupItems);
  }, [items]);

  //   console.log(groupItemsInBasket);

  return (
    <SafeAreaView className='flex-1 '>
      <View className='p-5 border-b border-teal-200 bg-white'>
        <View>
          <Text className='text-lg font-bold text-center'>Basket</Text>
          <Text className='text-center text-gray-400'>{restaurant.title}</Text>
        </View>
        <TouchableOpacity
          onPress={navigation.goBack}
          className='rounded-full bg-gray-100 absolute top-3 right-5'
        >
          <XCircleIcon color={primaryColor} height={50} width={50} />
        </TouchableOpacity>
      </View>

      <View className='flex-row items-center space-x-4 p-4 bg-white my-5'>
        <Image
          source={{
            uri: 'https://www.pngitem.com/pimgs/m/533-5338534_motor-21-philosophychicchic-home-delivery-service-bike-hd.png',
          }}
          className='h-7 w-7 p-4 rounded-full'
        />
        <Text className='flex-1'>Deliver in 50-70 min</Text>
        <TouchableOpacity>
          <Text className={color}>Change</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className='divide-y divide-gray-200'>
        {Object.entries(groupItemsInBasket).map(([key, items]) => (
          <View
            key={key}
            className='flex-row items-center space-x-3 bg-white py-2 px-5'
          >
            <Text className={color}>{items.length} x</Text>
            <Image
              source={{ uri: urlFor(items[0].image).url() }}
              className='h-12 w-12 rounded-full'
            />
            <Text className='flex-1'>{items[0].name}</Text>
            <Text>
              <Currency quantity={items[0].price} currency='USD' />
            </Text>
            <TouchableOpacity>
              <Text
                className={`${color} text-xs`}
                onPress={() => dispatch(removeAll({ id: key }))}
              >
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View className='p-5 bg-white mt-5 space-y-4'>
        <View className='flex-row justify-between'>
          <Text className='text-gray-400'>SubTotal</Text>
          <Text className='text-gray-400'>
            <Currency quantity={basketTotal} currency='USD' />
          </Text>
        </View>
        <View className='flex-row justify-between'>
          <Text className='text-gray-400'>Delivery Fee</Text>
          <Text className='text-gray-400'>
            <Currency quantity={2.99} currency='USD' />
          </Text>
        </View>
        <View className='flex-row justify-between'>
          <Text>Order Total</Text>
          <Text className='font-extrabold'>
            <Currency quantity={basketTotal + 2.99} currency='USD' />
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('PreparingOrder')}
          className={`rounded-lg bg-[${primaryColor}] p-4`}
        >
          <Text className='text-center text-white text-lg font-bold'>
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
