import React from 'react'
import {
    View,
    ScrollView,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'

//Importing theme
import theme from '../styles/theme.js'

//Styles
import styles from '../styles/mainScreenStyle.js';

const items = {
    time: 120,
    data: [
        {
            id: '1',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '2',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '3',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '4',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '5',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '6',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '7',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '8',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '9',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '10',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '11',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '12',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '13',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
        {
            id: '14',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
            {
            id: '15',
            question: 'What is 1 + 1?',
            choice1: '2',
            choice2: '4',
            choice3: '5',
            choice4: '3',
        },
]}

export default () => {
    const [activeScreen, setActiveScreen] = React.useState(0)

    const _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => setActiveScreen(item.id-1)}>
            <View style={{
                height: 40, 
                width: 40, 
                borderColor: theme.PRIMARY_DARK_COLOR, 
                borderWidth: 2,
                borderRadius: 100,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{fontSize: 18}}>{item.id}</Text>
            </View>
        </TouchableOpacity>
    )

    return(
        <ScrollView>
            <Text style={styles.sectionText}>Daftar Nomor</Text>
            <View style={styles.horizontalRuler}/>

            <View style={{backgroundColor: 'white', padding: 5, margin: 15, borderRadius: 25, overflow: 'hidden', elevation: 5}}>
                <FlatList
                    horizontal={true}
                    data={items.data}
                    renderItem={_renderItem}
                    keyExtractor={ (item) => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <Text style={styles.sectionText}>Pertanyaan Nomor {items.data[activeScreen].id}</Text>
            <View style={styles.horizontalRuler}/>

            <View style={styles.bigCard}>
                <Text style={styles.leftSmallMediumText}>{items.data[activeScreen].question}</Text>
                <Text style={styles.leftSmallMediumText}>{items.data[activeScreen].choice1}</Text>
                <Text style={styles.leftSmallMediumText}>{items.data[activeScreen].choice2}</Text>
                <Text style={styles.leftSmallMediumText}>{items.data[activeScreen].choice3}</Text>
                <Text style={styles.leftSmallMediumText}>{items.data[activeScreen].choice4}</Text>
            </View>

            <View style={{flexDirection: 'row', flex: 1}}>
                <View style={[styles.middleItemCard, {flex: 0.25, margin: 15, padding: 15}]}>
                    <Text style={styles.buttonText}>{items.time}</Text>
                </View>
                <View style={{flex: 0.75}}>
                    <TouchableOpacity style={[styles.button, {width: 240, marginBottom: 0, margin: 15}]} onPress={() => setActiveScreen(activeScreen + 1)}>
                        <Text style={styles.buttonText}>Selanjutnya</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}