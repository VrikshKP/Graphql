import { useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { GET_THREAD_COMMENTS } from '../queries/queries';
import CommentBox from './CommentBox';



const PostBox = ({ postData }: any) => {
    const [getThreadComments, { loading, error, variables }] = useLazyQuery(GET_THREAD_COMMENTS);
    const [comments, setComments] = useState([])
    const [viewComments, setViewComments] = useState(false)

    const fetchComments = async () => {
        const { data: thread } = await getThreadComments({ variables: { threadId: postData?.id, page: 1, perPage: 3 } })
        setComments([...thread?.Page?.threadComments])
        setViewComments(true)
    }

    const fetchMoreComments = async () => {
        const { data: thread } = await getThreadComments({ variables: { threadId: postData?.id, page: variables?.page + 1, perPage: 3 } })
        setComments([...comments, ...thread?.Page?.threadComments])
    }

    if (error) return <Text>{`Error! ${error}`}</Text>;
    return (
        <View>
            <View style={{ padding: 10, borderBottomColor: 'black', borderBottomWidth: 0.2 }}>
                <Text>
                    {postData?.title}
                </Text>
                <View style={{ height: 10 }} />
                <Text>
                    Replies: {postData?.replyCount}
                </Text>
                <Pressable style={{ padding: 5, backgroundColor: 'blue', flexDirection:'row' }} onPress={fetchComments} >
                    <Text>Show Comments</Text>
                    <ActivityIndicator animating={loading} />
                </Pressable>
                
            </View>
            {viewComments &&
                <View>
                    <FlatList
                        data={comments}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ paddingLeft: 30, padding: 5 }} >
                                    <CommentBox commentData={item} />
                                </View>
                            )
                        }}
                    />
                    <Pressable style={{ padding: 5, backgroundColor: 'pink', flexDirection: 'row' }} onPress={fetchMoreComments} >
                        <Text>Load More Comments....</Text>
                        <ActivityIndicator animating={loading} />
                    </Pressable>
                </View>
            }
        </View>
    );
};

export default PostBox;
