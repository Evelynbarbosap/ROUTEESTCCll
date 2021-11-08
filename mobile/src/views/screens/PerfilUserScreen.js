import React, {useState, useEffect} from 'react';
import { 
    TouchableOpacity,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    StatusBar,
    View, 
    Image, 
    Pressable, 
    TextInput, 
    ActivityIndicator
} from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services';


const PerfilUserScreen = ({navigation}) => {
    const [token] = useState(localStorage.getItem('token'));
    const [email] = useState(localStorage.getItem('email'));
    const [isLoading, setisLoading] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        api.get(`/auth/${email}/show/` , {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(response => {
            console.log('response',response);
          if(response.data.status && response.data.status === (401 || 498)){
            localStorage.clear();
            navigation.navigate('LoginScreen')

          }else{
            setUser(response.data);
          }
        }).catch(err => {
          alert(err)
        }).finally(() => setisLoading(false))
      }, [token]);

   
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
           <StatusBar translucent backgroundColor={COLORS.white} barStyle="dark-content"/>
         
            <View style={style.menu}>
                <Pressable onPress={()=>navigation.navigate('FeedScreen')}>
                    <Icon name="arrow-left" size={30} color={COLORS.white} style={style.back}/>
                </Pressable>
                <Image source={require('../../assets/login.jpg')} style={style.logo}/>
            </View>
           
            <View style={{marginVertical: 20, flexDirection:'row', justifyContent: 'center', alignItems: 'center', color: COLORS.green}}>
                <Image source={require('../../assets/perfilDoUsu.jpg')} style={style.image_perfil}/>
            </View>
            {isLoading ? <ActivityIndicator/> : (
            <View>
            <View style={{marginTop: -5, paddingHorizontal: 20,}}>
                <View style={style.inputContainer}>
                    <Icon name="user" size={30} color={COLORS.grey} style={style.inputIcon}/>
                    <TextInput placeholder="Nome completo" value={user.name + ' ' +  user.lastname} style={style.input}/>
                </View>
            </View>
            <View style={{marginTop: -5, paddingHorizontal: 20,}}>
                <View style={style.inputContainer}>
                    <Icon name="envelope" size={30} color={COLORS.grey} style={style.inputIcon}/>
                    <TextInput placeholder="E-mail" value={user.email} style={style.input}/>
                </View>
            </View>
            <View style={{marginTop: -5, paddingHorizontal: 20}}>
                <View style={style.inputContainer}>
                    <Icon name="lock" size={40} color={COLORS.grey} style={style.inputIconPassword}/>
                    <TextInput placeholder="Informe Senha atual"  style={style.input} secureTextEntry/>
                </View>
            </View>
            <View style={{marginTop: -5, paddingHorizontal: 20}}>
                <View style={style.inputContainer}>
                    <Icon name="lock" size={40} color={COLORS.grey} style={style.inputIconPassword}/>
                    <TextInput placeholder="Nova senha" style={style.input} secureTextEntry/>
                </View>
            </View>
            <View style={{flex:1, justifyContent: 'flex-end', paddingBottom: 20}}>
                <TouchableOpacity style={style.btn}>
                    <Text style={{color: COLORS.white, fontWeight: 'bold'}}>Confirmar</Text>
                </TouchableOpacity>
            </View>
            </View>
                )}
       </SafeAreaView>
    );
};

const style = StyleSheet.create({
    back:{
        paddingTop: 5, 
        marginTop:8, 
    },
    image_perfil:{
        height: 200,
        width: 200,
        borderRadius: 100,
        marginTop: 0.5
    },
    logo:{
        height: 60,
        width: '80%',
        marginLeft: -15
    },
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
    categoryListContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,

    },
    categoryListText:{
        fontSize:16,
        fontWeight: 'bold',
        paddingBottom:5,
        color:COLORS.dark
    },
    activeCategoryListText:{
        color: COLORS.green,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    inputContainer:{
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        height: 50,
    },
    inputIcon:{
        marginTop: 10,
        marginLeft: 10,
        position: 'absolute',
    },
    inputIconPassword:{
        marginTop: 5,
        marginLeft: 10,
        position: 'absolute',
    },
    btn: {
        height: 60,
        marginHorizontal: 20,
        backgroundColor: COLORS.green,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
    },
    line: {
        height: 1,
        width: 30,
        backgroundColor: COLORS.green,
    },
    input:{
        color: COLORS.dark,
        paddingLeft: 10,
        flex:1,
        fontSize: 18,
        marginLeft: 40
    },
});
export default PerfilUserScreen;