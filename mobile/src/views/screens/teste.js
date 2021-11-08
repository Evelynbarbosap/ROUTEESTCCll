/**
 * import React, { useState, setState, useEffect } from 'react';
import {
    SafeAreaView, 
    StyleSheet,  
    StatusBar, 
    View, 
    Image, 
    FlatList, 
    Dimensions,
    Text, 
    TouchableOpacity,
    ActivityIndicator 
} from 'react-native';
import COLORS from '../../consts/colors';
import api from '../../services';

const {width} = Dimensions.get('screen')

const RecommendationScreen = ({navigation}) => {
    const [token] = useState(localStorage.getItem('token'));
    const [taskList, setTaskList] = useState([]);
    const [isLoading, setisLoading] = useState([]);
  

    useEffect(() => {
        api.get('/local/index', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if(response.data.status && response.data.status === (401 || 498)){
            localStorage.clear();
            navigation.navigate('LoginScreen')

          }else{
            setTaskList(response.data.locais);
          }
        }).catch(err => {
          alert(err)
        }).finally(() => setisLoading(false))
      }, [token]);

    const insertPreferences = () => {
        console.log(e)
    };

    const renderItem = ({ item, index }) => {
        return (
            <Card
                localId={item.id}
                localImage = {item.image}
                localTitle = {item.title}
            />
        );
    };

    const Card = ({localId, localImage, localTitle}) => {
        const [isSelected, setSelected] = useState(false)
        const [iscard, setCard] = useState(false);
        const [isIdLocal, setIdLocal] = useState([])
        const [visible, setVisable] = useState(setTimeout(() => setVisable({visible:!visible}), 2000));
        const [position, setPosition] = useState(0); 
        
        const troca = (item) => {
            const pos = position + 1 === isIdLocal.length 
            ? 0 
            : position + 1;
          setPosition(pos);
          

        }
        useEffect(() => {
            setIdLocal(isIdLocal[position]);
          }, [position]);
        
        }
        return (
            <TouchableOpacity onPress={() => troca(localId)} >
                 <View key={localId} 
                        style={{ height: 110,
                                backgroundColor: iscard? COLORS.green : COLORS.white,
                                elevation: 10,
                                width:width - 45,
                                marginLeft: 2,
                                padding: 10,
                                borderRadius: 20, 
                                marginTop: 5
                        }} 
                    >
                    <Image source={localImage} style={style.card_image} />  
                    <Text style={style.card_title}>{localTitle}</Text>
                </View> 
            </TouchableOpacity>
        );
    };


    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <StatusBar translucent backgroundColor={COLORS.white} barStyle="dark-content"/>
            <View style={style.menu}>
                <Image source={require('../../assets/login.jpg')} style={style.image_logo}/>
            </View>
            <View style={{paddingHorizontal:20, marginTop: 10, flexDirection:'row', justifyContent: 'center', alignItems: 'center', color: COLORS.green}}>
                <Text style={{fontWeight: 'bold', color: COLORS.dark, fontSize:20 }}>
                    Selecione suas preferências
                </Text>
            </View>
            {isLoading ? <ActivityIndicator/> : (
                
            <FlatList 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
            data={taskList} 
            renderItem={renderItem} 
            keyExtractor={(item, index) => index.toString()} 
            />
            )}
            <View style={{flex:1, justifyContent: 'flex-end'}}>
                <TouchableOpacity style={style.btnConfirm} onPress={insertPreferences}>
                    <Text style={{color: COLORS.white}}>Confirmar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    menu:{
        backgroundColor: COLORS.green,
        height:82,
        width: '100%',
        paddingTop: 20, 
        marginTop:-5, 
        paddingVertical: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    image_logo:{
        height: 60,
        width: '80%',
        marginTop: -0.5,
        marginLeft: -12,
    },
    card:{
       
    },
    card_image:{
        width: 100,
        height: 100,
        borderRadius: 30,
        marginTop: -5,
        marginLeft: -5,
    },
    card_title:{
        fontSize:22,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
        color: COLORS.grey2,
        marginTop: -60,
        marginLeft: 110
    },
    btn: {
        height: 60,
        width: 200,
        marginHorizontal: 20,
        backgroundColor: COLORS.green,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 80
    },
    btnConfirm:{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 40,
        backgroundColor: COLORS.green,
    }
});
export default RecommendationScreen;
 */