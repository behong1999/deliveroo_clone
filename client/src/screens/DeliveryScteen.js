import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { XMarkIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import { primaryColor } from '../styles/colors';

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View className='bg-[#00CCBB] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center px-5 pt-10'>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <XMarkIcon color='white' size={30} />
          </TouchableOpacity>
          <Text className='font-bold text-white text-lg'>Order Help</Text>
        </View>

        <View className='bg-white mx-5 my-4 rounded-md p-6 z-50 shadow-md'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Arrival</Text>
              <Text className='text-3xl font-bold'>45-55 Minutes</Text>
            </View>
            <Image
              source={{
                uri: 'https://media1.giphy.com/media/gsr9MG7bDvSRWWSD1Y/200w.gif',
              }}
              className='h-20 w-20'
            />
          </View>
          <Progress.Bar size={30} color={primaryColor} indeterminate={true} />
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className='flex-1 z-0 -mt-10'
        mapType='mutedStandard'
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier='origin'
          pinColor={primaryColor}
        />
      </MapView>

      <SafeAreaView className='bg-white flex-row items-center space-x-5 h-24 px-5'>
        <Image
          source={{
            uri: 'https://pbs.twimg.com/media/EGIeHV4WoAA_qE6.jpg',
          }}
          className='h-12 w-12 bg-gray-300 p-4 rounded-full'
        />
        <View className='flex-1'>
          <Text className='text-lg'>Peter Parker</Text>
          <Text className='text-gray-400'>Your Rider</Text>
        </View>
        <Text className='text-[#00CCBB] text-lg '>Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
