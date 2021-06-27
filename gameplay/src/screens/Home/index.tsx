import React, { useState, useCallback } from "react";
import {Text, View, FlatList} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENT } from "../../config/storage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { styles } from './styles';
import { Profie } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Category } from '../../components/Category';
import { ListBroken } from '../../components/ListBroken';
import { Appoinments, AppoinmentsProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";
import { Background } from '../../components/Background';


export function Home(){

    const [category, setCategory] = useState('');
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState<AppoinmentsProps[]>([]);
    const [loading, setLoading] = useState(true);

    function handleCategorySelect(categoryId: string){
        categoryId === category? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(guildSelected: AppoinmentsProps){
        navigation.navigate('AppointmentDetails', { guildSelected });
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments(){

        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
        const storage: AppoinmentsProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item=> item.category === category));
        }else{
            setAppointments(storage);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(()=>{
        loadAppointments();
    },[category]));

    return(
        
        <Background>
            <View style={styles.header}>
                <Profie/>
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>
        
            <Category categorySelected={category}
                setCategory={handleCategorySelect} />

            {
                loading ?
                <Load/> :
                <>
                    <ListBroken title='Partidas agendadas' 
                      subtitle={`Total:${appointments.length}`}/>

                    <FlatList 
                        data={appointments}
                        keyExtractor={item=>item.id}
                        renderItem={({item})=> (
                            <Appoinments data={item}
                            onPress={() => handleAppointmentDetails(item)}/>
                        )}
                        ItemSeparatorComponent={()=><ListDivider/>}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 69}}
                    />
                </>                
            }
        </Background>
    );
}