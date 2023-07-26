import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import {
  AdjustmentsVerticalIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';
import sClient from '../sanity';
import Categories from '../components/Categories';
import FeatureRows from '../components/FeatureRows';
import { primaryColor } from '../styles/colors';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {}, [
    sClient
      .fetch(
        `
        *[_type == "featured"] {
          ...,
          restaurants[]->{
            ...,
            dishes[] ->
          }
        }`
      )
      .then((data) => {
        setFeaturedCategories(data);
      }),
  ]);

  return (
    <SafeAreaView className='bg-white pt-2'>
      {/* Header */}
      <View className='flex-row pb-3 items-center mx-4 space-x-2 '>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YnVyZ2VyfGVufDB8fDB8fHww&w=1000&q=80',
          }}
          className='h-8 w-8 p-4 rounded-full'
        />
        <View className='ml-2 flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
          <View className='flex-row items-center'>
            <Text className='font-bold text-xl mr-1'>Current Location</Text>
            <ChevronDownIcon size={20} color={primaryColor} />
          </View>
        </View>
        <UserIcon size={35} color={primaryColor} />
      </View>

      {/* Search */}
      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row flex-1 space-x-2 bg-gray-200 p-2 items-center'>
          <MagnifyingGlassIcon size={20} color='gray' />
          <TextInput
            placeholder='Restaurants and cuisines'
            keyboardType='default'
          />
        </View>
        <AdjustmentsVerticalIcon color={primaryColor} />
      </View>

      {/* Body */}
      <ScrollView className='bg-gray-100'>
        {/* Categories */}
        <Categories />

        {/* Featured Rows */}
        {featuredCategories?.map((featuredCategory) => (
          <FeatureRows
            key={featuredCategory._id}
            id={featuredCategory._id}
            title={featuredCategory.name}
            desc={featuredCategory.short_description}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
