import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import { primaryColor } from '../styles/colors';
import RestaurantCard from './RestaurantCard';
import sClient from '../sanity';

const FeatureRows = ({ id, title, desc }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sClient
      .fetch(
        `
        *[_type == "featured" && _id == $id] {
            ...,
            restaurants[]->{
              ...,
              dishes[] ->,
              type-> {
                name
              }
            },
        }[0]
      `,
        { id }
      )
      .then((data) => {
        setRestaurants(data.restaurants);
      });
  }, []);

  return (
    <View>
      <View className='mt-4 flex-row items-center justify-between px-4'>
        <Text className='font-bold text-lg'>{title}</Text>
        <ArrowRightIcon color={primaryColor} />
      </View>
      <Text className='text-xs text-gray-500 px-4'>{desc}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
        {restaurants?.map((restaurant) => {
          // console.log(restaurant.description);
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type?.name}
              address={restaurant.address}
              description={restaurant.description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeatureRows;
