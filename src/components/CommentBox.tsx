import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { GET_CHAR, GET_THREADS, GET_THREAD_COMMENTS } from '../queries/queries';
import { FlashList } from '@shopify/flash-list';



const CommentBox = ({ commentData }: any) => {
    const [getThreadComments, { loading, error, variables }] = useLazyQuery(GET_THREAD_COMMENTS);
    const [comments, setComments] = useState([])
    const [viewComments, setViewComments] = useState(false)

    const fetchComments = async () => {
        const { data: thread } = await getThreadComments({ variables: { threadId: commentData?.id, page: 1, perPage: 3 } })
        setComments([...thread?.Page?.threadComments])
        setViewComments(true)
    }

    const fetchMoreComments = async () => {
        const { data: thread } = await getThreadComments({ variables: { threadId: commentData?.id, page: variables?.page + 1, perPage: 3 } })
        setComments([...comments, ...thread?.Page?.threadComments])
    }

    return (
        <View style={{ padding: 5, borderBottomWidth: 0.2, borderLeftWidth: 0.5 }}>
            <View>
                <Text>
                    {commentData?.comment}
                </Text>
                <View style={{ height: 10 }} />
                {
                <Pressable style={{ padding: 2, backgroundColor: 'red', flexDirection: 'row' }} onPress={fetchComments} >
                    <Text>Toggle Replies</Text>
                    <ActivityIndicator animating={loading} />
                </Pressable>}
            </View>
            {viewComments &&
                <View style={{paddingLeft: 60}} >
                    <FlatList
                        data={comments}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ padding: 5, borderBottomWidth: 0.2, borderLeftWidth: 0.5 }} >
                                    <Text>{item?.comment}</Text>
                                </View>
                            )
                        }}
                    />
                    <Pressable style={{ padding: 5, backgroundColor: 'grey', flexDirection: 'row' }} onPress={fetchMoreComments} >
                        <Text>Load More Replies....</Text>
                        <ActivityIndicator animating={loading} />
                    </Pressable>
                </View>
            }
        </View>
    );
};

export default CommentBox;
