import RNFS from 'react-native-fs';
import {
    ACTIVITIES_KEY,
    CATEGORIES_KEY,
    ENTRIES_KEY,
    getActivities,
    getCategories,
    getEntries,
} from './data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

// Function to export data as a backup
export const exportDataAsBackup = async () => {
    //   RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //     .then(result => {
    //       console.log('GOT RESULT', result);

    //       // stat the first file
    //       return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    //     })
    //     .then(statResult => {
    //       if (statResult[0].isFile()) {
    //         // if we have a file, read it
    //         return RNFS.readFile(statResult[1], 'utf8');
    //       }

    //       return 'no file';
    //     })
    //     .then(contents => {
    //       // log the file contents
    //       console.log(contents);
    //     })
    //     .catch(err => {
    //       console.log(err.message, err.code);
    //     });
    try {
        // checkAndRequestPermissions();

        const categories = await getCategories();
        const activities = await getActivities();
        const entries = await getEntries();

        const backupData = {
            categories,
            activities,
            entries,
        };

        const backupJSON = JSON.stringify(backupData);

        const filePath = RNFS.DocumentDirectoryPath + '/backup.json';

        await RNFS.writeFile(filePath, backupJSON, 'utf8');

        return filePath;
    } catch (error) {
        console.error('Error exporting data as backup:', error);
        throw error;
    }
};

// Function to import data from a backup file
export const importDataFromBackup = async (filePath: string) => {
    try {
        const backupJSON = await RNFS.readFile(filePath, 'utf8');
        const backupData = JSON.parse(backupJSON);

        // Update categories, activities, and entries with the imported data
        await AsyncStorage.setItem(
            CATEGORIES_KEY,
            JSON.stringify(backupData.categories),
        );
        await AsyncStorage.setItem(
            ACTIVITIES_KEY,
            JSON.stringify(backupData.activities),
        );
        await AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(backupData.entries));

        return true;
    } catch (error) {
        console.error('Error importing data from backup:', error);
        throw error;
    }
};

// Function to check and request permissions
const checkAndRequestPermissions = async () => {
    const storagePermissionStatus = await check(
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    );

    console.log(
        'PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE',
        `${storagePermissionStatus}`,
    );

    if (storagePermissionStatus === RESULTS.GRANTED) {
        // The app has the necessary permissions, proceed with export/import
    } else {
        // Request permission from the user
        const requestResult = await request(
            PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        );

        if (requestResult === RESULTS.GRANTED) {
            return;
        } else {
            throw new Error(`Missing permission: ${requestResult.toString()}`);
        }
    }
};
