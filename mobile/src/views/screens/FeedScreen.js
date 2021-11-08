import React, { useEffect, useState } from 'react';
import {
    SafeAreaView, 
    StyleSheet,  
    StatusBar, 
    View, 
    Image, 
    ScrollView, 
    TextInput, 
    FlatList, 
    Dimensions,
    Text,
    Pressable,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../consts/colors';

import api from '../../services';

const {width} = Dimensions.get('screen');
const FeedScreen = ({navigation, data}) => {
    const [token] = useState(localStorage.getItem('token'));
    const [email] = useState(localStorage.getItem('email'));
    const [taskList, setTaskList] = useState([]);
    const [isLoading, setisLoading] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(taskList);
  

    useEffect(() => {
        api.get(`/local/recommendations/index/${email}` , {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
          if(response.data.status && response.data.status === (401 || 498)){
            localStorage.clear();
            navigation.navigate('LoginScreen')

          }else{
            console.log('response',response);
            setTaskList(response.data.recommendations);
          }
        }).catch(err => {
          alert(err)
        }).finally(() => setisLoading(false))
      }, [token]);

 
    useEffect(() => {
      if (!searchText) {
        setList(taskList);
      } else {
        
        setList(
            taskList.filter(
            (item) =>
              !!item.title.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    }, [searchText, taskList]);

    const renderItem = ({item}) => {
        return (
          <Card
            localId={item.id}
            localImage = {item.image}
            localTitle = {item.title}
            localLike = {item.like}
            localIloved = {item.iloved}
            localDeslike = {item.deslike}
          />
        );
    };
    

    const Card = ({localId, localImage, localTitle,  localLike, localIloved, localDeslike}) => {
        const [countLocalIloved, setCountLocalIloved] = useState(0);
        const [countLocalLike, setCountLocalLike] = useState(0);
        const [countLocalDeslike, setCountLocalDeslike] = useState(0);
        const [like, setLike] = useState(localLike);
        const [iloved, setIloved] = useState(localIloved);
        const [deslike, setDeslike] = useState(localDeslike);
        const [visible, setVisable] = useState(setTimeout(() => setVisable({visible:!visible}), 3000));

        const onPressIloved = () => {
            if(iloved)
                setCountLocalIloved(countLocalIloved - 1)
            else
                setCountLocalIloved(countLocalIloved + 1)

            setIloved(!iloved);
            if(like) 
                onPressLike(false)
            if(deslike)
                onPressDeslike(false)
        } 

        const onPressLike = () => {
            if(like)
                setCountLocalLike(countLocalLike - 1)
            else
                setCountLocalLike(countLocalLike + 1)

            setLike(!like);
            if(deslike) 
                onPressDeslike(false)
            if(iloved)
                onPressIloved(false)
        }
        
        const onPressDeslike = () => {
            if(deslike)
                setCountLocalDeslike(countLocalDeslike - 1)
            else
                setCountLocalDeslike(countLocalDeslike + 1)

            setDeslike(!deslike)
            
            if(like) 
                onPressLike(false)
            if(iloved)
                onPressIloved(false)
        }

        return  (
            <View key={localId} style={style.card} >
                <Pressable onPress={()=>navigation.navigate('RouteScreen', localId)}>
                    <Image source={localImage} style={style.card_image} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
                            <Text style={style.card_title}>{localTitle}</Text>
                        </View>
                </Pressable>
                <View style={{ marginTop: 10, flexDirection: 'row'}}>
                    <View style={style.card_assessments}>
                        <TouchableOpacity onPress={onPressIloved} >
                            <Icon name="heart" size={22} color={iloved? COLORS.red : COLORS.grey}/>
                        </TouchableOpacity>
                        <Text style={[style.text_assessments]}>{countLocalIloved}</Text>

                        <TouchableOpacity onPress={onPressLike}>
                            <Icon name="thumbs-up" size={22} color={like? COLORS.green : COLORS.grey}/>
                        </TouchableOpacity>
                        <Text style={style.text_assessments}>{countLocalLike}</Text>

                        <TouchableOpacity onPress={onPressDeslike}>
                            <Icon name="thumbs-down" size={22} color={deslike? COLORS.green : COLORS.grey}/>
                        </TouchableOpacity>
                        <Text style={style.text_assessments}>{countLocalDeslike}</Text>    
                    </View>
                </View>
            </View>
            
        );
    };

    return (
       <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
           <StatusBar translucent backgroundColor={COLORS.white} barStyle="dark-content"/>
           <View style={style.menu}>
                <ScrollView>
                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 }}>
                        <View style={style.searchInputContainer}>
                                <Icon name="search" color={COLORS.grey} size={28} />
                                <TextInput fontSize={18} marginLeft={4} placeholder="Encontre um destino" 
                                    placeholderTextColor={COLORS.grey2} value={searchText} onChangeText={(t) => setSearchText(t)} />
                        </View> 
                    </View>
                </ScrollView> 
                <Pressable onPress={()=> navigation.navigate('PerfilUserScreen')}>
                    <Image source={require('../../assets/perfilDoUsu.jpg')} style={style.image_perfil}/>
                </Pressable>
           </View>
           {isLoading ? <ActivityIndicator/> : (
                 <FlatList 
                 showsHorizontalScrollIndicator={false}
                 contentContainerStyle={{paddingLeft: 20, paddingVertical: 20}}
                 data={list}
                 renderItem={renderItem}
                 keyExtractor={(item, index) => index.toString()} 
            />
           )}
         
       </SafeAreaView>
    );
};

const style = StyleSheet.create({
    menu: {
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
        width: '30%',
        marginTop: -0.5,
        marginLeft: -12,
    },
    image_perfil:{
        height: 60,
        width: 60,
        borderRadius: 30,
        marginTop: 0.5
    },
    searchInputContainer: {
        height: 59,
        width: '90%', 
        backgroundColor: COLORS.white,
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -20,
        padding: 10
    },
    card:{
        height: 250,
        backgroundColor: COLORS.white,
        elevation:15,
        width:width - 40,
        marginRight: 20,
        padding: 10,
        borderRadius: 20, 
        marginTop: 7,
    },
    card_image:{
        width: '100%',
        height: 150,
        borderRadius: 15,
        marginTop: 0.5
    },
    card_title:{
        fontSize:22,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
        color: COLORS.grey2,
    },
    card_assessments:{
        flexDirection: 'row', 
        marginRight: 15,
    },
    text_assessments:{
        marginLeft: 2, 
        marginTop: -1,
        marginRight: 7,
        fontSize: 20,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
        color: COLORS.grey,
    }
});
export default FeedScreen;