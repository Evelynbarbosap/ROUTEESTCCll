import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';
import {SafeAreaView, StyleSheet, Image, StatusBar, Text, View, Pressable } from 'react-native';
import COLORS from '../../consts/colors';

const BeginScreen = ({navigation}) => {
    return (
       <SafeAreaView style={{flex:1, backgroundColor: COLORS.white}}>
           <StatusBar translucent backgroundColor={COLORS.tranparent}/>      
            <Image 
                    source={require('../../assets/capa.jpeg')}
                    style={style.image}
            />
           <View style={{paddingHorizontal: 20, paddingTop: 20}}>
               <View>
                   <Text style={style.title}>Vem viajar, </Text>
                   <Text style={style.subtitle}>vem ser capixaba! </Text>
             
               </View>
           </View>
           <View style={{flex:1, justifyContent: 'flex-end', paddingBottom: 40}}>
              <Pressable onPress={()=>navigation.navigate('LoginScreen')}>
                <View style={style.btn}>
                    <Text style={{color: COLORS.white}}>Vamos começar</Text>
                </View>
              </Pressable>
           </View>
       </SafeAreaView>
    );
};

const style = StyleSheet.create({
    image:{
        height: 420,
        width: '100%',
        borderBottomLeftRadius: 100,
    },
    title: {
        marginTop:40,
        fontSize: 30,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
        color: COLORS.grey2,
    },
    subtitle:{
        marginTop: 2,
        marginLeft: 70,
        fontSize: 30,
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
        color: COLORS.grey2,
    },
    btn: {
        height: 60,
        marginHorizontal: 20,
        backgroundColor: COLORS.green,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default BeginScreen;