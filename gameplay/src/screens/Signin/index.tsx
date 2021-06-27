import React, { useContext }from 'react';
import { View, Text, Image, StatusBar, Alert, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background } from '../../components/Background';


import { ButtonIcon } from '../../components/ButtonIcon';
import ilustration from '../../assets/imgILustration.png';
import { styles } from './styles';

import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function Signin(){
    //const navigation = useNavigation();

    const { user, signIn, loading } = useAuth();
    
    async function handSignin(){
        //navigation.navigate('Home');
        try {
            await signIn();
        } catch (error) {
            Alert.alert(error);
        }
    }

    return(
        <Background>
            <View style={styles.contaier}>
            
                <Image source={ilustration} style={styles.image} 
                    resizeMode='stretch'/>


                <View style={styles.content}>
                    <Text style={styles.title}>
                        Conecte-se {`\n`}
                        e organize suas {`\n`} 
                        jogatinas
                    </Text>

                    <Text style={styles.subtitle}>
                        Crie grupos para jogar seus games {`\n`}
                        favoritos com seus amigos
                    </Text>

                    {
                    loading? <ActivityIndicator color={theme.colors.primary}/>
                    :
                    <ButtonIcon title='Entrar com Discord'
                        onPress={handSignin}/>
                    }
                </View>
            </View>   
        </Background> 
    );
}