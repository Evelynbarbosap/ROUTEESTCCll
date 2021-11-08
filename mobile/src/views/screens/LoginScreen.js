import React, {useState} from 'react';
import {
    SafeAreaView, 
    StyleSheet, 
    ScrollView, 
    StatusBar, 
    Text, 
    View, 
    Image, 
    TextInput, 
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../../consts/colors';
import api from '../../services';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.access_token);            
            setLoading(false)
            navigation.navigate('FeedScreen')

          } catch (err) {
            setLoading(false)
            console.log('error', err)
            alert('Falha no login. Verifique email ou senha. Se preciso, realize o cadastro.');
          }
    };

    function renderCadastrar() {
        navigation.navigate('RegisterUserScreen');
    }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor: COLORS.white}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StatusBar translucent backgroundColor={COLORS.white} barStyle="dark-content"/>
                <View style={style.menu}>
                    <Image source={require('../../assets/login.jpg')} style={style.logo}/>
                </View>
                <View style={{marginVertical: 20, flexDirection:'row', justifyContent: 'center', alignItems: 'center', color: COLORS.green}}>
                    <View style={style.line}></View>
                    <Text style={{fontWeight: 'bold', marginHorizontal: 5, color: COLORS.green, fontSize:30 }}> Login </Text>
                    <View style={style.line}></View>
                </View>
                <View style={{marginTop: -5, paddingHorizontal: 20,}}>
                    <View style={style.inputContainer}>
                        <Icon name="envelope" size={30} color={COLORS.grey} style={style.inputIcon}/>
                        <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={style.input}/>
                    </View>
                </View>
                <View style={{marginTop: -5, paddingHorizontal: 20}}>
                    <View style={style.inputContainer}>
                        <Icon name="lock" size={40} color={COLORS.grey} style={style.inputIconPassword}/>
                        <TextInput placeholder="Senha" style={style.input} value={password} onChangeText={setPassword} secureTextEntry/>
                    </View>
                </View>
                <View style={{paddingHorizontal: 20, marginLeft:188, color: COLORS.green}}>
                    <Text>Esqueci minha senha</Text>
                </View>
                <View style={{flex:1, justifyContent: 'flex-end', paddingBottom: 20}}>
                    <TouchableOpacity style={style.btn} onPress={handleLogin}>
                        {isLoading ? (
                            <ActivityIndicator animating={isLoading} size={20} color={COLORS.white}/>
                                ):(
                                    <Text style={{color: COLORS.white}}>Login</Text>
                            )}
                    </TouchableOpacity>
                </View>
                <View style={{marginVertical: 20, flexDirection:'row', justifyContent: 'center', alignItems: 'center', color: COLORS.green}}>
                    <View style={style.line}></View>
                    <Text style={{fontWeight: 'bold', marginHorizontal: 5, color: COLORS.grey2}}> OU </Text>
                    <View style={style.line}></View>
                </View>
                <View style={{paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={style.btnSocialNetwork}>
                        <Icon name='facebook-f' size={30} color={COLORS.blue}  />
                    </View>
                    <View style={{width:10}}/>
                    <View style={style.btnSocialNetwork}>
                        <Icon name='google-plus' size={30} color={COLORS.red}  />
                    </View>
                </View>
                <View style={{marginTop: 40, marginBottom:20, flexDirection:'row', justifyContent: 'center', alignItems: 'flex-end', color: COLORS.green}}>
                    <Text style={{fontWeight: 'bold', marginHorizontal: 5, color: COLORS.grey2}}> Não possui cadastro?  </Text>
                    <TouchableOpacity onPress={renderCadastrar}>
                        <Text style={{color: COLORS.green, fontWeight: 'bold'}} >Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    logo:{
        height: 60,
        width: '80%',
        marginLeft: -15
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
    input:{
        color: COLORS.dark,
        paddingLeft: 10,
        flex:1,
        fontSize: 18,
        marginLeft: 40
    },
    line: {
        height: 1,
        width: 30,
        backgroundColor: COLORS.green,
        marginVertical: 20, 
        flexDirection:'row', 
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSocialNetwork: {
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.green,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        flexDirection: 'row'
    }
});
export default LoginScreen;