import React from 'react';
import {SafeAreaView, StyleSheet, View, Pressable } from 'react-native';
import COLORS from '../../consts/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import locais from '../../consts/local';
import { NavigationContainer } from '@react-navigation/native';


const RotaScreen = ({ route, navigation }) => {
    /* Armazenar o parametro passado da tela de feed para a tela de rota, para de finir a localização atual. */
    const [currentLocation, setLocation] = React.useState(null);

 /*   React.useEffect(() => {
        let {item, currentLocation} = route.params;
        setCurrentLocation(currentLocation)
    })
*/
    function renderHeader() {
        return (
            <View style={style.menu}>
                <Pressable onPress={()=>navigation.navigate('FeedScreen')}>
                    <Icon name="arrow-left" size={30} color={COLORS.white} style={style.back}/>
                </Pressable>
            </View>
        )}

    return (
       <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
           {renderHeader()}
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
    back:{
        paddingTop: 5, 
        marginTop:8, 
    }

});

export default RotaScreen;