import React,{ useState, useEffect } from "react";
import { View, ImageBackground, Text, FlatList, Alert, Share, Platform} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListBroken } from '../../components/ListBroken';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Load } from '../../components/Load';

import { styles } from './styles';
import { theme } from "../../global/styles/theme";

import Banner from '../../assets/banner.png';
import { AppoinmentsProps } from "../../components/Appointment";
import { api } from "../../services/api";


type Params={
    guidSelected: AppoinmentsProps;
}

type GuidWidget={
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
}
export function AppointmentDetails(){
    const [widget, setWidget] = useState<GuidWidget>({} as GuidWidget);
    const route = useRoute();
    const [loading, setLoading] =useState(true);

    const { guidSelected } = route.params as Params;
    

    async function fetchGuildInfo() {
        try {
            const response = await api.get(`/guilds/${guidSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch  {
            Alert.alert('Verifique as configurações do servidor, Será que o widget esta habilitado?')
        }finally{
            setLoading(false);
        }
    }

    function handleShareInvate(){
        const message = Platform.OS === 'ios'?
        `Junte-se a ${guidSelected.guild.name}`:
        widget.instant_invite;

        Share.share({
            message,
            url: widget.instant_invite
        })
    }

    function handleOpenGuild(){
        Linking.openURL(widget.instant_invite);
    }
    
    useEffect(()=>{
        fetchGuildInfo();
    },[])


    return(
        <Background>
            <Header  title="Detalhes"
                action={
                    guidSelected.guild.owner &&
                    <BorderlessButton onPress={handleShareInvate}>
                        <Fontisto name="share" size={24} color={theme.colors.primary}/>
                    </BorderlessButton>
                }/>

            <ImageBackground source={Banner}
                style={styles.banner}>
                <View style={styles.content}>
                    <Text style={styles.title}>
                        {guidSelected.guild.name}
                    </Text>
                    <Text style={styles.subtitle}>
                        {guidSelected.description}
                    </Text>
                </View>
            </ImageBackground>

            {
                loading? 
                <Load />
                :
                <>
                    <ListBroken
                        title='Jogadores'
                        subtitle= {`Total: ${widget.members.length}`}
                    />

                    <FlatList
                        data={widget.members}
                        keyExtractor={item => item.id}
                        renderItem = {({item })=>(
                            <Member data={item} />
                        )}
                        ItemSeparatorComponent={()=> <ListDivider isCenter/>}
                        style={styles.members}
                    />
                </>
            }

            {
                guidSelected.guild.owner &&
                <View style={styles.footer}>
                    <ButtonIcon title="Entre na Partida" onPress={handleOpenGuild} />
                </View>
            }
        </Background>
    );
}