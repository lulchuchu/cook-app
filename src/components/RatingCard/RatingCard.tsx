import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

type Props = {
    data: Rating[];
}

interface Rating {
    _id: string;
    dish: string;
    account: User;
    score: number;
    img: string;
    content: string;
    createdAt: string;
}

interface User {
    _id: string;
    username: string;
    img: string;
};

import styles from './style';
import countTime from 'util/CountTime';

const RatingCard : React.FC<Props> = ({data}) => {

    const [listRating, setListRating] = useState<Rating[]>(data);

    useEffect(() => {
        setListRating(data);
    }, [data]);

    const renderItem = ({item} : {item: Rating}) => {
        return (
            <View style = {styles.itemRating}>
                <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style = {styles.username}>{item.account.username}</Text>
                    <Text style = {styles.time}>{countTime(item.createdAt) === '0' ? 'Vừa xong' : countTime(item.createdAt)}</Text>
                </View>
                <View style={styles.ctnRating}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Text
                            style={{
                                color: value <= item.score ? '#ffc400' : 'gray',
                                fontSize: 20,
                                marginRight: 12,
                            }}
                            key = {value}
                        >
                            &#9733;
                        </Text>
                    ))}
                </View>
                {item.content && <Text>{item.content}</Text>}
            </View>
        );
    }

    return (
        <View style = {{marginTop: 20}}>
            <FlatList data = {listRating} renderItem={renderItem} horizontal showsHorizontalScrollIndicator={false} bounces = {false}/>
        </View>
    );
};

export default RatingCard;