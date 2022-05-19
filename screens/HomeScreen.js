import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet,
    View,
    FlatList,
    SafeAreaView,
    RefreshControl,
} from 'react-native'
import ListItem from '../components/ListItem'
import Constants from 'expo-constants'
import axios from 'axios'
import Loading from '../components/Loading'

const URL = `https://newsapi.org/v2/top-headlines?country=jp&apiKey=${Constants.manifest.extra.newsApiKey}`

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    itemContainer: {
        height: 100,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        flexDirection: 'row',
    },
    leftContainer: {
        width: 100,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
    },
    subText: {
        fontSize: 12,
        color: 'gray',
    },
})

export default HomeScreen = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    const pageRef = useRef(1)
    const fetchhedAllRef = useRef(false)

    useEffect(() => {
        setLoading(true)
        fetchArticles(1)
    }, [])

    const fetchArticles = async (page) => {
        try {
            const response = await axios.get(`${URL}&page=${page}`)

            if (response.data.articles.length > 0) {
                setArticles((prevArticle) => [
                    ...prevArticle,
                    ...response.data.articles,
                ])
            } else {
                fetchhedAllRef.current = true
            }
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }
    const onEndReached = () => {
        if (!fetchhedAllRef.current) {
            pageRef.current = pageRef.current + 1
            fetchArticles(pageRef.current)
        }
    }
    const onRefresh = async () => {
        setRefreshing(true)
        setArticles([])
        pageRef.current = 1
        fetchhedAllRef.current = false
        await fetchArticles()
        setRefreshing(false)
    }
    return (
        <SafeAreaView style={styles.container}>
            {loading && <Loading />}
            <FlatList
                data={articles}
                renderItem={({ item }) => (
                    <ListItem
                        imageUrl={item.urlToImage}
                        title={item.title}
                        author={item.author}
                        onPress={() =>
                            props.navigation.navigate('Article', {
                                article: item,
                            })
                        }
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={onEndReached}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    )
}
