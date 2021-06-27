import React, { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENT } from "../../config/storage";

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { Category } from '../../components/Category';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guids';
import { GuildProps } from "../../components/Guild";

import { styles } from './styles';
import { theme } from "../../global/styles/theme";
import { useNavigation } from "@react-navigation/native";


export function AppointmentCreate(){
    const [category, setCategory] = useState('');
    const [openModal, setModal] = useState(false);
    const [guild, setSelectedGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navegation = useNavigation();

    function handleOpenModal(){
        setModal(true);
    };

    function handleGuildSelect(guidSelect: GuildProps){        
        setSelectedGuild(guidSelect);
        setModal(false);
    }

    function handleCloseModal(){
        setModal(false);
    };

    function handleCategorySelect(categoryId: string){
       setCategory(categoryId);
    }

    async function handleSave(){

        if(!category){
            Alert.alert('Categiria deve ser selecionada');
            return;
        }
        
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description
        };

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);

        const appointment = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENT,
            JSON.stringify([...appointment, newAppointment])
        );

        navegation.navigate('Home');
    }

    return(
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding': 'height' }>
            <Background>
                <ScrollView>
                    <Header  title="Agendar Partida"  />
                    <Text style={[styles.label,{ marginLeft: 24, marginTop:36, marginBottom:18 }]}>
                        Categoria
                    </Text>
                    
                    <Category
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenModal}>
                            <View style={styles.select}>
                                {
                                    guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon} /> : <View style={styles.image} />
                                }
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                    { guild.name ? guild.name : 'Selecione um servidor' }
                                    </Text>
                                </View>

                                <Feather name="chevron-right" 
                                        size={18} color={theme.colors.heading}/>
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom:12 }]}>
                                    Dia e Mês
                                </Text>  

                                <View style={styles.columns}>
                                    <SmallInput maxLength={2} onChangeText={setDay} />                        
                                    <Text style={styles.divider}>
                                        /
                                    </Text>      
                                    <SmallInput maxLength={2} onChangeText={setMonth}/>            
                                </View>                     
                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom:12 }]}>
                                    Hora e Minuto
                                </Text>  

                                <View style={styles.columns}>
                                    <SmallInput maxLength={2} onChangeText={setHour}/>                        
                                    <Text style={styles.divider}>
                                        :
                                    </Text>      
                                    <SmallInput maxLength={2} onChangeText={setMinute}/>            
                                </View>                     
                            </View>
                        </View>

                        <View style={[styles.field, { marginBottom:12 }]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.maxtext}>
                                Max 100 caracter
                            </Text>
                        </View>
                        <TextArea multiline
                        maxLength={100}
                        numberOfLines={5} 
                        autoCorrect={false}
                        onChangeText={setDescription} />

                        <View style={styles.footer}>
                            <Button title='Agendar'
                                onPress={handleSave}/>
                        </View>
                    </View>
                
                </ScrollView>
            </Background>                

            <ModalView visible={openModal} closeModal={handleCloseModal}>
                <Guilds handleGuildSelect = {handleGuildSelect} />
            </ModalView>
        </KeyboardAvoidingView>
    );
}