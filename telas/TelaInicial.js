import React, {useState} from 'react';
import { View,Text, StyleSheet, Button, Platform, TextInput } from 'react-native';
import * as bus from 'bus-promise';



const TelaInicial = (props) => {

    const [texto, setTexto] = useState('');

    const capturaTexto = (textoDigitado) => {
        setTexto(textoDigitado);
    }


    const resultadoBusca =(texto) => {
        bus.auth('5c32ec06af1099b7310a9e195a66981b80375eb3adc5fd90c4615dfb27347a3c')
        .then(getLines)

    }


    const getLines = (auth) => {
        bus.find({
            auth,
            type: 'lines',
            terms: texto
          }).then((response) => {
              props.navigation.navigate("Resultado" , {resultado: response})
          })
    }


  return (
  
     <View> 
        <Text>Tela Inicial</Text>
        <TextInput 
            onChangeText={capturaTexto}
            value={texto}
        />
        <Button
            title='Buscar'
            onPress={resultadoBusca}

        />
  
    </View>
  );
}

TelaInicial.navigationOptions = dadosNav => {
    return {
        headerTitle: "SpLinhas"
    }
}









const estilos = StyleSheet.create({})

export default TelaInicial;