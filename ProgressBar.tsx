import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, buffered }: any) => {
    return (
        <View style={styles.container}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
            <View style={[styles.bufferBar, { width: `${buffered}%` }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        backgroundColor: 'blue',
        height: '100%',
        borderRadius: 5,
    },
    bufferBar: {
        backgroundColor: 'black',
        height: '100%',
        borderRadius: 5,
    },
});

export default ProgressBar;