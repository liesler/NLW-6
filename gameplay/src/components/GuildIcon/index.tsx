import React from "react";
import { Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './styles';
import DiscordSVG from '../../assets/discord.svg';
const { CDN_IMAGE } = process.env;


type Props={
    guildId: string;
    iconId : string | null;
}
export function GuildIcon({ guildId, iconId }: Props){  
    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
    console.log(uri);
    return(
        <View style={styles.container}>
        {
            iconId?
            <Image style={styles.image} 
                source={{uri}}
                resizeMode='cover'/>
            :
            <DiscordSVG width={40} height={40} />
        }
        </View>
        
    );
}