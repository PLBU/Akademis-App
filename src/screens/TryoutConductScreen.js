import React from 'react'
import {
    View,
    ScrollView,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    BackHandler,
    Dimensions,
    Image,
    ActivityIndicator
} from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Overlay } from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";
import axios from 'react-native-axios';

//Context
import { AuthContext } from '../components/Context.js'

//Importing theme
import theme from '../styles/theme.js'

//Styles
import styles from '../styles/mainScreenStyle.js';

//Images
import unsureImage from '../assets/images/confirm-jawaban-bg-terang.png'
import timesUpImage from '../assets/images/waktu-habis-bg-terang.png'

export default ( { route, navigation } ) => {
    const { id, time } = route.params
    const { authState } = React.useContext(AuthContext)
    
    const [loading, setLoading] = React.useState(false)

    const [activeScreen, setActiveScreen] = React.useState(0)

    const [questions, setQuestions] = React.useState([{number: "", question: "", image: null, opsi: [] } ])
    const [answers, setAnswers] = React.useState([])
    const [keyAnswers, setKeyAnswers] = React.useState([])

    const [timer, setTimer] = React.useState({HH: -1, MM: -1, SS: -1})

    const [finishedModal, setFinishedModal] = React.useState(false)
    const [timesUpModal, setTimesUpModal] = React.useState(false)

    var timeState

    const finished = () => {        
        new Promise ( (resolve, reject) => {
            answers.forEach( (item, index) => {
                axios.post(`https://dev.akademis.id/api/answer`, {
                    "soal_id": index+1,
                    "subtest_id": id,
                    "user_id": authState?.userToken,
                    "option": item
                })
                    .then(res => {
                        console.log("ANSWERS ACCEPTED")
                        console.log(res)
                        resolve()
                    })
                    .catch(e => {
                        console.log("ANSWERS REJECTED")
                        console.log(e.response)
                        throw(e.response)
                        reject() 
                    })
            })
        })
            .then( () => {
                Alert.alert('Skor anda:', `Anda benar ${getScore()}/${questions.length}`) 
                navigation.goBack()
            })
            .catch( e =>{Alert.alert("Error", e.response), console.log(e) })
    }

    const countdown = () => {
        setTimer( (prevState) => {
            if (prevState.HH === 0 && prevState.MM === 0 && prevState.SS === 1) {
                setTimesUpModal(true)
                clearInterval(timeState)
            }

            return ({
            HH: prevState.HH - Math.floor( ( 59 - prevState.MM + 59 - prevState.SS )/(59*2) ),
            MM: (prevState.MM + Math.floor( (59 - prevState.SS)/59)*59)%60, 
            SS: (prevState.SS + 59)%60
        })})
    }

    const _renderItem = ({item}) => (
        <TouchableOpacity onPress={() => setActiveScreen(item.number-1)}>
            <View style={ 
                [(activeScreen === item.number-1) ? 
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
                (answers[item.number-1] !== '0') ? {backgroundColor: theme.SECONDARY_DARK_COLOR}
                :{backgroundColor: 'white'}
                ]
            }>
                <Text style={[{fontSize: 18},
                    (answers[item.number-1] !== '0') ? {color: 'white'} : {color: 'black'}
                ]}>{item.number}</Text>
            </View>
        </TouchableOpacity>
    )

    const handleBackButtonClick = () => {
        Alert.alert("Anda yakin ingin keluar?", "Jawaban anda tidak disimpan jika anda belum menyelesaikan tryout ini", [
            {
                text: 'Yakin',
                onPress: () => navigation.goBack()
            },
            {
                text: 'Tidak',
                onPress: () => null
            }
        ])

        return true
    }

    const updateAnswers = (index, value) => {
        let answersCopy = [...answers]

        answersCopy[index] = value
        setAnswers(answersCopy)
    }

    const getScore = () => {
        var correctAns = 0

        answers.forEach( (item, index) => {
            if (item === keyAnswers[index] ) correctAns++
        })

        return correctAns
    }

    const getData = () => {
        setLoading(true)
        axios.get(`https://dev.akademis.id/api/subtest/${id}`)
            .then(res => {
                var arr = res.data.data.soal

                console.log('Questions: ')
                console.log(arr)

                setQuestions(arr)
                setAnswers(Array.from(Array(arr.length), () => "0") )
                setLoading(false)
            })
            .catch(e => {console.log(e), setLoading(false) })
    }

    const getKeyAnswers = () => {
        axios.get(`https://dev.akademis.id/api/soal?subtest_id=${id}`)
            .then(res => {
                var arr = res.data.data
                var newArr = []

                arr.forEach(element => {
                    newArr.push(element.correct_option)
                })

                setKeyAnswers(newArr)
            })
            .catch(e => console.log(e) )
    }

    React.useEffect(() => {
        getData()
        getKeyAnswers()

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
        setTimer({
            HH: Math.floor(time/60),
            MM: time%60,
            SS: (time*60) % 60
        })

        timeState = setInterval(countdown, 1000)

        // componentWillUnmount
        return () => {
            clearInterval(timeState)
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
        }
    }, [])

    if (loading === true) return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: 'white'}}>
            <ActivityIndicator size="large" color="black"/>
        </View>
    )
    else return(
        <ScrollView style={styles.bgAll}>
            {/* Yakin sudah selesai? */}
            <Overlay
                animationType="fade"
                fullscreen={true}
                isVisible={finishedModal}
                onRequestClose={() => {
                    setFinishedModal(false)
                }}
                overlayStyle={styles.overlay}>
                <View style={styles.centeredView}>
                    <View style={{
                        width: Dimensions.get('window').width*0.8, 
                        backgroundColor: 'white',
                        elevation: 5,
                        alignItems: 'center',
                        margin: 20,
                        borderRadius: 25,
                        overflow: 'hidden',
                        }}
                    >
                        <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 50, width: '100%'}}>
                            <Text style={[styles.mediumWhiteText, {margin: 10, left: 15}]}>Yakin dengan jawaban anda?</Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width*0.8, alignItems: 'center'}}>
                            <Image source={unsureImage} style={{width: RFValue(200), height: RFValue(150) }}/>
                            <TouchableOpacity 
                            style={[styles.button, {width: RFValue(250) } ]} 
                            onPress={() => {setFinishedModal(false), finished() } }
                            >
                                <Text style={styles.buttonText}>Yakin</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={[styles.button, {width: RFValue(250) } ]} 
                            onPress={() => {setFinishedModal(false)} }
                            >
                                <Text style={styles.buttonText}>Belum nih</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Overlay>

            {/* Waktunya sudah habis */}
            <Overlay
                animationType="fade"
                fullscreen={true}
                isVisible={timesUpModal}
                onRequestClose={() => {
                    finished()
                }}
                overlayStyle={styles.overlay}>
                <View style={styles.centeredView}>
                    <View style={{
                        width: Dimensions.get('window').width*0.8, 
                        backgroundColor: 'white',
                        elevation: 5,
                        alignItems: 'center',
                        margin: 20,
                        borderRadius: 25,
                        overflow: 'hidden',
                        }}
                    >
                        <View style={{backgroundColor: theme.PRIMARY_DARK_COLOR, height: 50, width: '100%'}}>
                            <Text style={[styles.mediumWhiteText, {margin: 10, left: 15}]}>Yahh waktunya sudah habis nih</Text>
                        </View>
                        <View style={{ width: Dimensions.get('window').width*0.8, alignItems: 'center'}}>
                            <Image source={timesUpImage} style={{width: RFValue(200), height: RFValue(150) }}/>
                            <TouchableOpacity 
                                style={[styles.button, {width: RFValue(250) } ]} 
                                onPress={() => {finished() } }
                            >
                                <Text style={styles.buttonText}>Oke deh</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Overlay>

            <View style={{backgroundColor: 'white', padding: 5, margin: 15, marginVertical: 25, borderRadius: 25, overflow: 'hidden', elevation: 5}}>
                <FlatList
                    horizontal={true}
                    data={questions}
                    renderItem={_renderItem}
                    keyExtractor={ (item) => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            { (questions.length === 0) ?
                null
                :
                <View>
                    <Text style={styles.sectionText}>Soal No. {questions[activeScreen].number}</Text>
                    <View style={styles.horizontalRuler}/>

                    <View style={styles.bigCard}>
                        <Text style={[styles.mediumLargeText, {margin: 10,}]}>{questions[activeScreen].question}</Text>
                        { (questions[activeScreen].image) ?
                            <Image source={questions[activeScreen].image} />
                            :
                            null
                        }

                        {questions[activeScreen].opsi.map( (value, index) => (
                            <TouchableOpacity style={styles.multipleChoice} 
                                onPress={() => updateAnswers(activeScreen, value.option)}
                            >
                                { (answers[activeScreen] === value.option) ? 
                                    <MaterialCommunityIcon name='checkbox-blank-circle' color={theme.PRIMARY_DARK_COLOR} size={23}/>
                                    :
                                    <MaterialCommunityIcon name='checkbox-blank-circle-outline' color='black' size={23}/>
                                }
                                <Text style={
                                    (answers[activeScreen] === value.option) ? 
                                        [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: theme.PRIMARY_DARK_COLOR}]
                                        :
                                        [styles.mediumLargeText, {marginLeft: 8, marginRight: 40, color: 'black'}]}
                                >{value.answer}</Text>
                            </TouchableOpacity>
                        ))}
                        
                    </View>
                </View> 
            }
            <View style={{flexDirection: 'row', flex: 1}}>
                <View style={[styles.middleItemCard, {flex: 0.27, margin: 15, padding: 15}]}>
                    <Text style={styles.buttonText}>{("0" + timer.HH).slice(-2)}:{("0" + timer.MM).slice(-2)}:{("0" + timer.SS).slice(-2)}</Text>
                </View>
                <View style={{flex: 0.73}}>
                    { !(activeScreen + 1 === questions.length) ?
                        <TouchableOpacity style={[styles.button, {width: Dimensions.get('window').width*0.55, marginBottom: 0, margin: 15}]} onPress={() => setActiveScreen(activeScreen + 1)}>
                            <Text style={styles.buttonText}>
                                Selanjutnya
                            </Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={[styles.button, {width: Dimensions.get('window').width*0.55, marginBottom: 0, margin: 15}]} 
                            onPress={() => setFinishedModal(true)}>
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