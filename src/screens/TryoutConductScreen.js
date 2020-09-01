import React from 'react'
import {
    View,
    ScrollView,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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
            question: 'If one plus one is 2, then the mathematical expression of this semantic statement with the syntax of romanian mathematical term should be?',
            choice1: '2 * 2 = 3',
            choice2: '2 ? 3 : 1',
            choice3: '1 + 1 = 2',
            choice4: '5 * 5 / 5',
        },
        {
            id: '3',
            question: 'What is 1 + 1?',
            choice1: 'This is so damn hard, that I need to answer it so damn bad so I should pick this coice otherwise the whole world could be doomed with the power of mighty stones of the arcadian survivor within the avatar state',
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

export default ({navigation}) => {
    const [activeScreen, setActiveScreen] = React.useState(0)
    const [answers, setAnswers] = React.useState(new Array (items.length))

    const updateAnswers = (index, value) => {
        let answersCopy = [...answers]

        answersCopy[index] = value
        setAnswers(answersCopy)
    }

    const _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => setActiveScreen(item.id-1)}>
            <View style={ 
                [(activeScreen === item.id-1) ? 
                    {
                        height: 40, 
                        width: 40, 
                        borderColor: theme.PRIMARY_ACCENT_COLOR, 
                        borderWidth: 2,
                        borderRadius: 100,
                        margin: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                :
                    {
                        height: 40, 
                        width: 40, 
                        borderColor: theme.PRIMARY_DARK_COLOR, 
                        borderWidth: 2,
                        borderRadius: 100,
                        margin: 10,
                        alignItems: 'center',
                        justifyContent: 'center' 
                    }, 
                (answers[item.id-1] !== undefined) ? {backgroundColor: theme.SECONDARY_DARK_COLOR}
                :{backgroundColor: 'white'}
                ]
            }>
                <Text style={[{fontSize: 18},
                    (answers[item.id-1] !== undefined) ? {color: 'white'} : {color: 'black'}
                ]}>{item.id}</Text>
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
                <Text style={[styles.mediumLargeText, {margin: 10,}]}>{items.data[activeScreen].question}</Text>
                
                {/* Choice1 */}
                <TouchableOpacity style={styles.multipleChoice} 
                    onPress={() => updateAnswers(activeScreen, 1)}
                >
                    { (answers[activeScreen] === 1) ? 
                        <MaterialCommunityIcon name='checkbox-blank-circle' color={theme.PRIMARY_DARK_COLOR} size={23}/>
                        :
                        <MaterialCommunityIcon name='checkbox-blank-circle-outline' color='black' size={23}/>
                    }
                    <Text style={
                        (answers[activeScreen] === 1) ? 
                            [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: theme.PRIMARY_DARK_COLOR}]
                            :
                            [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: 'black'}]}
                    >{items.data[activeScreen].choice1}</Text>
                </TouchableOpacity>

                {/* Choice2 */}
                <TouchableOpacity style={styles.multipleChoice} 
                    onPress={() => updateAnswers(activeScreen, 2)}
                >
                    { (answers[activeScreen] === 2) ? 
                        <MaterialCommunityIcon name='checkbox-blank-circle' color={theme.PRIMARY_DARK_COLOR} size={23}/>
                        :
                        <MaterialCommunityIcon name='checkbox-blank-circle-outline' color='black' size={23}/>
                    }
                    <Text style={
                        (answers[activeScreen] === 2) ? 
                            [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: theme.PRIMARY_DARK_COLOR}]
                            :
                            [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: 'black'}]}
                    >{items.data[activeScreen].choice2}</Text>
                </TouchableOpacity>

                {/* Choice3 */}
                <TouchableOpacity style={styles.multipleChoice} 
                    onPress={() => updateAnswers(activeScreen, 3)}
                >
                    { (answers[activeScreen] === 3) ? 
                        <MaterialCommunityIcon name='checkbox-blank-circle' color={theme.PRIMARY_DARK_COLOR} size={23}/>
                        :
                        <MaterialCommunityIcon name='checkbox-blank-circle-outline' color='black' size={23}/>
                    }
                    <Text style={
                        (answers[activeScreen] === 3) ? 
                            [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: theme.PRIMARY_DARK_COLOR}]
                            :
                            [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: 'black'}]}
                    >{items.data[activeScreen].choice3}</Text>
                </TouchableOpacity>

                {/* Choice4 */}
                <TouchableOpacity style={styles.multipleChoice} 
                    onPress={() => updateAnswers(activeScreen, 4)}
                >
                    { (answers[activeScreen] === 4) ? 
                        <MaterialCommunityIcon name='checkbox-blank-circle' color={theme.PRIMARY_DARK_COLOR} size={23}/>
                        :
                        <MaterialCommunityIcon name='checkbox-blank-circle-outline' color='black' size={23}/>
                    }
                    <Text style={
                        (answers[activeScreen] === 4) ? 
                            [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: theme.PRIMARY_DARK_COLOR}]
                            :
                            [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: 'black'}]}
                    >{items.data[activeScreen].choice4}</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', flex: 1}}>
                <View style={[styles.middleItemCard, {flex: 0.25, margin: 15, padding: 15}]}>
                    <Text style={styles.buttonText}>{items.time}</Text>
                </View>
                <View style={{flex: 0.75}}>
                    { !(activeScreen + 1 === items.data.length) ?
                        <TouchableOpacity style={[styles.button, {width: 240, marginBottom: 0, margin: 15}]} onPress={() => setActiveScreen(activeScreen + 1)}>
                            <Text style={styles.buttonText}>
                                Selanjutnya
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={[styles.button, {width: 240, marginBottom: 0, margin: 15}]} 
                            onPress={() => {navigation.navigate('Main Tryout')
                            console.log(answers)}}>
                            <Text style={styles.buttonText}>
                                Selesai
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </ScrollView>
    )
}