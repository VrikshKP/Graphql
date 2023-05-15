import {useQuery} from '@apollo/client';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {GET_CHAR} from '../queries/queries';

const HomeScreen = () => {
  const {loading, error, data} = useQuery(GET_CHAR);
  console.log('Home----', data?.Page?.characters);
  return (
    <View style={{height: '100%'}} >
      <FlatList
        data={data?.Page?.characters}
        renderItem={({item}) => {
            console.log('item',item);
            return(
            <View>
                <Text>{item.name.full}</Text>
            </View>);
        }}
      />
    </View>
  );
};

export default HomeScreen;
