import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);
  }, []);

  return (
    <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
      <Animatable.Image
        source={require('../../assets/order-loading.gif')}
        animation='slideInUp'
        iterationCount={1}
        className='w-[100vw] h-[55vh]'
      />
      <Animatable.Text
        animation='slideInUp'
        iterationCount={1}
        className='text-lg my-10 text-white font-bold text-center'
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <ActivityIndicator size='large' color='white' />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
