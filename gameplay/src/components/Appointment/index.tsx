import React from "react";
import { View, Text } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { categories } from "../../utils/category";

import { GuildIcon } from "../GuildIcon";
import { Guild, GuildProps } from "../Guild";

import { styles } from './styles';
import PlaySvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';
import { theme } from "../../global/styles/theme";

export type AppoinmentsProps = {
    id:string; 
    guild: GuildProps;
    category: string ;
    date: string;
    description:string;
}
type Props= RectButtonProps &{
   data: AppoinmentsProps;
}
export function Appoinments({data, ...rest}: Props ){
    const [category] = categories.filter(item=> item.id === data.category);
    const { owner } = data.guild;
    const { primary, on, secondary50, secondary70 } = theme.colors;
    
    return(
        <RectButton  {...rest}>
            <View style={styles.container}>
                <LinearGradient style={styles.guidIconContainer}
                    colors={[ secondary50, secondary70 ]}>
                    <GuildIcon guildId={data.guild.id} iconId={data.guild.id}/>
                </LinearGradient>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            { data.guild.name }
                        </Text>

                        <Text style={styles.categorias}>
                            { category.title }
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <CalendarSvg/>
                            <Text style={styles.date}>
                                { data.date }
                            </Text>
                        </View>

                        <View style={styles.playinfo}>
                            <PlaySvg fill={owner ? primary: on} />

                            <Text style={[
                                styles.plays,
                                {color: owner? primary: on }
                            ]}>
                                {owner ? 'Dono' : 'Visitante'}
                            </Text>
                        </View>
                    </View>

                    
                </View>
            </View>            
        </RectButton>
    );
}