import React, { useState } from "react";
import { View, TextInput, Text, Alert, Button} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from "../../hooks/auth";
import { Avatar } from "../Avatar";

import { styles } from './styles';

import { ModalSignOut } from '../../components/ModalSignOut';

export function Profie(){

    const [openModal, setModalSignOut] = useState(false);
    const { user, singOut } = useAuth();
    
    function handleOpemModalSignOut(){        
        setModalSignOut(true);
    }

    function handleCloseModalSignOut(){
        setModalSignOut(false);
    };

    function handleSignOut(){
        singOut();
        setModalSignOut(false);
    }
    

    return(
        <View style={styles.container}>
            <RectButton onPress={handleOpemModalSignOut}>
                { user.avatar !== null ?
                    <Avatar urlImage={user.avatar}/> :
                    <Avatar urlImage={'https://proxy.com.br/wp-content/uploads/2019/08/logo_white1.png.webp'}/> 

                    
                }
            </RectButton>
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>
                        Olá, 
                    </Text>

                    <Text style={styles.username}>
                        { user.firstname }
                    </Text>

                </View>

                <Text style={styles.message}>
                    Hoje é dia de jogatina 
                </Text>
            </View>

            <ModalSignOut visible={openModal} closeModal={handleCloseModalSignOut}>
                <View>
                    <Text style={styles.title}>
                        Deseja sair do GamePlay?
                    </Text>
                </View>
                <View style={styles.buttoncontainer}>
                    <View  style={styles.buttoncancel}>
                        <RectButton onPress={handleCloseModalSignOut}>
                            <Text style={styles.title}>
                                Não 
                            </Text>
                        </RectButton>
                    </View>
                    <View  style={styles.buttonexit}>
                        <RectButton onPress={handleSignOut}>
                            <Text style={styles.titlesim}>
                                Sim 
                            </Text>
                        </RectButton>
                    </View>
                </View>
            </ModalSignOut>
        </View>
    );
}