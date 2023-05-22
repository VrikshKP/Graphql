import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { GET_THREADS } from '../queries/queries';
import PostBox from '../components/PostBox';

const HomeScreen = () => {
  const [getThreads, { loading, error, variables }] = useLazyQuery(GET_THREADS);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data } = await getThreads({ variables: { page: 1 } })
    setPosts([...data?.Page?.threads])
  }

  const fetchMorePosts = async () => {
    const { data } = await getThreads({ variables: { page: variables?.page + 1 } })
    setPosts([...posts, ...data?.Page?.threads])
  }

  if (error) return <Text>{`Error! ${error}`}</Text>;

  return (
    <View style={{ height: '100%' }} >
      <FlatList
        data={posts}
        renderItem={({ item }) => {
          return (
            <PostBox postData={item} />
          );
        }}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={1}
      />
      <ActivityIndicator animating={loading} />
    </View>
  );
};

export default HomeScreen;
