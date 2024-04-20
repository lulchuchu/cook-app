import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useRef, useState } from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity, View } from 'react-native';

type Props = {
    listImg: string[];
    cancel: () => void;
}

const Photo: React.FC<Props> = ({listImg, cancel}) => {

    return (
        <View
            style = {{
                position: 'absolute',
                zIndex: 1000,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#000',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                style = {{
                    position: 'absolute',
                    top: 32,
                    left: 16,
                    padding: 6,
                    backgroundColor: '#fff',
                    borderRadius: 50,
                    zIndex: 100
                }}
                onPress={cancel}
            >
                <FontAwesomeIcon icon = {faXmark} size = {20}/>
            </TouchableOpacity>
            <FlatList
                data={listImg}
                renderItem={({item}:{ item:string}) => {
                    return <Image 
                        source={{uri: item}} 
                        resizeMode='contain' 
                        style = {{
                            width: Dimensions.get('window').width,
                            height: 400
                        }}
                    />
                    }
                }
                horizontal
                showsHorizontalScrollIndicator = {false}
                pagingEnabled
                bounces = {false}
            />
        </View>
    );
};

export default Photo;
