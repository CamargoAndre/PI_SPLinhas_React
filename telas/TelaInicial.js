import React from 'react';
import { View,Text, StyleSheet, Button, Platform } from 'react-native';

import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import BotaoCabecalho from '../componentes/BotaoCabecalho';

const TelaInicial = (props) => {
  return (
  
     <View> 
        <Text>Tela Inicial</Text>
        <Button
            title='Entrar'
            onPress={() => {props.navigation.navigate("Resultado")}}

        />
  
    </View>
  );
}

TelaInicial.navigationOptions = dadosNav => {
    return {
        headerTitle: "SpLinhas",
        headerRigth:
            <HeaderButtons
                HeaderButtonComponent={BotaoCabecalho}>
                <Item
                    title="Adicionar"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {dadosNav.navigation.navigate('Resultado')}}
                />

            </HeaderButtons>
    }
}









const estilos = StyleSheet.create({})

export default TelaInicial;